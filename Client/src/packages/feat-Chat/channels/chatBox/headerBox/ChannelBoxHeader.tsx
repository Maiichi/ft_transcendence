import { useState } from "react";
import { Person, PersonAddAltRounded } from "@mui/icons-material";
import { Box, Modal, PopperPlacementType } from "@mui/material";
import { I_Room } from "../../../Types/types";
import styled from "styled-components";
import { LeaveRoomModal } from "../../modals/leaveChannelModal";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { PopperComponent } from "../../../../../core";
const UpdateRoomForm = () => {
  return <>UpdateRoomForm</>;
};
export const ChannelBoxHeader = (props: { channelConversation: I_Room }) => {
  const { channelConversation } = props;
  const [open, setOpen] = useState({
    users: false,
    updateRoom: false,
  });
  const [anchorEl, setAnchorEl] = useState<any | null>(null);
  const [popperStyle, setPopperStyle] = useState<React.CSSProperties>();
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [ChildPopper, setChildPopper] = useState<JSX.Element>(
    <UpdateRoomForm />
  );
  const handleClose = () => {
    setOpen({ ...open, users: false });
  };
  const handleUpdateRoom = (e: React.MouseEvent<any>) => {
    console.log("hanlde");
    setAnchorEl(e.currentTarget);
    setOpen({ ...open, updateRoom: true });
  };

  return (
    <>
      <h4>
        # {channelConversation.name}{" "}
        <ArrowDropDownIcon onClick={(e) => handleUpdateRoom(e)} />
      </h4>
      <PopperComponent
        paperStyle={{
          backgroundColor: "rgb(255, 255, 255)",
          color: "rgb(54, 65, 82)",
          borderRadius: "10px",
          overflow: "hidden",
          border: "none rgba(144, 202, 249, 0.145)",
        }}
        popperStyle={popperStyle}
        anchorEl={anchorEl}
        open={open.updateRoom}
        placement="bottom-start"
        ChildComponent={ChildPopper}
      />
      <IconHolder>
        <ChannelMembers onClick={() => setOpen({ ...open, users: true })}>
          <Person /> {channelConversation.members.length}
          <Modal
            open={open.users}
            onClose={handleClose}
            aria-labelledby="modal-search-invite-users-to-room"
            aria-describedby="modal-description"
          >
            <Box sx={boxStyle}>
              <ModalHeader>
                <h2>Users</h2>
                <ButtonCloseModal onClick={handleClose}>X</ButtonCloseModal>
                {/* <Close className={"close-button"} style={{cursor: 'pointer'}} onClick={() => setOpen(false)} /> */}
              </ModalHeader>
              <div
                style={{
                  overflow: "hidden",
                  maxHeight: "400px",
                }}
              >
                <div className="modal-search">{/* <SearchComponent /> */}</div>
                <ModalInviteUser
                // onClick={() => setOpenInviteModal(true)}
                >
                  <PersonAddAltRounded fontSize="large" />
                  <h4 style={{ marginLeft: "10px" }}>Invite user</h4>
                  {/* <Modal open = {openInviteModal} onClose={() => {setOpenInviteModal(false)}} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" > <Box sx={boxStyle}> hello <button onClick={() => {setOpenInviteModal(false)}} >X</button> </Box> </Modal> */}
                </ModalInviteUser>
                <UsersModal>
                  {channelConversation.members.map((user) => (
                    <UserElement key={user.user.intraId}>
                      {user.user.userName}
                    </UserElement>
                  ))}
                </UsersModal>
              </div>
            </Box>
          </Modal>
        </ChannelMembers>
        <LeaveRoomModal channelConversation={channelConversation} />
      </IconHolder>
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

const IconHolder = styled.div`
  display: flex;
  align-items: center;
`;

const ChannelMembers = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #d7d7d7;
  border-radius: 7px;
  margin-right: 10px;
  cursor: pointer;
  padding: 5px;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonCloseModal = styled.button`
  height: 20px;
  width: 40px;
  border-radius: 10px;
  background-color: red;
`;

const ModalInviteUser = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px 0px 0px;

  &:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
`;

const UsersModal = styled.div`
  overflow-y: scroll;
  max-height: 100%;
  scrollbar-color: red;
`;

const UserElement = styled.p`
  &:hover {
    cursor: pointer;
    background-color: #f1f1f1;
  }
`;

const ButtonLeave = styled.div`
  height: 40px;
  width: 100px;
  border: 10px;
  border-radius: 10px;
  cursor: pointer;
  background: red;
  &:hover {
    background-color: rgb(244, 56, 56);
    color: #f1f1f1;
  }
`;

const ButtonCancel = styled.div`
  height: 40px;
  width: 100px;
  border: 10px;
  border-radius: 10px;
  cursor: pointer;
  background: grey;
`;

const ModalFooter = styled.div`
  margin: 25px 0px 0px 0px;
  display: flex;
  justify-content: space-evenly;
`;
