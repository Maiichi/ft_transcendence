import styled from "styled-components";
import { useAppDispatch } from "../../redux";
import { useLocation, useNavigate } from "react-router-dom";
import { receiveGameInvitation, setInviteAccepted, setInviteDeclined } from "../../../packages/feat-Game/redux/GameSlice";
import { setDisplayGameInvitation } from "../../CoreSlice";



export const InvitationGameModal = (props : 
    { handleClose: () => void,
}) => {
    const { handleClose} = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const handleAcceptGameInvitation = () => {
      dispatch(receiveGameInvitation(false));
      dispatch(setInviteAccepted(true));
      dispatch(setDisplayGameInvitation(false));
      if (location.pathname !== "/game")
        navigate('/game');
      handleClose();
    };

    const handleDeclineGameInvitation = () => {
        dispatch(receiveGameInvitation(false));
        dispatch(setDisplayGameInvitation(false));
        dispatch(setInviteDeclined(true));
        handleClose();
    };

    return (
        <>
        <ModalHeader>
            <h3>User X challenge you to dual game Pong?</h3>
        </ModalHeader>
        <ModalFooter>
            <ButtonCancel onClick={handleDeclineGameInvitation}>Decline</ButtonCancel>
            <ButtonLeave onClick={handleAcceptGameInvitation}>Accept</ButtonLeave>
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