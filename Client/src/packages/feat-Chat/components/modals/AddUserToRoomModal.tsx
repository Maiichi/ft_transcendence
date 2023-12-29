import { Close } from "@mui/icons-material";
import styled from "styled-components";
import {
  I_User,
  SearchComponent,
  useAppDispatch,
  useAppSelector,
} from "../../../../core";
import { useState } from "react";
import { Avatar } from "@mui/material";
import { addUserToRoom } from "../redux/roomSlice";

import { isBlockedByYou, isBlockedYou, isMember } from "../utils";
import { NotFound } from "../style";

interface Props {
  handleClose: () => void;
}
// TODO : Need a refactoring concerning the events received from the back and also use the right reducer for the right action
export const AddUserToRoomModal = (props: Props) => {
  const { handleClose } = props;
  const dispatch = useAppDispatch();
  const { roomId } = useAppSelector((state) => state.chat.currentConversation);
  const { memberships } = useAppSelector((state) => state.channels);
  const index = memberships.findIndex((item: any) => item.id == roomId);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const friends: [] = useAppSelector((state) => state.friends.friends);
  const block = useAppSelector((state) => state.block);
  const currentUser = useAppSelector((state) => state.auth.user);
  const handleClickOnUser = (item: any) => {
    const data = {
      roomId: memberships[index].id,
      userId: item.intraId,
    };
    dispatch(addUserToRoom(data));
    handleClose();
  };

  const handleClickSearch = (str: string) => {
    setSearchQuery(str);
  };
  // manageBlock
  const filteredFriends = friends.filter(
    (friend: I_User) =>
      !isBlockedYou(friend.intraId, block) &&
      !isBlockedByYou(friend.intraId, block) &&
      (!searchQuery ||
        friend.firstName.toLowerCase().startsWith(searchQuery.toLowerCase())) &&
      !isMember(friend.firstName, memberships[index].members)
  );

  return (
    <>
      <ModalHeader>
        <h3>Add User To Room </h3>
        <Close
          sx={{
            "&:hover": {
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
            },
          }}
          style={{ cursor: "pointer" }}
          onClick={handleClose}
        />
      </ModalHeader>
      <ModalBody>
        <SearchComponent onInputUpdate={handleClickSearch} />
        <UsersList length={filteredFriends.length}>
          {friends.length == 0 ? (
            <NotFound>
              It looks like you haven't added any friends yet.
            </NotFound>
          ) : filteredFriends.length != 0 ? (
            filteredFriends.map((item: any) => (
              <UserList
                key={item.intraId}
                onClick={() => handleClickOnUser(item)}
              >
                <Avatar />
                {item.firstName} {item.lastName}
              </UserList>
            ))
          ) : searchQuery ? (
            <NotFound>
              Couldn't find any names starting with {searchQuery}
            </NotFound>
          ) : (
            <NotFound>
              Your friends have already joined #{memberships[index].name}
            </NotFound>
          )}
        </UsersList>
      </ModalBody>
    </>
  );
};

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const UsersList = styled.div<{ length: number }>`
  overflow-y: scroll;
  height: ${(props) =>
    props.length > 1 ? "100px" : props.length == 0 ? "30px" : "60px"};
  padding: 10px;
  width: 230px;
`;
const ModalBody = styled.div`
  align-items: center;
  height: 100%;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  margin: 10px;
  &:hover {
    cursor: pointer;
    background-color: #f5f6f7;
  }
`;
