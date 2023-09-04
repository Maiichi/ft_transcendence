import React, { useState } from "react";
import {
  Person,
  LogoutRounded,
  PersonAddAltRounded,
} from "@mui/icons-material";
import { Box, Modal } from "@mui/material";
import { SearchComponent } from "../../../core"; // You might need to import other dependencies here
import "./channelSettingModal.css";

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

export const ChannelSettingModal: React.FC<Props> = ({
  directConversation, channelConversation
}) => {
  const [open, setOpen] = useState(false);
  // const [openInviteModal, setOpenInviteModal] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };

  // console.log("data from props, ", JSON.stringify(selectedConversation))
  // console.log("direct conv =", directConversation);
  // console.log("channel conv =", channelConversation);

  // console.log("here");

  return (
        <>
          { channelConversation !== null
             ? 
             <>
             <h4># {channelConversation.name} </h4>
             <div className="icons-holder">
                <div className="channel-members" onClick={() => setOpen(true)}>
                  <Person /> {channelConversation.members.length}
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-search-invite-users-to-room"
                    aria-describedby="modal-description"
                  >
                    <Box sx={boxStyle}>
                      <div className="modalHeader">
                        <h2>Users</h2>
                        <button
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          X
                        </button>
                        {/* <Close className={"close-button"} style={{cursor: 'pointer'}} onClick={() => setOpen(false)} /> */}
                      </div>
                      <div style={{ overflow: "hidden", maxHeight: "400px" }}>
                        <div className="modal-search">
                          <SearchComponent />
                        </div>
                        <div
                          className="modal-invite-user"
                          // onClick={() => setOpenInviteModal(true)}
                        >
                          <PersonAddAltRounded fontSize="large" />
                          <h4 style={{ marginLeft: "10px" }}>Invite user</h4>
                          {/* <Modal open = {openInviteModal} onClose={() => {setOpenInviteModal(false)}} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" > <Box sx={boxStyle}> hello <button onClick={() => {setOpenInviteModal(false)}} >X</button> </Box> </Modal> */}
                        </div>
                        <div className="modal-users">
                          {channelConversation.members.map((user) => (
                              <p className="user-element">{user.user.userName}</p>
                          ))}
                        </div>
                      </div>
                    </Box>
                  </Modal>
                </div>
                <LogoutRounded />
              </div>
              </>
              : 
                <h4>{directConversation?.participants[0].userName}</h4>
            }
        </>
  );
};

const boxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
  overflow: "hidden",
};
