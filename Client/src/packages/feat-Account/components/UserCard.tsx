import { useNavigate } from "react-router-dom";
import { Message, PersonAddAlt } from "@mui/icons-material";
import { Button, Grow, Text, Usercard, Avatar } from "../styles";
import { gamerType } from "./statsType";
import CircularProgressBar from "./utils/CircularProgressBar";
import LinearDeterminate from "./utils/linearProgressBar";
import { Badge, Stack } from "@mui/material";

const UserCard = (props: { gamer: gamerType; isOwner: boolean }) => {
  const { gamer, isOwner } = props;
  const navigate = useNavigate();
  return (
    <Usercard>
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
                src={`/${gamer.user.avatar_url}`}
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
              {isOwner ? (
                <span>
                  ------------------
                  <br />
                  ------------------
                </span>
              ) : (
                <>
                  <Button
                    sx={{
                      padding: "0",
                      textTransform: "lowercase",
                    }}
                    size="small"
                    startIcon={<PersonAddAlt fontSize="small" />}
                    onClick={() => navigate("/account/profile")}
                  >
                    friend requist
                  </Button>
                  <Button
                    sx={{
                      padding: "0",
                      textTransform: "lowercase",
                    }}
                    size="small"
                    startIcon={<Message fontSize="small" />}
                    onClick={() => navigate("/account/profile")}
                  >
                    message
                  </Button>
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
