import { Button, LinearProgress, LinearProgressProps } from "@mui/material";
import CircularProgress, {
    CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import VerifiedIcon from "@mui/icons-material/Verified";
import PendingIcon from "@mui/icons-material/Pending";

import {
    Achievement,
    Achievements,
    CardAvatar2,
    Cards,
    H5,
    LeftCard,
    MatchHistory,
    Player,
    RightCard,
    Root,
    Score,
    Title,
    TopPlayers,
} from "./../styles";

import { useAppSelector } from '../../../core'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {AchievementsArr, Histories, TopPlayersArr, Logo, Pic} from '../data'

const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number }
) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};
const CircularProgressWithLabel = (
  props: CircularProgressProps & { value: number }
) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

const GeustProfile = () => {
  const navigate = useNavigate()
  let userInfo = useAppSelector((state) => state.auth.user)
  userInfo.avatar_url = Pic


  return (
    <Root>
      <Cards>
        <LeftCard>
          <CardAvatar2>
            <div>
              <H5>The federation</H5>
              <img alt="logo" src={Logo} />
              <H5>#{'xxxx'/** rank */}</H5>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <img
                  style={{ width: "80px", height: "80px" }}
                  alt="Remy Sharp"
                  src={userInfo.avatar_url}
                />
                <Title style={{ fontSize: "1rem" }}>{userInfo.firstName.concat( ' ' + userInfo.lastName)}</Title>
                <CircularProgressWithLabel value={66 % 101} />
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <div style={{}}>
                  <H5>Wins </H5>
                  <Title>50 </Title>
                </div>
                <div style={{}}>
                  <H5>Losses </H5>
                  <Title>10 </Title>
                </div>

                <div style={{}}>
                  <H5>Ladder level </H5>
                  <Title>5 </Title>
                </div>
              </div>
            </div>
          </CardAvatar2>
          <Achievements>
            <Title
              style={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                backgroundColor: "#f0f0f0",
                padding: "10px",
              }}
            >
              Achievements
            </Title>

            {AchievementsArr.map((item) => (
              <Achievement
                color={
                  item.isValid === true ? "#f0fff0" : "rgba(156, 163, 175, 0.1)"
                }
              >
                <img
                  style={{ width: "35px", height: "55px" }}
                  alt="Remy Sharp"
                  src={item.logo}
                />
                <div style={{ textAlign: "start" }}>
                  <Title>{item.name}</Title>
                  <H5>{item.Description} </H5>
                  <LinearProgressWithLabel value={item.progress} />
                </div>
                {item.isValid ? (
                  <VerifiedIcon color="success" />
                ) : (
                  <PendingIcon color="disabled" />
                )}
              </Achievement>
            ))}
          </Achievements>
        </LeftCard>
        <RightCard>
          <TopPlayers>
            <Title>Top 5 Players</Title>

            {TopPlayersArr.map((item, index) => (
              <Player>
                <img
                  style={{ width: "30px", height: "45px", margin: "5px" }}
                  alt={'player: ' + index }
                  src={item.achievement}
                />
                <H5># {index + 1}</H5>
                <img
                  style={{ width: "30px", height: "30px" }}
                  alt={'player: ' + (index + 1) }
                  src={item.picture}
                />
                <Title>{item.name}</Title>
                <div style={{ display: "flex", gap: "20px" }}>
                  <div style={{}}>
                    <Title>{item.ladder} </Title>
                    <H5>Ladder </H5>
                  </div>
                  <div style={{}}>
                    <Title>{item.wins} </Title>
                    <H5>Wins </H5>
                  </div>
                  <div style={{}}>
                    <Title>{item.loss}</Title>
                    <H5>Losses </H5>
                  </div>
                </div>
                <MoreVertIcon />
              </Player>
            ))}

            <Button onClick={() => navigate('/Leaderboard')}>
              See more {'...'}
            </Button>
          </TopPlayers>
          <MatchHistory>
            <Title>My Last 5 Matches </Title>
            {Histories.map((item) => (
              <Score
                color={
                  item.score[0] - item.score[1] === 0
                    ? "rgb(65 128 220)"
                    : item.score[0] - item.score[1] > 0
                    ? "rgb(46 125 50)"
                    : "rgb(231 16 16)"
                }
              >
                <div style={{ flex: "1" }}>
                  <img
                    style={{ width: "30px", height: "45px", margin: "5px" }}
                    alt="Remy Sharp"
                    src={Pic}
                  />
                  <H5>{userInfo.userName}</H5>
                </div>
                <div style={{ flexBasis: "20%" }}>
                  <Title style={{ margin: "0" }}>{item.score[0]} </Title>
                  <H5 style={{ margin: "0" }}>VS</H5>
                  <Title style={{ margin: "0" }}>{item.score[1]} </Title>
                </div>
                <div style={{ flex: "1" }}>
                  <img
                    style={{
                      width: "30px",
                      height: "45px",
                      margin: "5px",
                    }}
                    alt="Remy Sharp"
                    src={item.user.picture}
                  />
                  <H5>{item.user.name}</H5>
                </div>
              </Score>
            ))}
          </MatchHistory>
        </RightCard>
      </Cards>
    </Root>
  );
}
export default GeustProfile
