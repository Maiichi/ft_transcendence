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
        <Discussions>
          <SearchComponent/>

          <Discussion>
            <Avatar style={{
              marginLeft : "20px",
              display: "block",
              width: "45px",
              height : "45px",
              background : "#E6E7ED",
              backgroundPosition : "center",
              backgroundSize : "cover",
              backgroundRepeat : "no-repeat",
              MozBorderRadius : "50px",
              WebkitBorderRadius : "50px"
            }}>
              <Online/>
            </Avatar>
            <ContactDesc>
              <Name> Ishak Zail </Name>
              <LastMessage> hello !  </LastMessage>
            </ContactDesc>
          </Discussion>
        </Discussions>
        <ChatSection>
            <ChatHeader>
                <ChatName>Ishak ZAIL</ChatName>
            </ChatHeader>
            <ChatMessages>
                <Messages>
                    <Avatar style ={{
                        marginLeft : "20px",
                        display: "block",
                        width: "45px",
                        height : "45px",
                        background : "#E6E7ED",
                        backgroundPosition : "center",
                        backgroundSize : "cover",
                        backgroundRepeat : "no-repeat",
                        MozBorderRadius : "50px",
                        WebkitBorderRadius : "50px"
                    }} />
                    <MessageTextSender>
                        wa feen
                    </MessageTextSender>
                </Messages>
                <Messages>
                    <Avatar style ={{
                        marginLeft : "20px",
                        display: "block",
                        width: "45px",
                        height : "45px",
                        background : "#E6E7ED",
                        backgroundPosition : "center",
                        backgroundSize : "cover",
                        backgroundRepeat : "no-repeat",
                        MozBorderRadius : "50px",
                        WebkitBorderRadius : "50px"
                    }} />
                    <MessageTextReceiver>
                        wa feen
                    </MessageTextReceiver>
                </Messages>
            </ChatMessages>
        </ChatSection>        
    </Root>
  );
};
const Root = styled.div`
  margin: 1vw;
  height: -webkit-fill-available;
  display: flex;
  background-color: rgb(255, 255, 255);
  // border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
`;

const Discussions = styled.section`
  width: 35%;
  height: 700px;
  box-shadow: 0px 8px 10px rgba(0,0,0,0.20);
  overflow: hidden;
  background-color: #87a3ec;
  display: inline-block;
`

const Discussion = styled.div`
  width: 100%;
  height: 90px;
  background-color: #FAFAFA;
  border-bottom: solid 1px #E0E0E0;
  display:flex;
  align-items: center;
  cursor: pointer;
`

const ContactDesc = styled.div`
height: 43px;
width: 50%;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`

const MessageActive = styled.div`
  width: 98.5%;
  height: 90px;
  background-color: #FFF;
  border-bottom: solid 1px #E0E0E0;
`

const Online = styled.div`
  position: relative;
  top: 30px;
  left: 35px;
  width: 13px;
  height: 13px;
  background-color: #8BC34A;
  border-radius: 13px;
  border: 3px solid #FAFAFA;
`

const Name = styled.p`
  margin: 0 0 0 20px;
  font-family:'Montserrat', sans-serif;
  font-size: 11pt;
  color:#515151;
`

const LastMessage = styled.p`
  margin: 6px 0 0 20px;
  font-family:'Montserrat', sans-serif;
  font-size: 9pt;
  color:#515151;
`

const ChatSection = styled.section`
  width: calc(65% - 85px);
`
const ChatHeader = styled.div`
  background-color: #FFF;
  height: 90px;
  box-shadow: 0px 3px 2px rgba(0,0,0,0.100);
  display:flex;
  align-items: center;
`
const ChatName = styled.p`
  margin: 0 0 0 20px;
  text-transform: uppercase;
  font-family:'Montserrat', sans-serif;
  font-size: 13pt;
  color:#515151;
`

const ChatMessages = styled.div`
    padding: 25px 35px;
`
const Messages = styled.div`
    display:flex;
    align-items: center;
    margin-bottom: 8px;
`
const MessageTextSender = styled.p`
    margin: 0 35px;
    background-color: #f6f6f6;
    padding: 15px;
    border-radius: 12px;
`

const MessageTextReceiver = styled.p`
    margin-left: 45px;
`