import React, { useEffect, useState } from "react";
import {
    Person,
    LogoutRounded,
    PersonAddAltRounded,
} from "@mui/icons-material";
import { Box, Modal } from "@mui/material";
import { SearchComponent, useAppDispatch, useAppSelector } from "../../../core"; // You might need to import other dependencies here
import "./channelSettingModal.css";
import { Conversation, Membership } from "../Types/types";
import { leaveRoom } from "../components/rooms/chatThunk";

interface Props {
    directConversation: Conversation | null;
    channelConversation: Membership | null;
}

export const ChannelSettingModal: React.FC<Props> = ({
    directConversation,
    channelConversation,
}) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [openLeaveModal, setOpenLeaveModal] = useState(false);
    const handleClose = () => {
        setOpen(!open);
    };
    const handleCloseLeaveRoomModal = () => {
        setOpenLeaveModal(!openLeaveModal);
    };

    const handleLeaveRoom = () => {
        // dispatch(setIsConversation(false));
        // dispatch(leaveRoom({socket: socket as Socket, roomId: channelConversation?.id}))
        // .then(() => {
        //   // if (channelConversation)
        //   //   dispatch(removeMembership(channelConversation))
        // })
        // .catch((err) => {
        //   console.log("err == ", err);
        // });
        setOpenLeaveModal(false);
    };
    return (
        <>
            {channelConversation !== null ? (
                <>
                    <h4># {channelConversation.name} </h4>
                    <div className="icons-holder">
                        <div
                            className="channel-members"
                            onClick={() => setOpen(true)}
                        >
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
                                    <div
                                        style={{
                                            overflow: "hidden",
                                            maxHeight: "400px",
                                        }}
                                    >
                                        <div className="modal-search">
                                            {/* <SearchComponent /> */}
                                        </div>
                                        <div
                                            className="modal-invite-user"
                                            // onClick={() => setOpenInviteModal(true)}
                                        >
                                            <PersonAddAltRounded fontSize="large" />
                                            <h4 style={{ marginLeft: "10px" }}>
                                                Invite user
                                            </h4>
                                            {/* <Modal open = {openInviteModal} onClose={() => {setOpenInviteModal(false)}} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" > <Box sx={boxStyle}> hello <button onClick={() => {setOpenInviteModal(false)}} >X</button> </Box> </Modal> */}
                                        </div>
                                        <div className="modal-users">
                                            {channelConversation.members.map(
                                                (user) => (
                                                    <p className="user-element">
                                                        {user.user.userName}
                                                    </p>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                        <LogoutRounded
                            onClick={() => setOpenLeaveModal(true)}
                            style={{ cursor: "pointer" }}
                        />
                        <Modal
                            open={openLeaveModal}
                            onClose={handleCloseLeaveRoomModal}
                            aria-labelledby="modal-search-invite-users-to-room"
                            aria-describedby="modal-description"
                        >
                            <Box sx={boxStyle}>
                                <div className="modalHeader">
                                    <h3>
                                        you want to leave #
                                        {channelConversation.name} ?
                                    </h3>
                                    {/* <Close className={"close-button"} style={{cursor: 'pointer'}} onClick={() => setOpen(false)} /> */}
                                </div>
                                <div className="modalFooter">
                                    <button
                                        className="button-cancel"
                                        onClick={() => setOpenLeaveModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="button-leave"
                                        onClick={handleLeaveRoom}
                                    >
                                        {" "}
                                        Confirm{" "}
                                    </button>
                                </div>
                            </Box>
                        </Modal>
                    </div>
                </>
            ) : (
                <h4>{directConversation?.participants[0].userName}</h4>
            )}
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
