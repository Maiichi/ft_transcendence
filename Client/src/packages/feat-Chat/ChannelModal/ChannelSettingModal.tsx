import { useState } from 'react'
import { Person, LogoutRounded, Close, PersonAddAltRounded } from '@mui/icons-material';
import { Box, Modal } from '@mui/material';
import "./channelSettingModal.css"
import { SearchComponent } from '../../../core';

export const ChannelSettingModal = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <p>#Channel 1</p>
            <div className="icons-holder">
            <div className="channel-members" onClick={() => setOpen(true)}>
                <Person />
                20
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={boxStyle}>
                        <div className="modalHeader">
                            <h2>Users</h2>
                            <Close className={"close-button"} style={{cursor: 'pointer'}} onClick={() => setOpen(false)} />
                        </div>
                        <div className="modalBody">
                           <div className="modal-search">
                                <SearchComponent />
                           </div>
                           <div className="modal-invite-user">
                                <PersonAddAltRounded fontSize='large' />
                                <h4 style={{marginLeft: '10px'}}>Invite user</h4>
                           </div>
                           <div className="modal-users">
                                <p>user 1</p>
                                <p>user 1</p>
                                <p>user 1</p>
                                <p>user 1</p>
                                <p>user 1</p>
                                <p>user 1</p>
                                <p>user 1</p>
                                <p>user 1</p>
                           </div>
                        </div>  
                    </Box>
                </Modal>
            </div>
            <LogoutRounded />    
            </div>
        </>
    )
}

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
    overflow: 'hidden',
};