import { useEffect, useState } from "react";
import { SearchComponent, useAppDispatch, useAppSelector } from "../../core";
import AddIcon from "@mui/icons-material/Add";
import {
  ChatIshakState,
  clearState,
  sendMessage,
} from "./components/ChatIshak";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Picture from "./Picture.png";
import { Message } from "./message/Message";
import "./chat.css";
import { ChatUsers } from "./chatUsers/ChatUsers";
import { ChatSearchModal } from "./chatSearch/ChatSearchModal";
import { MessageModal } from "./messageModal/MessageModal";
import { Avatar, Badge, Box, Modal } from "@mui/material";
import { CreateChannelModal } from "./ChannelModal/CreateChannelModal";
import { MoreHoriz, Person, LogoutRounded } from '@mui/icons-material';
import { ChannelSettingModal } from "./ChannelModal/ChannelSettingModal";

export const Chat = () => {
  const state: ChatIshakState = useAppSelector((state) => state.chat);

  const dispatch = useAppDispatch();
  const chatState = useAppSelector((state) => state.chat);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [selectedTab, setSelectedTab] = useState("Dms");
  const [iconChannelOpen, setIconChannelOpen] = useState(false);

  const handleClick = () => {
    dispatch(sendMessage({ name, msg }));
    setMsg("");
    setName("");
  };
  const handleClear = () => {
    dispatch(clearState());
  };

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
    {
      id: 3,
      type: "Rms",
      name: "Room 1",
      message: "Let's meet for a coffee or something today ?",
      timer: "3 min",
    },
    {
      id: 4,
      type: "Rms",
      name: "Room 1",
      message: "Let's meet for a coffee or something today ?",
      timer: "3 min",
    },
  ];

  const filteredDiscussions = discussions.filter(
    (discussion) => discussion.type === selectedTab
  );
  return (
    <Root>
      <div className="discussions">
        {/* <div> */}
        {/* <div className="chatTitleHolder"> */}
        <p className="messages-text">Discussions</p>
        {/* </div> */}
        {/* <ChatSearchModal /> */}
        {/* need to add a model when clicking on this ICON */}
        {/* <MessageModal /> */}
        <SearchComponent />
        {/* </div> */}
        {/* <div className="discussion-room-user">
          <button
            className={`rooms ${selectedTab === "Dms" ? "active" : ""}`}
            onClick={() => setSelectedTab("Dms")}
          >
            Dms
          </button>
          <button
            className={`dm ${selectedTab === "Rms" ? "active" : ""}`}
            onClick={() => setSelectedTab("Rms")}
          >
            Rms
          </button>
        </div> */}
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 2 , 2, 3].map((item) => (
            <h4 className="channel-name"># Channel {item}</h4>
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
        <div style={{ padding: "0px 15px" }}>
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
