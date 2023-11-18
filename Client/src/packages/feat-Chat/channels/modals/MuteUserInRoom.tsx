import styled from "styled-components";
import { useAppDispatch } from "../../../../core";
import { muteMember } from "../redux/roomSlice";
import { useState } from "react";


export const MuteUserInRoom = (props: {
  data: any;
  handleClose: () => void;
}) => {
  const { handleClose, data } = props;
  const [muteTime, setMuteTime] = useState<number>(0);
  const dispatch = useAppDispatch();

    console.log('data ==', data);
    const handleMuteMember = () => {
        setMuteTime(60);
        console.log('time ==', muteTime);
        const DataMute = {
            roomId: data.roomId,
            userId: data.userId,
            timeMute: 60
        }
        console.log("dataMUte =", DataMute);
        // dispatch the function to set admin in a channel
        dispatch(muteMember(DataMute));
        handleClose();
    }

  return (
    <>
      <ModalHeader>
        <h3>Do you want to mute {`user x`} ?</h3>
      </ModalHeader>
      <ModalFooter>
        <ButtonCancel onClick={handleClose}>Cancel</ButtonCancel>
        <ButtonLeave onClick={handleMuteMember}>Confirm</ButtonLeave>
      </ModalFooter>
    </>
  );
};

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ModalFooter = styled.div`
  margin: 25px 0px 0px 0px;
  display: flex;
  justify-content: space-evenly;
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