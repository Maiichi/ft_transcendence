import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../core/redux";
import { useLocation, useNavigate } from "react-router-dom";
import { acceptUserGameInvite, declineUserGameInvite, receiveGameInvitation, setInviteAccepted, setInviteDeclined } from "../redux/GameSlice";
import { setDisplayGameInvitation } from "../../../core/CoreSlice";
import { ModalConfirm } from "../../../core/utils/components/modals/ModalConfirm";



export const InvitationGameModal = (props : 
    { handleClose: () => void,
}) => {
    const { handleClose} = props;
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const inviterId = useAppSelector((state) => state.gameState.inviterId);
    const navigate = useNavigate();
    const location = useLocation();

    const handleAcceptGameInvitation = () => {
      dispatch(receiveGameInvitation(false));
      dispatch(acceptUserGameInvite({inviterId: inviterId}));
      if (location.pathname !== "/game")
        navigate('/game');
      handleClose();
    };

    const handleDeclineGameInvitation = () => {
        dispatch(receiveGameInvitation(false));
        dispatch(declineUserGameInvite({inviterId: inviterId}));
        dispatch(setInviteDeclined(true));
        handleClose();
    };

    return (
        <>
        <ModalConfirm
        title={`User ${inviterId} challenge you to dual game Pong?`}
        handleClose={handleDeclineGameInvitation}
        handleClick={handleAcceptGameInvitation}
        closeTitle="Decline"
        confirmTitle="Accept"
      />
        {/* <ModalHeader>
            <h3></h3>
        </ModalHeader>
        <ModalFooter>
            <ButtonCancel onClick={handleDeclineGameInvitation}>Decline</ButtonCancel>
            <ButtonLeave onClick={handleAcceptGameInvitation}>Accept</ButtonLeave>
        </ModalFooter> */}
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