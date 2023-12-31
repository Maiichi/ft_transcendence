import { useAsyncError, useNavigate } from "react-router-dom";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { Chat } from "@mui/icons-material";
import { Loading, useAppDispatch, useAppSelector } from "../../../core";
import {
  ListButton,
  SendGameRequist,
  getLeaderboard,
  leaderboardType,
} from ".";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
} from "../styles";
import { useSize } from "../../../core/utils/hooks";
import { IconButton } from "@mui/material";

const Leaderboard = ({ primary = true }: { primary?: boolean }) => {
  const navigate = useNavigate();
  const { isTab, isMobile } = useSize();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.profile.lead);
  const leaderboard: leaderboardType = state.leaderboard;
  const Oid: number = useAppSelector((state) => state.auth.user.intraId);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [firstEffect, effected] = useState(false);

  const handleClickOpen = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };
  useEffect(() => {
    primary && dispatch(getLeaderboard());
    effected(true);
  }, []);

  return (
    <Root>
      {primary && <Title> Leaderboard </Title>}
      {state.isLoading || !firstEffect ? (
        <Loading />
      ) : leaderboard && leaderboard.length ? (
        <Players primary={primary}>
          {leaderboard.map(
            (player, index) =>
              (!primary && index >= 3) || (
                <Player>
                  <ListItemAvatar
                    onClick={() =>
                      navigate(`/account/profile/${player.userId}`)
                    }
                  >
                    <Avatar src={player.avatar_url}>{index + 1}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={player.name.slice(0, 8)}
                    secondary={`Rank: ${index + 1}`}
                  />
                  <ListItemText
                    primary={player.losses + player.wins}
                    secondary={`Matchs ${isTab ? "" : "played"}`}
                  />
                  <ListItemText
                    primary={player.winRate}
                    secondary={`WinRate`}
                  />
                  {isMobile || (
                    <ListItemText primary={player.wins} secondary={`Wins`} />
                  )}
                  {primary && !isTab && (
                    <ListItemText
                      primary={player.losses}
                      secondary={`Losses`}
                    />
                  )}
                  {primary && (
                    <IconButton
                    size="large"
                    color="secondary"
                      onClick={() =>
                        navigate(`/account/profile/${player.userId}`)
                      }
                    ><AccountCircleIcon/></IconButton>
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
            <Button variant="contained" onClick={() => navigate("/")}>
              P l a y
            </Button>
          )}
        </NoPlayer>
      )}
    </Root>
  );
};

export { Leaderboard };
