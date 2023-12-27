import { useNavigate } from "react-router-dom";
import { Message } from "@mui/icons-material";
import { Button, Grow, Text, Usercard, Avatar } from "../styles";
import { gamerType, userType } from "./statsType";
import CircularProgressBar from "./utils/CircularProgressBar";
import LinearDeterminate from "./utils/linearProgressBar";
import { Badge, Stack } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import GamesIcon from "@mui/icons-material/Games";
import BlockIcon from "@mui/icons-material/Block";

import {
  I_User,
  ModalComponent,
  useAppDispatch,
  useAppSelector,
} from "../../../core";
import { useEffect, useState } from "react";
import { NewDirectMessage } from "../../feat-Chat/components/modals/CreateDirectMessageModal";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  acceptFriendRequest,
  blockUser,
  declineFriendRequest,
  getUserFriends,
  sendFriendRequest,
} from "./redux";
import {
  isFriend,
  isSentFriendRequest,
} from "../../feat-Chat/components/utils";
import { IconHolder } from "../../feat-Chat/components/style";
import { BlockUserModal } from "../../feat-Chat/components/modals/BlockUserModal";
import { Action } from "../../feat-Chat/components/types";
const UserCard = (props: { gamer: gamerType; isOwner: boolean }) => {
  const { gamer, isOwner } = props;
  const [open, setOpen] = useState(false);
  const [ChildModal, setChildModal] = useState<JSX.Element>(<></>);
  const [closeType, setCloseType] = useState<"auto" | "click" | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();
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
  const checkConstraints = (action: any, id: number) => {
    let checkFriend = true;
    let checkFriendRequests = true;

    if (typeof action.isFriend != "undefined") {
      checkFriend = action.isFriend == isFriend(friends, id);
    }

    if (typeof action.friendRequest != "undefined")
      checkFriendRequests =
        action.friendRequest == isSentFriendRequest(friendRequests, id);

    return checkFriendRequests && checkFriend;
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
      case "message":
        handleClickModal(
          <NewDirectMessage
            handleClose={handleClose}
            selectedUser={selectedUser}
          />
        );
        break;
      case "play":
        console.log("invite to game");
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
  const Actions: Array<Action> = [
    {
      name: "Send friend request",
      type: "sendFriendRequest",
      component: <PersonAddIcon fontSize="small" />,
      isFriend: false,
      friendRequest: false,
    },
    {
      name: "Accept friend request",
      type: "acceptFriendRequest",
      component: <CheckCircleOutlineIcon fontSize="small" color="success" />,
      friendRequest: true,
    },
    {
      name: "Decline friend request",
      type: "declineFriendRequest",
      component: <CancelIcon fontSize="small" color="error" />,
      friendRequest: true,
    },
    {
      name: "Send message",
      type: "message",
      component: <Message fontSize="small" />,
    },

    {
      name: "Invite to a game",
      type: "play",
      component: <GamesIcon fontSize="small" />,
      isFriend: true,
    },
    {
      name: "Block",
      type: "blockFriend",
      component: <BlockIcon fontSize="small" color="error" />,
      isFriend: true,
    },
  ];

  useEffect(() => {
    dispatch(getUserFriends());
  }, []);
  return (
    <Usercard>
      <ModalComponent
        open={open}
        ChildComponent={ChildModal}
        handleClose={handleClose}
        closeType={closeType}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minWidth: "80%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "0 20px 0 20px",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <Stack direction="row" spacing={2}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                }}
                alt="UserImg"
                src={gamer.user.avatar_url}
              />

              <Badge
                sx={{
                  width: 12,
                  height: 12,
                  animation: "ripple 1.2s infinite ease-in-out",
                  borderRadius: "50%",
                  top: "77px",
                  right: "34px",
                  backgroundColor: `${
                    gamer.user.status == "ONLINE" ? "green" : "#880b0b"
                  }`,
                }}
              ></Badge>
            </Stack>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "start",
              }}
            >
              <Text variant="h5">
                {`${gamer.user.firstName} ${gamer.user.lastName}`}
              </Text>
              {!isOwner && (
                <>
                  {Actions.map((action) => {
                    return (
                      checkConstraints(action, gamer.user.intraId) && (
                        <IconHolder
                          onClick={() =>
                            handleClickAction(action.type, gamer.user)
                          }
                        >
                          {action.component}
                          {action.name}
                        </IconHolder>
                      )
                    );
                  })}
                </>
              )}
            </div>
          </div>
          <Grow prograssShow="circular">
            <CircularProgressBar progress={gamer.rank} />
          </Grow>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "end",
            textAlign: "center",
            padding: "0 2% 0 10%",
          }}
        >
          <Text variant="body1">
            {"Total matches"} <br /> <span> {gamer.totalmatch} </span>
          </Text>
          <Text variant="body1">
            {"Wins"} <br /> <span> {gamer.wins} </span>
          </Text>
          <Text variant="body1">
            {"Achievements"} <br /> <span> {gamer.achivs} </span>
          </Text>
        </div>
        <Grow prograssShow="linear">
          <LinearDeterminate progress={gamer.rank} />
        </Grow>
      </div>
    </Usercard>
  );
};

export default UserCard;
