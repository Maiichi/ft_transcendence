import { useEffect, useState } from "react";
import { SearchComponent, useAppDispatch, useAppSelector } from "../../core";
import {
  ChatIshakState,
  clearState,
  sendMessage,
} from "./components/ChatIshak";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Avatar } from "@mui/material";

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
          <SearchComponent />
        
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
                <UserMessage>
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
                  }} >
                    <Online/>
                  </Avatar>
                  <MessageText>
                    Hello it's Ishak  Hi Dude i'm the sender 

                  </MessageText>
                </UserMessage>
                <SenderMessage>
                  <MessageTextOnly>
                    <Response>
                      <ResponseText>
                      Hello it's sender  ndersender
                      </ResponseText>
                    </Response>
                  </MessageTextOnly>
                </SenderMessage>           
            </ChatMessages>
            <FooterChat className="footer-chat">
              <Icon className="fa fa-smile-o clickable" style={{ fontSize: '25pt' }} aria-hidden="true" />
              <WriteMessageInput type="text" className="write-message" placeholder="Type your message here" />
              <SendIcon className="fa fa-paper-plane-o clickable" aria-hidden="true" />
            </FooterChat>
        </ChatSection>        
    </Root>
  );
};
const Root = styled.div`
  margin: 1vw;
  // height: 100%;
  // width: 100%;
  display: flex;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;auto;
  height : 500px;
`;

const Discussions = styled.section`
  width: 30%;
  height: 100%;
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
  display:flex
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
  background-color: red;
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

const UserMessage = styled.div`
  display:flex;
  align-items: center;
  margin-bottom: 8px; 
`
const MessageText = styled.p`
  margin: 0 35px;
  background-color: #f6f6f6;
  padding: 15px;
  border-radius: 12px;  
`

const SenderMessage = styled.div`
display:flex;
align-items: center;
margin-bottom: 8px; 
`

const MessageTextOnly = styled.div`
  margin-left: 45px;
`
const Response = styled.div`
  float: right;
  margin-right: 0px !important;
  margin-left:auto;
`

const ResponseText = styled.p`
  background-color: #e3effd !important;
  margin: 0px;
  padding: 15px;
  border-radius: 12px;  
`

// const FooterChat = styled.div`
// width: calc(65% - 66px);
// height: 80px;
// display:flex;
// align-items: center;
// position:absolute;
// bottom: 0;
// background-color: transparent;
// border-top: 2px solid #EEE;
// `

// const FooterChatIcon = styled.i`
// margin-left: 30px;
// color:#C0C0C0;
// font-size: 14pt;
// cursor: pointer;
// `

// const FooterChatSend = styled.i`
//   color:#fff;
//   background-color: #4f6ebd;
//   position: absolute;
//   right: 50px;
//   padding: 12px 12px 12px 12px;
//   border-radius: 50px;
//   font-size: 14pt;
//   cursor: pointer;
// `

// const FooterChatMessage = styled.input`
//   border:none !important;
//   width:60%;
//   height: 50px;
//   margin-left: 20px;
//   padding: 10px;
//   cursor: pointer;
// `

const FooterChat = styled.div`
  width: calc(65% - 66px);
  height: 80px;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  background-color: transparent;
  border-top: 2px solid #eee;
`;

const Icon = styled.i`
  margin-left: 30px;
  color: #c0c0c0;
  font-size: 14pt;
`;

const SendIcon = styled.i`
  color: #fff;
  background-color: #4f6ebd;
  position: absolute;
  right: 50px;
  padding: 12px;
  border-radius: 50px;
  font-size: 14pt;
`;

const WriteMessageInput = styled.input`
  border: none !important;
  width: 60%;
  height: 50px;
  margin-left: 20px;
  padding: 10px;
  ::-webkit-input-placeholder {
    color: #c0c0c0;
    font-size: 13pt;
  }
  :-moz-placeholder {
    color: #c0c0c0;
    font-size: 13pt;
  }
  ::-moz-placeholder {
    color: #c0c0c0;
    font-size: 13pt;
    margin-left: 5px;
  }
  :-ms-input-placeholder {
    color: #c0c0c0;
    font-size: 13pt;
  }
`;

const ClickableIcon = styled(Icon)`
  cursor: pointer;
`;