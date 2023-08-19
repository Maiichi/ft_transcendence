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

import{ Message }from "./message/Message"
import './chat.css';
import { ChatUsers } from "./chatUsers/ChatUsers";
import { Search } from "@mui/icons-material";
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';

export const Chat = () => {
  const state: ChatIshakState = useAppSelector((state) => state.chat);

  const dispatch = useAppDispatch();
  const chatState = useAppSelector((state) => state.chat);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [selectedTab, setSelectedTab]  = useState('Dms');

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
      type: 'Dms',
      name: 'Dave Corlew',
      message: "Let's meet for a coffee or something today ?",
      timer: '3 min'
    },
    {
      id: 2,
      type: 'Rms',
      name: 'Room 1',
      message: "Let's meet for a coffee or something today ?",
      timer: '3 min'
    }
  ];
  const filteredDiscussions = discussions.filter(
    (discussion) => discussion.type === selectedTab
  );
  return (
    <Root>
        <div className="discussions">
          <div className="discussion-search">
            <div className="chatTitleHolder">
              <p className="messages-text">
                Messages
              </p>
              
            </div>
            <div className="searchIconHolder">
                <Search></Search>
            </div>
            {/* need to add a model when clicking on this ICON */}
            <div className="newMessageHolder">
              <DriveFileRenameOutlineTwoToneIcon ></DriveFileRenameOutlineTwoToneIcon>
            </div>
          </div>
          <div className="discussion-room-user">
            <button 
              className={`rooms ${selectedTab === 'Dms' ? 'active' : ''}`}
              onClick={() => setSelectedTab('Dms')}
            >
              Dms
            </button>
            <button 
             className={`dm ${selectedTab === 'Rms' ? 'active' : ''}`}
             onClick={() => setSelectedTab('Rms')}
            >
                Rms
            </button>
          </div>
          {filteredDiscussions.map((discussion) => (
            <div key={discussion.id} className="discussion">
              <div className="photo">
                <div className="online"></div>
              </div>
              <div className="desc-contact">
                <p className="name">{discussion.name}</p>
                <p className="message">{discussion.message}</p>
              </div>
              <div className="timer">{discussion.timer}</div>
            </div>
          ))}
         
        </div>
        <div className="chatBox">
          <div className="chatBoxHeader">

          </div>
          <div className="chatBoxWrapper">
              <div className="chatBoxTop">
                <Message own= {false}/>
                <Message own/>
                <Message own= {false}/>
                <Message own/>
                <Message own= {false}/>
                <Message own/>
                <Message own= {false}/>
                <Message own/>
                <Message own= {false}/>
                <Message own/>
                <Message own= {false}/>
                <Message own/>
                <Message own/>
                <Message own= {false}/>
                <Message own/>
                <Message own/>
                <Message own= {false}/>
                <Message own/>
              </div>
          </div>
          <div className="chatBoxBottom">
            <textarea className="chatMessageInput" placeholder="Write your message ..."></textarea>
            <button className="chatSubmitButtom">Send</button>
          </div>
        </div>
        <ChatUsers type={selectedTab}/>
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