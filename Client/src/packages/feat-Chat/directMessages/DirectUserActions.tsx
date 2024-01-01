import {
  I_User,
  ModalComponent,
  useAppDispatch,
  useAppSelector,
} from "../../../core";
import { setDisplayUserActions } from "../../../core/CoreSlice";
import { useState } from "react";
import { BlockUserModal } from "../components/modals/BlockUserModal";
import { Actions } from "../components/UserActions";
import { IconHolder } from "../components/style";
import {
  isBlockedByYou,
  isBlockedYou,
  isFriend,
  isSentFriendRequest,
} from "../components/utils";
import { useNavigate } from "react-router-dom";
import {
  inviteToGame,
  setCurrentTab,
  setInviteFromChat,
  setInviteSent,
  setInvited,
} from "../../feat-Game/redux/GameSlice";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import GamesIcon from "@mui/icons-material/Games";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BlockIcon from "@mui/icons-material/Block";
import {
  acceptFriendRequest,
  declineFriendRequest,
  sendFriendRequest,
} from "../../feat-Account/components";

import { Action } from "../components/types";

interface UserActionsProps {
  handleClosePopper?: React.Dispatch<React.SetStateAction<boolean>>;
}
export const UserActionInDirectConversation = ({
  handleClosePopper,
}: UserActionsProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedUser } = useAppSelector((state) => state.chat);
  const currentUser = useAppSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  const [closeType, setCloseType] = useState<"auto" | "click" | undefined>(
    undefined
  );
  const [ChildModal, setChildModal] = useState<JSX.Element>(<></>);
  const block = useAppSelector((state) => state.block);

  const friends: Array<I_User> = useAppSelector(
    (state) => state.friends.friends
  );
  const friendRequests: Array<I_User> = useAppSelector(
    (state) => state.friends.friendRequests
  );
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

  const handleClickAction = (iconType: any, selectedUser: I_User) => {
    switch (iconType) {
      case "blockFriend":
        handleClickModal(
          <BlockUserModal
            intraId={selectedUser.intraId}
            userName={selectedUser.firstName + " " + selectedUser.lastName}
            handleClose={handleClose}
          />
        );
        break;
      case "viewProfile":
        navigate(`/account/profile/${selectedUser.intraId}`);
        break;
      case "play":
        if (selectedUser.status === "ONLINE" && !selectedUser.inGame) {
          dispatch(
            inviteToGame({
              invitedId: selectedUser.intraId,
              inviterId: currentUser.intraId,
              gameMode: "dual",
            })
          );
          dispatch(setInviteSent(true));
          dispatch(setInvited(selectedUser));
          dispatch(setCurrentTab(true));
          dispatch(setInviteFromChat(true));
          navigate('/');
        }
        break;
      case "sendFriendRequest":
        dispatch(sendFriendRequest(selectedUser.intraId));
        break;
      case "acceptFriendRequest":
        dispatch(acceptFriendRequest(selectedUser.intraId));
        break;
      case "declineFriendRequest":
        dispatch(declineFriendRequest(selectedUser.intraId));
        break;
      default:
        break;
    }
  };
  const handleClearIcon = () => {
    if (handleClosePopper) handleClosePopper(false);
    else dispatch(setDisplayUserActions(false));
  };

  const checkUserActionsConstraints = (action: any, id: number) => {
    let checkFriend = true;
    let checkFriendRequests = true;

    if (typeof action.isFriend != "undefined") {
      checkFriend = action.isFriend == isFriend(friends, id);
    }

    if (typeof action.friendRequest != "undefined")
      checkFriendRequests =
        action.friendRequest == isSentFriendRequest(friendRequests, id);

    let checkIsBlockedYou = true;
    if (typeof action.isBlockedYou != "undefined") {
      checkIsBlockedYou = isBlockedYou(id, block) === action.isBlockedYou;
    }
    let checkIsBlockedByeYou = true;
    if (typeof action.isBlockedByYou != "undefined") {
      checkIsBlockedByeYou =
        isBlockedByYou(id, block) === action.isBlockedByYou;
    }

    return (
      checkFriendRequests &&
      checkFriend &&
      checkIsBlockedYou &&
      checkIsBlockedByeYou
    );
  };
  const ActionsArr: Array<Action> = [
    {
      name: "View profile",
      type: "viewProfile",
      component: <AccountCircleIcon />,
      isBlockedYou: false,
      isBlockedByYou: false,
    },
    {
      name: "Send friend request",
      type: "sendFriendRequest",
      component: <PersonAddIcon fontSize="small" />,
      isFriend: false,
      friendRequest: false,
      isBlockedYou: false,
      isBlockedByYou: false,
    },

    {
      name: "Accept friend request",
      type: "acceptFriendRequest",
      component: <CheckCircleOutlineIcon fontSize="small" color="success" />,
      friendRequest: true,
      isBlockedYou: false,
      isBlockedByYou: false,
    },
    {
      name: "Decline friend request",
      type: "declineFriendRequest",
      component: <CancelIcon fontSize="small" color="error" />,
      friendRequest: true,
      isBlockedYou: false,
      isBlockedByYou: false,
    },

    {
      name: "Invite to a game",
      type: "play",
      component: <GamesIcon fontSize="small" />,
      isFriend: true,
      isBlockedYou: false,
      isBlockedByYou: false,
    },
    {
      name: "Block",
      type: "blockFriend",
      component: <BlockIcon fontSize="small" color="error" />,
      isFriend: true,
      isBlockedYou: false,
      isBlockedByYou: false,
    },
  ];

  return (
    <>
      <ModalComponent
        open={open}
        ChildComponent={ChildModal}
        handleClose={handleClose}
        closeType={closeType}
      />
      <Actions
        handleCLose={handleClearIcon}
        username={selectedUser.userName}
        color={"green"}
        status={"Available"}
        avatar_url={selectedUser.avatar_url}
      >
        {ActionsArr.map((icon) => (
          <>
            {checkUserActionsConstraints(icon, selectedUser.intraId) && (
              <IconHolder
                onClick={() => handleClickAction(icon.type, selectedUser)}
              >
                {icon.component}
                {icon.name}
              </IconHolder>
            )}
          </>
        ))}
      </Actions>
    </>
  );
};
