import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Chat, PersonAdd, SportsCricket } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../core";
import { getLeaderboard, leaderboardType } from "./components";
import {
  Players,
  Player,
  NoPlayer,
  Avatar,
  Button,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  /***global**/
  Title,
  Root,
} from "./styles";
import { Loading } from "./components";

function sendGameRequist(userName: string) {}
function sendFriendRequist(userName: string) {}

const Leaderboard = ({ primary = true }: { primary?: boolean }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.profile.lead);
  const leaderboard: leaderboardType = state.leaderboard;

  useEffect(() => {
    (primary) && dispatch(getLeaderboard());
  }, []);
  const Oid: number = useAppSelector((state) => state.auth.user.intraId);

  return (
    <Root>
      {primary && <Title> Leaderboard </Title>}
      {state.isLoading || !leaderboard ? (
        <Loading />
      ) : leaderboard.length ? (
        <Players>
          {leaderboard.map(
            (player, index) =>
              (!primary && index >= 3) || (
                <Player>
                  <ListItemAvatar>
                    <Avatar src={`/images/${player.picture}`}>
                      {index + 1}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={player.name}
                    secondary={`Rank: ${index + 1}`}
                  />
                  <ListItemText
                    primary={player.loss + player.wins}
                    secondary={`Match played`}
                  />
                  <ListItemText primary={player.ladder} secondary={`Ladder`} />
                  <ListItemText primary={player.wins} secondary={`Wins`} />
                  {primary && (
                    <ListItemText primary={player.loss} secondary={`Losses`} />
                  )}
                  {primary && (
                    <>
                      {Oid !== player.uid ? (
                        <ListItemIcon>
                          <Button onClick={() => sendGameRequist(player.name)}>
                            <SportsCricket />
                          </Button>
                          <Button onClick={() => navigate("/chat")}>
                            <Chat />
                          </Button>
                          <Button
                            onClick={() => sendFriendRequist(player.name)}
                          >
                            <PersonAdd />
                          </Button>
                        </ListItemIcon>
                      ) : (
                        <Button onClick={() => navigate("/account/profile")}>
                          Go to your Profile
                        </Button>
                      )}
                    </>
                  )}
                </Player>
              )
          )}
        </Players>
      ) : (
        <NoPlayer>
          <div
            style={{
              paddingBottom: "20px",
              marginBottom: "10px",
              minWidth: "70%",
              boxShadow: "1px 1px 0 4px #ccc",
              backgroundColor: "#eee",
              textAlign: "center",
            }}
          >
            <h3>
              No Player is registred in <br /> the leaderboard
              <br />
              <br /> <span>Play</span> and you'll here!
            </h3>
          </div>
          {primary && (
            <Button variant="contained" onClick={() => navigate("/game")}>
              P l a y
            </Button>
          )}
        </NoPlayer>
      )}
    </Root>
  );
};

export { Leaderboard };
