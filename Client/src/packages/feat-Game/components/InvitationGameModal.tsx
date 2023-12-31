
import { useAppDispatch, useAppSelector } from "../../../core/redux";
import { useLocation, useNavigate } from "react-router-dom";

import { ModalConfirm } from "../../../core/utils/components/modals/ModalConfirm";

import { acceptGameInvitation, declineGameInvitation, setCurrentTab, setInviter } from "../redux/GameSlice";



export const InvitationGameModal = (props : 
    { handleClose: () => void,
}) => {
    const { handleClose} = props;
    const dispatch = useAppDispatch();
    // const user = useAppSelector((state) => state.auth.user);
    const inviter = useAppSelector((state) => state.game.inviter);
    const navigate = useNavigate();
    const location = useLocation();

    const handleAcceptGameInvitation = () => {
        handleClose();
        dispatch(setCurrentTab(true));
        dispatch(acceptGameInvitation({inviterId: inviter.intraId}));
        if (location.pathname !== "/")
            navigate('/');
    };

    const handleDeclineGameInvitation = () => {
        dispatch(declineGameInvitation({inviterId: inviter.intraId}));
        dispatch(setInviter(null));
        handleClose();
    };
    // ` ${inviter.firstName} ${inviter.lastName} challenge you to dual game Pong?
    return (
        <>
        {
           inviter &&  
            <ModalConfirm
                title={`${inviter.firstName} ${inviter.lastName} challenge you to dual game Pong?`}
                handleClose={handleDeclineGameInvitation}
                handleClick={handleAcceptGameInvitation}
                closeTitle="Decline"
                confirmTitle="Accept"
            />
        }
        </>
    );
};