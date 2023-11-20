import styled from "styled-components";
import { useAppDispatch } from "../../../../core";
import { setAdminRoom } from "../redux/roomSlice";


export const SetChannelAdmin = (props: {
  data: any;
  handleClose: () => void;
}) => {
  const { handleClose, data } = props;
  const dispatch = useAppDispatch();

    console.log('data ==', data);
    const handleSetChannelAdmin = () => {
        // dispatch the function to set admin in a channel
        dispatch(setAdminRoom(data));
        handleClose();
    }

  return (
    <>
      <ModalHeader>
        <h3>Do you want to set {`user x`} as admin for this {`channel x`} ?</h3>
      </ModalHeader>
      <ModalFooter>
        <ButtonCancel onClick={handleClose}>Cancel</ButtonCancel>
        <ButtonLeave onClick={handleSetChannelAdmin}>Confirm</ButtonLeave>
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
