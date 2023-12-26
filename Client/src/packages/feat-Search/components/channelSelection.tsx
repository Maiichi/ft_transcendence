import { AvatarGroup, Avatar, Button } from "@mui/material";
import { I_Room_Search } from "../types/types";
import { Channel, ButtonNameHolder, ChannelName, ChannelType, NoMatchesFound } from ".";
import { useState } from "react";
import {  ModalComponent, useAppDispatch } from "../../../core";
import { JoinChannelModal } from "../modal/joinChannelModal";
import { useNavigate } from "react-router-dom";
import { joinRoom } from "../redux/searchSlice";

interface Channels {
  filteredRooms: Array<any>;
  userId: number;
}

const ChannelsSelection = ({ filteredRooms, userId }: Channels) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleJoinRoom = (rooms: I_Room_Search) => {
    const roomInfo = {
      id: rooms.id,
      password: rooms.password,
    };
    dispatch(joinRoom(roomInfo));
  };
  // check if the user is a member or not to display the button based on the membership
  const isUserInRoom = (roomS: I_Room_Search, userID: number) => {
    return roomS.members.find((item) => item.user.intraId == userID);
  };
  const ButtonRoom = ({ room }: { room: I_Room_Search }) => {
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
    var title = isUserInRoom(room, userId) ? "ACCESS" : "JOIN";

    const handleCLick = () => {
      if (title == "ACCESS") navigate("/chat");
      else if (room.type === "protected")
        handleClickModal(
          <JoinChannelModal roomId={room.id} handleClose={handleClose} />
        );
      else handleJoinRoom(room);
    };
    return (
      <>
        <ModalComponent
          open={open}
          ChildComponent={ChildModal}
          handleClose={handleClose}
          closeType={closeType}
        />
        <Button
          variant="contained"
          style={{ backgroundColor: "#5e35b1d9" }}
          onClick={handleCLick}
        >
          {title}
        </Button>
      </>
    );
  };

  return (
    <>
      {filteredRooms.length !== 0 ? (
        filteredRooms.map((room: I_Room_Search) => (
          <Channel key={room.id}>
            <ButtonNameHolder>
              <div
                style={
                  {
                    // display: 'flex',
                    // flexDirection: 'column',
                    // alignItem: 'center'
                  }
                }
              >
                <ChannelName>{room.name}</ChannelName>
                <ChannelType>{room.type}</ChannelType>
              </div>
              <ButtonRoom room={room} />
            </ButtonNameHolder>
            <AvatarGroup max={4} style={{ justifyContent: "flex-end" }}>
              {room.members.map((member: any) => (
                <Avatar
                  key={member.user.intraId}
                  alt="user"
                  src={member.user.avatar_url}
                />
              ))}
            </AvatarGroup>
          </Channel>
        ))
      ) : (
        <NoMatchesFound>No Room available</NoMatchesFound>
      )}
    </>
  );
};

export default ChannelsSelection;
export { ChannelsSelection };
