import { DriveFileRenameOutlineTwoTone } from "@mui/icons-material";
import { Search, PersonAddTwoTone, VideogameAssetTwoTone, MapsUgcTwoTone } from "@mui/icons-material";
import { Box, Modal } from "@mui/material";
import "./messageModal.css"
import { useState } from "react";


export const MessageModal = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="newMessageHolder">
            <DriveFileRenameOutlineTwoTone onClick = {handleOpen}  ></DriveFileRenameOutlineTwoTone>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <div className="modalHeader">
                        <div className="modalHeaderSearch">
                            <div className="searchbar">
                                {/* <i className="fa-fa-search" aria-hidden="false"></i> */}
                                <input
                                className="searchInput"
                                type="text"
                                placeholder="Search Users ..."
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="messageField">
                            <textarea className="modalMessageInput" placeholder="Write your message ..."></textarea>
                            <div className="buttonsHolder">
                                <button className="modalSubmitButtom">Send</button>
                                <button className="modalSubmitButtom">Cancel</button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

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