import "./chatUsers.css";
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
import { useAppDispatch, useAppSelector } from "../../../core";
import { useEffect } from "react";
import { login } from "../../feat-Auth/components/authThunk";

interface Conversation {
    id: number;
    createdAt: string;
    updatedAt: string;
    type: string;
    messages: { content: string; createdAt: string }[];
    participants: {
      userName: string;
      firstName: string;
      lastName: string;
      status: string;
      avatar_url: string;
    }[];
  }
  
  interface Room {
    id: number;
    members: {
      isAdmin: boolean;
      isBanned: boolean;
      isMute: boolean;
      isOwner: boolean;
      user: {
        firstName: string;
        lastName: string;
        userName: string;
      };
    }[];
    name: string;
    createdAt: string;
    updatedAt: string;
    password: string;
    type: string;
  }
  
  interface Props {
    directConversation: Conversation | null
    channelConversation: Room | null;
  }


export const ChatUsers = ({ directConversation, channelConversation }: Props) => {
    const account = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    console.log("username ===" + account.userName);
    
    const color = directConversation?.participants[0].status === 'ONLINE' ? 'green' : 'grey';
    return (
        <div className="onlineUsersBox">
        {channelConversation === null ? (
            <>
                {
                <>
                <div className="rightSideHeader">
                    <h3>{directConversation?.participants[0].userName}</h3>
                    <img className="photo-avatar" src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png" alt="" />
                    <div style={{display: 'flex', flexDirection: 'row-reverse', margin: '20px'}}>
                        <h4 style={{margin: '0px'}}>{directConversation?.participants[0].status === 'ONLINE' ? 'Available' : 'Not availabe'}</h4>
                        <div style={{height: '20px', width: '20px', backgroundColor: color, borderRadius: '20px', marginRight: '5px'}}>
                        </div>
                    </div>
                    
                </div>
                <Divider style={{height : '2px', margin : '0px 30px 0px 30px'}} />
                <div className="rightSideBody">
                    <div className="icon-title">
                        <Person /> 
                        <h4 className="title-text">View Profile</h4>
                    </div>
                    <div className="icon-title">
                        <Gamepad /> 
                        <h4 className="title-text">Invite to game</h4>
                    </div>
                    <div className="icon-title">
                        <PersonAddAlt1 /> 
                        <h4 className="title-text" >{directConversation?.id ? 'send Message' : 'Add to friend list'}</h4>
                    </div>
                    <div className="icon-title">
                        <Block /> 
                        <h4 className="title-text">Block</h4>
                    </div>
                    
                </div>
                <Divider style={{height : '2px', margin : '0px 30px 0px 30px'}} />
                <div className="rightSideFooter"></div>
                </>
                }
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
                <p className="onlineUsersName">{account.userName}</p>
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
