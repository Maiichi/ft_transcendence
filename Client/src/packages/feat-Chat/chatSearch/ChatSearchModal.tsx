import React, { useState } from "react";
import {
  Search,
  PersonAddTwoTone,
  VideogameAssetTwoTone,
  MapsUgcTwoTone,
} from "@mui/icons-material";
import { Box, Modal } from "@mui/material";
import "./chatSearch.css";

export const ChatSearchModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const discussions = [
    {
      id: 1,
      type: "room",
      name: "riyada",
    },
    {
      id: 2,
      type: "user",
      name: "Ismail Bouroummana",
    },
  ];
  const ModalBody = () => {
    if (discussions.length > 0) {
      return (
        <div className="modalBody">
          {discussions.map((discussion) => (
            <>
              {discussion.type === "room" && (
                <div className="modalBodyElement">
                  <div
                    className="photo"
                    style={{
                      backgroundImage:
                        "url(https://i.pinimg.com/originals/a9/26/52/a926525d966c9479c18d3b4f8e64b434.jpg)",
                    }}
                  ></div>
                  <div className="desc-contact">
                    <p className="name">{discussion.name}</p>
                  </div>
                  <div className="modalSearchIconHolder">
                    <div className="icon-1">join</div>
                  </div>
                </div>
              )}
              {discussion.type === "user" && (
                <div className="modalBodyElement">
                  <div
                    className="photo"
                    style={{
                      backgroundImage:
                        "url(https://i.pinimg.com/originals/a9/26/52/a926525d966c9479c18d3b4f8e64b434.jpg)",
                    }}
                  ></div>
                  <div className="desc-contact">
                    <p className="name">{discussion.name}</p>
                  </div>
                  <div className="modalSearchIconHolder">
                    <div className="icon-1">
                      <MapsUgcTwoTone></MapsUgcTwoTone>
                    </div>
                    <div className="icon-1">
                      <VideogameAssetTwoTone></VideogameAssetTwoTone>
                    </div>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      );
    } else {
      return (
        <div className="modalBodyElement">No Users or rooms available.</div>
      );
    }
  };

  return (
    <div className="searchIconHolder">
      <Search onClick={handleOpen}></Search>
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
                  placeholder="Search..."
                ></input>
              </div>
            </div>
          </div>
          <ModalBody />
        </Box>
      </Modal>
    </div>
  );
};
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
