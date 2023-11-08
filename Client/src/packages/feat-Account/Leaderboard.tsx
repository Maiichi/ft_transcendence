import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Chat, PersonAdd, SportsCricket } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../core";
import { getLeaderboard, leaderboardType } from "./components";
import style, {
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
import images from "./images_uploads";
import { Loading } from "./components";

function sendGameRequist(userName: string) {}
function sendFriendRequist(userName: string) {}

const Leaderboard = ({ primary = true }: { primary?: boolean }) => {
  const navigate = useNavigate();
  const state = useAppSelector((state) => state.profile.lead);
  const leaderboard: leaderboardType[] = state.leaderboard;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLeaderboard());
  }, []);

  return (
    <Root>
      {primary && <Title> Leaderboard </Title>}
      {state.isLoading ? (
        <Loading />
      ) : leaderboard?.length ? (
        <Players>
          {leaderboard.map(
            (player, index) =>
              (!primary && index >= 3) || (
                <Player>
                  <ListItemAvatar>
                    <Avatar src={images[player.picture]}>{index + 1}</Avatar>
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
                  )}
                </Player>
              )
          )}
        </Players>
      ) : (
        <NoPlayer>
          <div style={style.noplay}>
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

// export default Leaderboard
export { Leaderboard };
