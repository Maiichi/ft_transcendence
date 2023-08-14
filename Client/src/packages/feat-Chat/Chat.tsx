import { useEffect, useState } from "react";
import { SearchComponent, useAppDispatch, useAppSelector } from "../../core";
import {
  ChatIshakState,
  clearState,
  sendMessage,
} from "./components/ChatIshak";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Avatar, Box, Grid } from "@mui/material";
import { FormatTextdirectionRToLTwoTone } from "@mui/icons-material";

export const Chat = () => {
  const state: ChatIshakState = useAppSelector((state) => state.chat);

  const dispatch = useAppDispatch();
  const chatState = useAppSelector((state) => state.chat);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const handleClick = () => {
    dispatch(sendMessage({ name, msg }));
    setMsg("");
    setName("");
  };
  const handleClear = () => {
    dispatch(clearState());
  };

  return (
    <Root>
      <ChatNavbar>
        <SearchComponent />
        <Tabs>
          {[1, 2, 3].map((item) => (
            <Tab className="Tab-holder">
              <Avatar className="Avatar"
                sx={{ width: "40px", height: "40px" }}
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
              />
              <Title className="room-user-status-holder">
                <H4 className="room-user-name">Ishak Zail</H4>
                <H5>Online</H5>
              </Title>
            </Tab>
          ))}
        </Tabs>
      </ChatNavbar>
      <MessageContent>
        <Header>
          <Title className="room-user-status-holder">
            <Avatar
              className="Avatar"
              sx={{ width: "40px", height: "40px" }}
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              style={{ margin: "5px" }}
            />
            <H4 className="room-user-name">Ishak Zail</H4>
          </Title>
          <Button >option</Button>
        </Header>
        <Separator />
        <Messages>messages</Messages>
        <Separator />
        <WriteMessage>
          <input
            type="text"
            placeholder="Type a message..."
            value={msg}
          />
          <Button>Send</Button>
        </WriteMessage>
      </MessageContent>
    </Root>
  );
};
const Root = styled.div`
  margin: 1vw;
  height: -webkit-fill-available;
  display: flex;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
`;
const ChatNavbar = styled.div`
  padding: 15px;
  border-right: 1px solid #dee2e6 !important;
  width: 30%;
`;

const MessageContent = styled.div`
  width: 70%;
`;

const H4 = styled.h4`
  color: red;
  margin-top: 0px;
  margin-bottom: 0px;
`;
const H5 = styled.h4`
  color: blue;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const Tab = styled.div`
  display: flex;
  margin-top: 5px;
  margin-bottom: 0px;
  padding: 5px 0px 5px 5px;
`;
const Tabs = styled.div`
 
  margin-top: 15px;
`;

const Title = styled.div`
  color: black;
  margin: 2px 0px 0px 10px;
  display: flex;
`;

const Header = styled.div`
  background-color: grey;
  display: flex;
  justify-content: space-between; /* Add this line */
  align-items: center; /* Center vertically */
`

const Messages = styled.div`
  background-color: blue;
`
const WriteMessage = styled.div`
  background-color: green;
`

const Separator = styled.div`
  height: 1px;
  background-color: black; /* Color of the separator */
  margin: 10px 0; /* Adjust the margin as needed */
`;

const Button = styled.button`
  margin-right: 5px;
`