import {
  Avatar,
  FormControlLabel,
  LinearProgress,
  LinearProgressProps,
  Switch,
  TextField,
} from "@mui/material";
import BalanceIcon from "@mui/icons-material/Balance";
import { useState } from "react";
import styled from "styled-components";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Logo from "./federation.png";
import Picture from "./Picture.png";
import VerifiedIcon from "@mui/icons-material/Verified";
import PendingIcon from "@mui/icons-material/Pending";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
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
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
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
}
export const Settings = () => {
  const progress = 60;
  const [twoFact, setTwoFact] = useState<boolean>(false);
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
          <Achievement>
            <Title>Achievements</Title>

            {[1, 2, 3, 4, 5].map((item) => (
              <div
                style={{
                  display: "flex",
                  background: "#f0fff0",
                  margin: "10px",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <img
                  style={{ width: "35px", height: "55px" }}
                  alt="Remy Sharp"
                  src={Logo}
                />
                <div style={{ textAlign: "start" }}>
                  <Title>Hero</Title>
                  <H5>Must win 10 games </H5>
                  <LinearProgressWithLabel value={progress} />
                </div>
                {item < 3 ? (
                  <VerifiedIcon color="success" />
                ) : (
                  <PendingIcon color="disabled" />
                )}
              </div>
            ))}
          </Achievement>
        </LeftCard>
        <RightCard>
          <TopPlayers>
            <Title>Top 5 Players</Title>
            {/* <Player>
              <></>
              <></>
              <Title>Ladder</Title>
              <Title>Wins</Title>
              <Title>Losses</Title>
              <Title>Achivement</Title>
            </Player> */}
            {[1, 2, 3, 4, 5].map((item) => (
              <Player>
                <img
                  style={{ width: "30px", height: "45px", margin: "5px" }}
                  alt="Remy Sharp"
                  src={Logo}
                />
                <H5># {item}</H5>
                <img
                  style={{ width: "30px", height: "30px" }}
                  alt="Remy Sharp"
                  src={Picture}
                />
                <Title>IZail</Title>
                <div style={{ display: "flex", gap: "20px" }}>
                  <div style={{}}>
                    <Title>5 </Title>
                    <H5>Ladder </H5>
                  </div>
                  <div style={{}}>
                    <Title>50 </Title>
                    <H5>Wins </H5>
                  </div>
                  <div style={{}}>
                    <Title>10 </Title>
                    <H5>Losses </H5>
                  </div>
                </div>

                <MoreVertIcon />
              </Player>
            ))}
          </TopPlayers>
          <MatchHistory>My Last 5 Matches </MatchHistory>
        </RightCard>
      </Cards>
    </Root>
  );
};
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
gap: 40px

}

  @media (max-width: 426px) {
   
  }
`;

const Achievement = styled.div`
margin-right: 5px;
background-color: rgb(255, 255, 255);
color: rgb(17, 25, 39);
box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
border-radius: 20px;
-webkit-box-align: center;
align-items: center;
text-align: center;

padding: 10px;
gap: 40px

}

  @media (max-width: 426px) {
   
  }
`;

const Title = styled.h4`
  margin: 0px;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 700;
  margin-top: 16px;
  margin-bottom: 5px;
  line-height: 1.2;
`;

const ButtonAvatar = styled.button`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  outline: 0px;
  border: 0px;
  margin: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  font-weight: 600;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 0.875rem;
  line-height: 1.75;
  min-width: 64px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  color: rgb(99, 102, 241);
  width: 100%;
  border-radius: 12px;
  text-transform: none;
  padding: 9px 16px;
  &:hover {
    text-decoration: none;
    background-color: rgba(99, 102, 241, 0.04);
  }
`;
const ButtonForm = styled.button`
  border: 0px;
  margin: 0px;
  font-weight: 600;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 0.875rem;
  line-height: 1.75;
  color: rgb(255, 255, 255);
  background-color: rgb(99, 102, 241);
  border-radius: 12px;
  padding: 8px 20px;
  width: fit-content;
  margin-left: auto;
  &:hover {
    text-decoration: none;
    background-color: rgb(67, 56, 202);
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 10px;
  }
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


}

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
align-items: center;
text-align: center;
display: flex;
padding: 10px;
gap: 40px

}

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
