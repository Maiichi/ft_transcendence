import { useState } from "react";
import { Close, LockSharp, LockOpenSharp } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../../core";
import { createRoom } from "../redux/roomSlice";
import styled from "styled-components";
import { AntSwitch } from "../../components/AntSwitch";

export const CreateChannelModal = (props: { handleClose: () => void }) => {
  const { handleClose } = props;
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.auth.user);
  const [activate, setActivate] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomDesc, setRoomDesc] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [roomCreationError, setRoomCreationError] = useState(null);
  const toggleActivate = () => {
    setActivate(!activate);
  };

  const closeModal = () => {
    handleClose();
    if (roomCreationError) setRoomCreationError(null);
  };

  const handleCreateRoom = () => {
    const roomData = {
      name: roomName,
      ownerId: account.intraId,
      description: roomDesc,
      type: activate ? "private" : "public",
      password: roomPassword,
    };
    dispatch(createRoom(roomData));
    setRoomName("");
    setRoomDesc("");
    setRoomPassword("");
    handleClose();
  };

  return (
    <div>
      <ModalHeader>
        <h2>Create new channel</h2>
        <Close className={"close-button"} onClick={handleClose} />
      </ModalHeader>
      <ModalBody>
        {/* Display the error message here */}
        {roomCreationError && <ErrorMessage>{roomCreationError}</ErrorMessage>}

        <ChannelFieldHolder>
          Channel name
          <FieldInput
            type="text"
            placeholder="new-channel"
            value={roomName}
            onChange={(text) => setRoomName(text.target.value)}
          />
        </ChannelFieldHolder>
        <ChannelFieldHolder>
          Channel Description (optional)
          <FieldInput
            placeholder="channel description"
            value={roomDesc}
            onChange={(text) => setRoomDesc(text.target.value)}
          />
        </ChannelFieldHolder>
        <div>
          <PasswordHeaderHolder>
            {activate ? <LockSharp /> : <LockOpenSharp />}
            <AntSwitch checked={activate} onChange={toggleActivate} />
          </PasswordHeaderHolder>
          {activate && (
            <PasswordHolder>
              password
              <FieldInput
                type="password"
                placeholder=""
                value={roomPassword}
                onChange={(text) => setRoomPassword(text.target.value)}
              />
            </PasswordHolder>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <CancelButton onClick={closeModal}>Cancel</CancelButton>
        <CreateButton onClick={() => handleCreateRoom()}>Create</CreateButton>
      </ModalFooter>
    </div>
  );
};

// const iconAddChannel = {
// };

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalBody = styled.div``;

const ErrorMessage = styled.div`
  color: red;
`;

const ChannelFieldHolder = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
`;

const FieldInput = styled.input`
  height: 100%;
  padding: 10px;
  border: 1px solid #d5d0d0;
  border-radius: 5px;
  margin-top: 10px;
  background-color: #f9f9f9;
`;

const PasswordHolder = styled.div`
  display: flex;
  flex-direction: column;
`;

const PasswordHeaderHolder = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px;
  align-items: baseline;
`;

const ModalFooter = styled.div`
  margin: 25px 0px 0px 0px;
  display: flex;
  justify-content: space-evenly;
`;

const CreateButton = styled.button`
  height: 40px;
  width: 100px;
  border: 10px;
  border-radius: 10px;
  cursor: pointer;
  background-color: rgb(178, 163, 201);
`;

const CancelButton = styled.button`
  height: 40px;
  width: 100px;
  border: 10px;
  border-radius: 10px;
  cursor: pointer;
`;
