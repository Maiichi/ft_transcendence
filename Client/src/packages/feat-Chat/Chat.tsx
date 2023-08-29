import { useEffect, useState } from "react";
import { SearchComponent, useAppDispatch, useAppSelector } from "../../core";
import AddIcon from "@mui/icons-material/Add";
import {
  roomState,
  setConversation
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


export const Chat = () => {

  const dispatch = useAppDispatch();
  const chatRooms = useAppSelector((state) => state.chat.memberships); 
  const account = useAppSelector((state) => state.auth.user);

  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [selectedTab, setSelectedTab] = useState("Dms");
  const [iconChannelOpen, setIconChannelOpen] = useState(false);
  
  useEffect(()=> {
    dispatch(getChatRooms());
  }, [dispatch]);

  console.log("chat rooons ==" + JSON.stringify(chatRooms));
  const discussions = [
    {
      id: 1,
      type: "Rms",
      name: "Room 1",
      message: "Let's meet for a coffee or something today ?",
      timer: "3 min",
    },
    {
      id: 2,
      type: "Rms",
      name: "Room 1",
      message: "Let's meet for a coffee or something today ?",
      timer: "3 min",
    },
  ];

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
            <h4 key={item.room.id} className="channel-name"># {item.room.name} </h4>
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
          <AddIcon style={{padding: '5px'}} />
        </div>
        <div className="DirectMessageListHolder">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="discussion">
              <Badge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                color={discussion.id <= 2 ? "success" : "error"}
                overlap="circular"
                variant="dot"
              >
                <img className="photo" src={Picture} />
              </Badge>

              <div className="desc-contact">
                <p className="name">{discussion.name}</p>
                <p className="message">{discussion.message}</p>
              </div>
              <p>18:00</p>
              {/* <div className="timer">{discussion.timer}</div> */}
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxHeader">
          <ChannelSettingModal />
        </div>
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            {[1, 2, 3, 4].map((item) => (
              <>
                <Message own={false} />
                <Message own />
              </>
            ))}
          </div>
        </div>
        <div className="chatBoxBottom">
          <textarea
            className="chatMessageInput"
            placeholder="Write your message ..."
          ></textarea>
          <button className="chatSubmitButtom">Send</button>
        </div>
      </div>
      <ChatUsers type={selectedTab} />
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
