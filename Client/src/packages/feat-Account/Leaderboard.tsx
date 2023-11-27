import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Chat } from "@mui/icons-material";
import { Loading, useAppDispatch, useAppSelector } from "../../core";
import {
  ListButton,
  SendFriendRequist,
  SendGameRequist,
  getLeaderboard,
  leaderboardType,
} from "./components";
import {
  Players,
  Player,
  NoPlayer,
  Avatar,
  Button,
  ListItemText,
  ListItemAvatar,
  /***global**/
  Title,
  Root,
} from "./styles";
import { useSize } from "../../core/utils/hooks";

const Leaderboard = ({ primary = true }: { primary?: boolean }) => {
  const navigate = useNavigate();
  const { isTab, isMobile } = useSize();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.profile.lead);
  const leaderboard: leaderboardType = state.leaderboard;
  const Oid: number = useAppSelector((state) => state.auth.user.intraId);

  useEffect(() => {
    primary && dispatch(getLeaderboard());
  }, []);

  return (
    <Root>
      {primary && <Title> Leaderboard </Title>}
      {state.isLoading ? (
        <Loading />
      ) : leaderboard && leaderboard.length ? (
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
                    secondary={`Matchs ${isTab ? "" : "played"}`}
                  />
                  <ListItemText primary={player.ladder} secondary={`Ladder`} />
                  {isMobile || (
                    <ListItemText primary={player.wins} secondary={`Wins`} />
                  )}
                  {primary && !isTab && (
                    <ListItemText primary={player.loss} secondary={`Losses`} />
                  )}
                  {primary &&
                    (Oid !== player.uid ? (
                      <ListButton isTab={isTab || isMobile}>
                        <SendGameRequist userName={player.name} />
                        <Button onClick={() => navigate("/chat")}>
                          <Chat />
                        </Button>
                        <SendFriendRequist onlyIcon userName={player.name} />
                      </ListButton>
                    ) : (
                      <Button onClick={() => navigate("/account/profile")}>
                        {isTab || isMobile ? "You" : "Go to your Profile"}
                      </Button>
                    ))}
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
