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
  Rotate,
  Button,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  /***global**/
  Title,
  Root,
} from "./styles";
import { Pic } from "./static-data";
import { Loading } from "./components";

function sendGameRequist(userName: string) {}
function sendFriendRequist(userName: string) {}

const Leaderboard = () => {
  const navigate = useNavigate();
  const state = useAppSelector((state) => state.profile.lead);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLeaderboard());
  }, [state.leaderboard]);

  return (
    <Root $primary={true}>
      <Title> Leaderboard </Title>
      {state.isLoading ? (
        <Loading />
      ) : state.leaderboard ? (
        <Players>
          {state.leaderboard.map((player: leaderboardType, index: number) => (
            <Player>
              <ListItemAvatar>
                <Avatar src={Pic}>{index + 1}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={player.name}
                secondary={`Rank: ${index + 1}`}
              />
              <ListItemText primary={player.ladder} secondary={`Ladder`} />
              <ListItemText primary={player.wins} secondary={`Wins`} />
              <ListItemText primary={player.loss} secondary={`Losses`} />
              <ListItemIcon>
                <Button onClick={() => sendGameRequist(player.name)}>
                  <SportsCricket />
                </Button>
                <Button onClick={() => navigate("/chat")}>
                  <Chat />
                </Button>
                <Button onClick={() => sendFriendRequist(player.name)}>
                  <PersonAdd />
                </Button>
              </ListItemIcon>
            </Player>
          ))}
        </Players>
      ) : (
        <NoPlayer>
          <h3>
            {" "}
            No Player is registred in <br /> the leaderboard
            <br />
            <br /> <span>Play</span> and you'll here!
          </h3>
          <Rotate>
            <Button variant="contained" onClick={() => navigate("/game")}>
              {" "}
              P l a y{" "}
            </Button>
          </Rotate>
        </NoPlayer>
      )}
    </Root>
  );
};

// export default Leaderboard
export { Leaderboard };
