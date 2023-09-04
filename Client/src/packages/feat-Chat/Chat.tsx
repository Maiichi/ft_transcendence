import { useEffect, useState } from "react";
import { SearchComponent, useAppDispatch, useAppSelector } from "../../core";
import AddIcon from "@mui/icons-material/Add";
import {
  roomState,
  setMemberships
} from "./components/rooms/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Picture from "./Picture.png";
import { Message } from "./message/Message";
import "./chat.css";
import { ChatUsers } from "./chatUsers/ChatUsers";
import { Avatar, Badge, Box, Modal } from "@mui/material";
import { CreateChannelModal } from "./ChannelModal/CreateChannelModal";
import { MoreHoriz, Person, LogoutRounded } from '@mui/icons-material';
import { ChannelSettingModal } from "./ChannelModal/ChannelSettingModal";
import  {getChatRooms}  from "./components/rooms/chatThunk";
import { getDirectConversations } from "./components/conversations/conversationThunk";
import { dir } from "console";
import { ChatBox } from "./chatBox/ChatBox";


export const Chat = () => {

  const dispatch = useAppDispatch();
  const chatRooms = useAppSelector((state) => state.chat.memberships); 
  const account = useAppSelector((state) => state.auth.user);
  const conversations: [] = useAppSelector((state) => state.conversation.conversations);

  const [directConversation, setDirectConversation]   = useState(null);
  const [channelConversation, setChannelConversation] = useState(null);

  useEffect(()=> {
    dispatch(getChatRooms());
    dispatch(getDirectConversations());
  }, [dispatch]);

    function changeMessageLength(message: string)
    {
      if (message.length > 60)
      {
        message = message.substring(0,60);
        return (message + "...");
      }
      return message;
    }
    // function to change date format
    function convertDateTime(dateString: string): string {
      const now = new Date();
      const inputDate = new Date(dateString);
  
      const isSameDate = now.toDateString() === inputDate.toDateString();
  
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const isYesterday = yesterday.toDateString() === inputDate.toDateString();
  
      if (isSameDate) {
          const hours = inputDate.getHours().toString().padStart(2, '0');
          const minutes = inputDate.getMinutes().toString().padStart(2, '0');
          return `${hours}:${minutes}`;
      } else if (isYesterday) {
          return `yesterday`;
      } else {
          const year = inputDate.getFullYear();
          const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
          const day = inputDate.getDate().toString().padStart(2, '0');
          return `${year}/${month}/${day}`;
      }
  }
  return (
    <Root>
      <div className="discussions">
        <p className="messages-text">Discussions</p>
        <SearchComponent />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "rgb(94, 53, 177)",
            margin: "0px 10px 0px 10px",
            fontWeight: '900'
          }}
        >
          <p>Channels</p>
        <CreateChannelModal />
        </div>
        <div className="channelListHolder">
          {chatRooms.map((item: any) => (
            <h4 key={item.room.id} 
                className={`channel-name ${channelConversation === item.id ? 'selected' : ''}`}
                onClick={() => {setChannelConversation(item.room);setDirectConversation(null)}}
            >
              # {item.room.name}  
            </h4>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "rgb(94, 53, 177)",
            margin: "0px 10px 0px 10px",
            fontWeight: '900'
          }}
        >
          <p>Direct Messages</p>
          <div>
            <AddIcon style={{padding: '5px'}} />
          </div>
        </div>
        <div className="DirectMessageListHolder">
          {
            conversations.map((discussion: any) => (
            
            <div key={discussion.id}
              className={`discussion ${directConversation === discussion.id ? 'selected' : ''}`}
              onClick={() => {setDirectConversation(discussion); setChannelConversation(null)}} // Update the selected conversation on click
            >
              <Badge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                color={discussion.participants[0].status === "ONLINE" ? "success" : "error"}
                overlap="circular"
                variant="dot"
              >
                <img className="photo" src={Picture} />
              </Badge>

              <div className="desc-contact">
                <p className="name">{discussion.participants[0].firstName}  {discussion.participants[0].lastName}</p>
                <p className="message">{ changeMessageLength(discussion.messages[0].content) }</p>
              </div>
              <p style={{fontSize: 13}}>{convertDateTime(discussion.messages[0].createdAt)}</p>
            </div>
          ))}
        </div>
      </div>
      {
        (directConversation === null && channelConversation === null) ? (
          <div className="chatBoxNoConversation">
            Click on a conversation to start chatting.
          </div>
        ) : (
          <ChatBox channelConversation={channelConversation} directConversation={directConversation} />
        )
      }
      <ChatUsers channelConversation={channelConversation} directConversation={directConversation} />
    </Root>
  );
};

const Root = styled.div`
  margin: 1vw;
  display: flex;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;auto;
  // padding: 0;
  // margin: 5px;
  height: 900px;
  border-radius: 20px:

`;

const boxStyle = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
  height: "400px",
};

const title = styled.h4``;
