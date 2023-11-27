import { Avatar, Divider } from "@mui/material";
import { Block, Gamepad, Person, PersonAddAlt1 } from "@mui/icons-material";
import styled from "styled-components";
import { ModalComponent, useAppDispatch, useAppSelector } from "../../../core";
import { setDisplayUserActions } from "../../../core/CoreSlice";
import ClearIcon from "@mui/icons-material/Clear";
import CircleIcon from "@mui/icons-material/Circle";
import { useState } from "react";
import { Action, I_User } from "../components/types";
import GamesIcon from "@mui/icons-material/Games";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { BlockUserModal } from "./modals/BlockUserModal";

export const Icons: Array<Action> = [
    
    {
      name: "View profile",
      type: "viewProfile",
      component: <AccountCircleIcon />,
      role: ["member"],
    },
    {
      name: "Invite to a game",
      type: "play",
      component: <GamesIcon />,
      role: ["member"],
    },
    {
      name: "Block",
      type: "blockFriend",
      component: <PersonOffIcon />,
      role: ["member"],
    },
  ];

export const UserActionInDirectConversation = () => {
    const dispatch = useAppDispatch();
    const { selectedUser } = useAppSelector((state) => state.chat);
    const [open, setOpen] = useState(false);
    const [closeType, setCloseType] = useState<"auto" | "click" | undefined>(
        undefined
    );
    const [ChildModal, setChildModal] = useState<JSX.Element>(<></>);
    const handleClickModal = (
        childModal: JSX.Element,
        closeType?: "auto" | "click"
    ) => {
        setCloseType(closeType);
        setOpen(true);
        setChildModal(childModal);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickIcon = (iconType: any, selectedUser: I_User) => {
        switch (iconType) {
            case "blockFriend":
                handleClickModal( <BlockUserModal data={selectedUser} handleClose={handleClose}/>);
                break;
            
            default:
                break;
        }

    }

    return (
        <RightSide>
            <ModalComponent
                open={open}
                ChildComponent={ChildModal}
                handleClose={handleClose}
                closeType={closeType}
            />
            <ClearIcon onClick={() => dispatch(setDisplayUserActions(false))} />
            <h2></h2>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <CircleIcon sx={{ color: 'GREY' }} />
            <p>Not available</p>
            <Divider variant="inset" />
            <IconsHolder>
                {
                    Icons.map((icon) => (
                        <IconHolder 
                            onClick={() => handleClickIcon(icon.type, selectedUser)}
                        >
                            {icon.component}
                            {icon.name}
                        </IconHolder>
                    ))
                }
            </IconsHolder>
        </RightSide>
    );
  };

const RightSide = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    flex: 2 1 0%;
    border-left: 1px solid rgb(215, 215, 215);
`;

/** CHANNEL USERS **/

const IconsHolder = styled.div``;
const Root = styled.div`
flex : 2;
height: 100%;
/* border-radius: 20px; */
border-left: 1px solid #d7d7d7;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
`;

const Footer = styled.div``;

const StatusHolder = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin: 20px;
`;

const StatusCercle = styled.div`
    height: 20px;
    width: 20px;
    background-color: grey;
    border-radius: 20px;
    margin-right: 5px;
`;

const IconHolder = styled.div`
    display: flex;
    margin : 10px;
    align-items: center;
    &:hover {
        cursor: pointer;
        background-color:  #f5f6f7;
        width: calc(90% - 20px);
    }
`;

const IconText = styled.h4`
    margin : 0px 0px 0px 7px;
`;
