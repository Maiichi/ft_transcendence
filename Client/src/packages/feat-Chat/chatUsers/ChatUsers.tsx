import React from "react";
import "./chatUsers.css";
import { ButtonAvatar, CardAvatar, H5 } from "../../feat-Account/components";
import { Avatar, Divider, Icon, Popper, Tab, Badge } from "@mui/material";
import {
  Title,
  Person,
  PersonAddAlt1,
  Gamepad,
  Block,
  PersonOffTwoTone,
  DriveFileRenameOutlineTwoTone,
  VideogameAssetTwoTone,
} from "@mui/icons-material";

interface Props {
  type: string;
}

const isFriend = false;
const usersInRoom = [
  {
    name: "Ishak Zail",
    isOnline: true,
    isFriend: false,
  },
  {
    name: "Ismail Bouroummana",
    isOnline: false,
    isFriend: true,
  },
];

export const ChatUsers = ({ type }: Props) => {
  const ButtonData = isFriend ? "Invite to game" : "Send Request";
  return (
    <div className="onlineUsersBox">
      {type === "Dms" ? (
        <>
            <div className="rightSideHeader">
                <h3>Ishak Zail</h3>
                <img className="photo-avatar" src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png" alt="" />
                <div style={{display: 'flex', flexDirection: 'row-reverse', margin: '20px'}}>
                    <h4 style={{margin: '0px'}}>Available</h4>
                    <div style={{height: '20px', width: '20px', backgroundColor: 'green', borderRadius: '20px'}}>
                    </div>
                </div>
                
            </div>
            <Divider style={{height : '2px', margin : '0px 30px 0px 30px'}} />
            <div className="rightSideBody">
                <div className="icon-title">
                    <Person /> 
                    <h4 style={{margin : '0px 0px 0px 7px'}}>View Profile</h4>
                </div>
                <div className="icon-title">
                    <Gamepad /> 
                    <h4 style={{margin : '0px 0px 0px 7px'}}>Invite to game</h4>
                </div>
                <div className="icon-title">
                    <PersonAddAlt1 /> 
                    <h4 style={{margin : '0px 0px 0px 7px'}}>Add to friend list</h4>
                </div>
                <div className="icon-title">
                    <Block /> 
                    <h4 style={{margin : '0px 0px 0px 7px'}}>Block</h4>
                </div>
                
            </div>
            <Divider style={{height : '2px', margin : '0px 30px 0px 30px'}} />
            <div className="rightSideFooter"></div>
        </>
      ) : (
        <>
          <div className="onlineUsersHeader">
            <h3 className="onlineUsersTop">Room Users</h3>
          </div>
          <div className="onlineUsers">
            <div className="onlineUserImgContainer">
              <img
                className="onlineUserImg"
                src="https://media.istockphoto.com/id/1294780139/photo/close-up-portrait-of-smiling-man-with-eyeglasses-in-blue-shirt-3d-illustration-of-cartoon.jpg?s=1024x1024&w=is&k=20&c=6ENyB-NdL-HZJOtV6Jp8SD8TRx9w_KLswfIH9s6uGUs="
                alt=""
              />
              <div className="onlineUsersBadge"></div>
            </div>
            <p className="onlineUsersName">Ishak Zail</p>
            <div className="iconHolder">
              <div className="iconSVG" data-description="Invite to game">
                <VideogameAssetTwoTone></VideogameAssetTwoTone>
              </div>
              <div className="iconSVG" data-description="Send a message">
                <DriveFileRenameOutlineTwoTone></DriveFileRenameOutlineTwoTone>
              </div>
              <div className="iconSVG" data-description="Block user">
                <PersonOffTwoTone></PersonOffTwoTone>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
