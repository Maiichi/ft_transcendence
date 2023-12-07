import styled from "styled-components";
import {
  SearchComponent,
  useAppDispatch,
  useAppSelector,
} from "../../../../core";
import { useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
import { getUserFriends } from "../redux/friendThunk";
import { Avatar } from "@mui/material";
import { createDirectConversation } from "../redux/directMessageSlice";
import { I_User } from "../types";

const ReceiverComponent = (props: { onUserSelect: (user: I_User) => void }) => {
  const { onUserSelect } = props;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const friends: [] = useAppSelector((state) => state.friends.friends);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleClickSearch = (str: string) => {
    setSearchQuery(str);
  };

  useEffect(() => {
    if (searchQuery.length) {
      const filteredFriends = friends.filter((friend: I_User) =>
        friend.firstName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filteredFriends);
    } else setFilteredUsers([]);
  }, [searchQuery]);
  return (
    <>
      <SearchComponent onInputUpdate={handleClickSearch} />
      {filteredUsers.length > 0 && (
        <UserListOverlay>
          {filteredUsers.map((item: I_User) => (
            <UserList key={item.intraId} onClick={() => onUserSelect(item)}>
              <Avatar />
              {item.firstName} {item.lastName}
            </UserList>
          ))}
        </UserListOverlay>
      )}
    </>
  );
};

export const NewDirectMessage = (props: {
  handleClose: () => void;
  selectedUser: I_User | null;
}) => {
  const { handleClose, selectedUser } = props;
  const dispatch = useAppDispatch();
  const [selectUser, setSelectUser] = useState<I_User | null>(selectedUser);
  const [messageContent, setMessageContent] = useState<string>("");
  const closeModal = () => {
    handleClose();
  };

  const handleSelectedUser = (user: I_User) => {
    setSelectUser(user);
  };

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (selectUser) {
      const messageData = {
        receiverId: selectUser.intraId,
        content: messageContent,
      };
      dispatch(createDirectConversation(messageData));
    }
    handleClose();
  };

  useEffect(() => {
    dispatch(getUserFriends());
  }, []);

  return (
    <>
      <ModalHeader>
        <h3>Start a new conversation</h3>
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
        {selectUser ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            To :
            <UserList>
              <Avatar />
              {selectUser.firstName} {selectUser.lastName}
            </UserList>
          </div>
        ) : (
          <ReceiverComponent onUserSelect={handleSelectedUser} />
        )}
        <form onSubmit={handleSendMessage}>
          <MessageInput
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
          <ModalFooter>
            <CancelButton onClick={closeModal}>Cancel</CancelButton>
            <CreateButton type="submit">Send</CreateButton>
          </ModalFooter>
        </form>
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
  text-align: center;
  height: 100%;
`;

const ModalFooter = styled.div`
  margin: 25px 0px 0px 0px;
  display: flex;
  justify-content: space-evenly;
`;

const SearchBar = styled.div`
  display: flex;
`;

const MessageInput = styled.textarea`
  width: 85%;
  height: 100px;
  resize: none;
  padding: 10px;
  margin-top: 6px;
`;

const CreateButton = styled.button`
  height: 40px;
  width: 100px;
  border: 10px;
  border-radius: 10px;
  cursor: pointer;
  background-color: rgb(178, 163, 201);
`;

const CancelButton = styled.button`
  height: 40px;
  width: 100px;
  border: 10px;
  border-radius: 10px;
  cursor: pointer;
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

const UserListOverlay = styled.div`
  position: absolute;
  z-index: 1;
  background-color: white;
  border: 1px solid #ccc;
  margin-top: -10px; /* Adjust this value to fit your design */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const UserHolder = styled.div`
  display: flex;
`;
