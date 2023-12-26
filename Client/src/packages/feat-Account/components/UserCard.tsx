import { useNavigate } from "react-router-dom";
import { Message, PersonAddAlt } from "@mui/icons-material";
import { Button, Grow, Text, Usercard, Avatar } from "../styles";
import { gamerType, userType } from "./statsType";
import CircularProgressBar from "./utils/CircularProgressBar";
import LinearDeterminate from "./utils/linearProgressBar";
import { Badge, Stack } from "@mui/material";
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
const UserCard = (props: { gamer: gamerType; isOwner: boolean }) => {
  const { gamer, isOwner } = props;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClick = (user: userType) => {
    dispatch(sendFriendRequest(user.intraId));
  };
  const friends: Array<I_User> = useAppSelector(
    (state) => state.friends.friends
  );
  const friendRequests: Array<I_User> = useAppSelector(
    (state) => state.friends.friendRequests
  );
  console.log("frined : ", friends);
  console.log("friendRequests : ", friendRequests);
  const checkConstraints = (action: any, id: number) => {
    let checkFriend = true;
    let checkFriendRequests = true;
    if (action.constraint) {
      console.log(action);
      if (typeof action.constraint.isFriend != "undefined") {
        console.log("eed", action.constraint.isFriend == isFriend(friends, id));
        checkFriend = action.constraint.isFriend == isFriend(friends, id);
      }

      if (typeof action.constraint.friendRequest != "undefined")
        checkFriendRequests =
          action.constraint.friendRequest ==
          isSentFriendRequest(friendRequests, id);
    }
    return checkFriendRequests && checkFriend;
  };
  const Actions: Array<any> = [
    {
      name: "Send friend request",
      type: "sendFriendRequest",
      component: (
        <Button
          sx={{
            padding: 0,
            textTransform: "lowercase",
          }}
          size="small"
          startIcon={<PersonAddIcon fontSize="small" />}
          onClick={() => dispatch(sendFriendRequest(gamer.user.intraId))}
        >
          Send friend request
        </Button>
      ),
      constraint: {
        isFriend: false,
        friendRequest: false,
      },
    },
    {
      name: "Accept friend request",
      type: "acceptFriendRequest",
      component: (
        <Button
          sx={{
            padding: 0,
            textTransform: "lowercase",
          }}
          size="small"
          startIcon={<PersonAddIcon fontSize="small" />}
          onClick={() => dispatch(acceptFriendRequest(gamer.user.intraId))}
        >
          Accept friend request
        </Button>
      ),
      constraint: {
        friendRequest: true,
      },
    },
    {
      name: "Decline friend request",
      type: "declineFriendRequest",
      component: (
        <Button
          sx={{
            padding: 0,
            textTransform: "lowercase",
          }}
          size="small"
          startIcon={<PersonAddIcon fontSize="small" />}
          onClick={() => dispatch(declineFriendRequest(gamer.user.intraId))}
        >
          Decline friend request
        </Button>
      ),
      constraint: {
        friendRequest: true,
      },
    },
    {
      name: "Send message",
      type: "sendMessage",
      component: (
        <Button
          sx={{
            padding: 0,
            textTransform: "lowercase",
          }}
          size="small"
          startIcon={<Message fontSize="small" />}
          onClick={() => setOpen(true)}
        >
          message
        </Button>
      ),
    },
    {
      name: "Invite to a game",
      type: "play",
      component: (
        <Button
          sx={{
            padding: 0,
            textTransform: "lowercase",
          }}
          size="small"
          startIcon={<PersonAddIcon fontSize="small" />}
          onClick={() => console.log("invite to game")}
        >
          Invite to Game
        </Button>
      ),
      constraint: {
        isFriend: true,
      },
    },
    {
      name: "Block",
      type: "blockFriend",
      component: (
        <Button
          sx={{
            padding: 0,
            textTransform: "lowercase",
          }}
          size="small"
          startIcon={<PersonAddIcon fontSize="small" />}
          onClick={() => dispatch(blockUser({ blockedId: gamer.user.intraId }))}
        >
          Block
        </Button>
      ),
      constraint: {
        isFriend: true,
      },
    },
  ];
  useEffect(() => {
    dispatch(getUserFriends());
  }, []);
  return (
    <Usercard>
      <ModalComponent
        open={open}
        ChildComponent={
          <NewDirectMessage
            handleClose={() => setOpen(false)}
            selectedUser={gamer.user}
          />
        }
        handleClose={() => setOpen(false)}
        closeType={"auto"}
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
                      checkConstraints(action, gamer.user.intraId) &&
                      action.component
                    );
                  })}
                  {/* <Button
                    sx={{
                      padding: 0,
                      textTransform: "lowercase",
                    }}
                    size="small"
                    startIcon={<PersonAddIcon fontSize="small" />}
                    onClick={() => handleClick(gamer.user)}
                  >
                    Send friend request
                  </Button>
                  <Button
                    sx={{
                      padding: 0,
                      textTransform: "lowercase",
                    }}
                    size="small"
                    startIcon={<Message fontSize="small" />}
                    onClick={() => setOpen(true)}
                  >
                    message
                  </Button> */}
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
