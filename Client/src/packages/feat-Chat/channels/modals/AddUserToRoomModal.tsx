import { Close } from "@mui/icons-material";
import styled from "styled-components";
import {
  SearchComponent,
  useAppDispatch,
  useAppSelector,
} from "../../../../core";
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { joinRoom } from "../../../feat-Search/redux/searchSlice";
import { addMemberToRoom, addUserToRoom } from "../redux/roomSlice";
import { getUserFriends } from "../redux/friendThunk";

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
  const [filteredUsers, setFilteredUsers] = useState([]); // Initialize with an empty array
  // const filtredUsers = friends.filter((friend: any) =>
  //     friend.firstName
  //     .toLowerCase()
  //     .startsWith(searchQuery.toLowerCase())
  // );
  // Update the filteredUsers when searchQuery changes

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

  

  useEffect(() => {
    if (searchQuery.length) {
      const filteredFriends = friends.filter((friend: any) =>
        friend.firstName.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      setFilteredUsers(filteredFriends);
    } 
    else 
      setFilteredUsers([]);
  }, [searchQuery]);

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
        {filteredUsers.map((item: any) => (
          <UserList key={item.intraId} onClick={() => handleClickOnUser(item)}>
            <Avatar />
            {item.firstName} {item.lastName}
          </UserList>
        ))}
      </ModalBody>
    </>
  );
};

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalBody = styled.div`
  align-items: center;
  height: 100%;
`;

const SearchBar = styled.input`
  padding: 10px;
  border: 1px solid #d5d0d0;
  border-radius: 5px;
  background-color: #f9f9f9;
  width: 44.5vh;
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
