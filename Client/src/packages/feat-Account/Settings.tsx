import { LinearProgress, LinearProgressProps } from "@mui/material";

import styled from "styled-components";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Logo from "./federation.png";
import Logo1 from "./Logo2.png";
import Logo2 from "./Logo1.png";
import Logo3 from "./Logo4.png";
import Picture from "./Picture.png";
import Pic from "./Pic.png";
import Women from "./Women.png";
import VerifiedIcon from "@mui/icons-material/Verified";
import PendingIcon from "@mui/icons-material/Pending";

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
const AchievementsArr = [
  {
    name: "Hero",
    Description: "Must play 10 games",
    progress: 100,
    isValid: true,
    logo: Logo,
  },
  {
    name: "Athlete",
    Description: "Must win 10 games",
    progress: 100,
    isValid: true,
    logo: Logo1,
  },
  {
    name: "Diamond",
    Description: "Must win 100 games",
    progress: 40,
    isValid: false,
    logo: Logo2,
  },
  {
    name: "Bronze",
    Description: "Must play 500 games",
    progress: 10,
    isValid: false,
    logo: Logo3,
  },
];
const Histories = [
  {
    user: {
      name: "izajhk",
      picture: Pic,
    },
    score: [13333333, 4],
  },
  {
    user: {
      name: "di",
      picture: Pic,
    },
    score: [2, 4],
  },
  {
    user: {
      name: "johytuytuytuytutyutyn",
      picture: Pic,
    },
    score: [6, 4],
  },
  {
    user: {
      name: "mbvfbfbark",
      picture: Women,
    },
    score: [1, 2],
  },
  {
    user: {
      name: "sara",
      picture: Women,
    },
    score: [4, 4],
  },
];
const TopPlayersArr = [
  {
    name: "Lionnel",
    ladder: 100,
    wins: 50,
    loss: 10,
    achievement: Logo2,
    picture: Women,
  },
  {
    name: "mark",
    ladder: 90,
    wins: 40,
    loss: 15,
    achievement: Logo1,
    picture: Picture,
  },
  {
    name: "john",
    ladder: 75,
    wins: 50,
    loss: 40,
    achievement: Logo3,
    picture: Pic,
  },
];
export const Settings = () => {
  return (
    <Root>
      <Cards>
        <LeftCard>
          <CardAvatar>
            <div style={{}}>
              <H5>The federation</H5>
              <img alt="Remy Sharp" src={Logo} />
              <H5>#155</H5>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "40px" }}
            >
              <div
                style={{ display: "flex", gap: "20px", alignItems: "center" }}
              >
                <img
                  style={{ width: "80px", height: "80px" }}
                  alt="Remy Sharp"
                  src={Picture}
                />
                <Title style={{ fontSize: "1rem" }}>Ibouroum</Title>
                <CircularProgressWithLabel value={60} />
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
          </CardAvatar>
          <Achievements>
            <Title>Achievements</Title>

            {AchievementsArr.map((item) => (
              <Achievement
                color={
                  item.isValid == true ? "#f0fff0" : "rgba(156, 163, 175, 0.1)"
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
                  alt="Remy Sharp"
                  src={item.achievement}
                />
                <H5># {index + 1}</H5>
                <img
                  style={{ width: "30px", height: "30px" }}
                  alt="Remy Sharp"
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
          </TopPlayers>
          <MatchHistory>
            <Title>My Last 5 Matches </Title>
            {Histories.map((item) => (
              <Score
                color={
                  item.score[0] - item.score[1] == 0
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
                    src={Picture}
                  />
                  <H5>ibouroum </H5>
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
};
const Score = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: ${(p) => p.color} 0px 0px 8px 0px;
  margin: 10px;
  border-radius: 8px;
`;
const Root = styled.div`
  padding: 10px;
`;
const Cards = styled.div`
  display: flex;
  @media (max-width: 426px) {
    align-items: center;
    flex-direction: column;
  }
`;
const LeftCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 426px) {
  }
`;
const RightCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 426px) {
  }
`;
const CardAvatar = styled.div`
  margin-right: 5px;
  background-color: rgb(255, 255, 255);
  color: rgb(17, 25, 39);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
  border-radius: 20px;
  -webkit-box-align: center;
  align-items: center;
  text-align: center;
  display: flex;
  padding: 10px;
  gap: 40px;
  @media (max-width: 426px) {
  }
`;

const Achievements = styled.div`
  margin-right: 5px;
  background-color: rgb(255, 255, 255);
  color: rgb(17, 25, 39);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
  border-radius: 20px;
  -webkit-box-align: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  gap: 40px @media (max-width: 426px) {

  }
`;

const Achievement = styled.div`
  display: flex;
  background: ${(p) => p.color};
  margin: 10px;
  justify-content: space-around;
  align-items: center;
`;

const Title = styled.h4`
  margin: 0px;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 700;
  margin-top: 16px;
  margin-bottom: 5px;
  line-height: 1.2;
`;

const H5 = styled.h4`
  margin: 0px;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.57;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  color: rgb(108, 115, 127);
`;
const TopPlayers = styled.div`
  margin-right: 5px;
  background-color: rgb(255, 255, 255);
  color: rgb(17, 25, 39);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
  border-radius: 20px;
  -webkit-box-align: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  @media (max-width: 426px) {
  }
`;
const MatchHistory = styled.div`
  margin-right: 5px;
  background-color: rgb(255, 255, 255);
  color: rgb(17, 25, 39);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
  border-radius: 20px;
  -webkit-box-align: center;
  padding: 10px;
  text-align: center;
  @media (max-width: 426px) {
  }
`;
const Player = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  text-align: start;
  border-radius: 8.295px;
  gap: 20px;
  margin: 10px;
  justify-content: space-around;
  background: rgba(156, 163, 175, 0.1);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2.07377px 4.14754px 0px;
`;
