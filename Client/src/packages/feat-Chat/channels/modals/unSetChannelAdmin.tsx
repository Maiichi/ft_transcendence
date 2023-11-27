import styled from "styled-components";
import { useAppDispatch } from "../../../../core";
import { unSetAdminRoom } from "../redux/roomSlice";


export const UnSetChannelAdmin = (props: {
  data: any;
  handleClose: () => void;
}) => {
  const { handleClose, data } = props;
  const dispatch = useAppDispatch();

    console.log('data ==', data);
    const handleUnSetChannelAdmin = () => {
        // dispatch the function to unset admin in a channel
        dispatch(unSetAdminRoom(data));
        handleClose();
    }

  return (
    <>
      <ModalHeader>
        <h3>Do you want to remove the admin previleges for {`user x`} ?</h3>
      </ModalHeader>
      <ModalFooter>
        <ButtonCancel onClick={handleClose}>Cancel</ButtonCancel>
        <ButtonLeave onClick={handleUnSetChannelAdmin}>Confirm</ButtonLeave>
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
