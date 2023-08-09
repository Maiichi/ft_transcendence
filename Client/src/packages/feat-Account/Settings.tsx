import { Avatar, FormControlLabel, Switch, TextField } from "@mui/material";
import BalanceIcon from "@mui/icons-material/Balance";
import { useState } from "react";
import styled from "styled-components";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
  const [twoFact, setTwoFact] = useState<boolean>(false);
  return (
    <Root>
      <Cards>
        <LeftCard>
          <CardAvatar>
            <Avatar
              sx={{ width: "50px", height: "50px" }}
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
            <Title style={{ fontSize: "1rem" }}>Ibouroum</Title>
            <H5>Total matches : 60</H5>
            <H5>Wins : 10</H5>
            <H5>Losses : 50</H5>
            <H5>Ladder level: 10</H5>
            <H5>Achievement</H5>
            <CircularProgressWithLabel value={60} />
            <BalanceIcon />
          </CardAvatar>
          <CardAvatar></CardAvatar>
        </LeftCard>
        <RightCard>
          {/* <Title style={{ fontSize: "1rem" }}>Profile</Title> */}
          {/* <H5>The informations can be edited</H5> */}
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
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 426px) {
    width: 75%;
  }
`;
const CardAvatar = styled.div`
  height: fit-content;
  margin-right: 5px;
  margin-top: 10px
  padding: 32px 24px 6px 32px;
  background-color: rgb(255, 255, 255);
  color: rgb(17, 25, 39);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
  border-radius: 20px;
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 426px) {
   
  }
`;
const RightCard = styled.div`
  margin-left: 5px;
  width: 60%;
  background-color: rgb(255, 255, 255);
  color: rgb(17, 25, 39);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 32px 24px 10px 32px;
  @media (max-width: 426px) {
    margin: 5px 0px;
    width: 75%;
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
const Divider = styled.hr`
  margin-top: 15px;
  width: -webkit-fill-available;

  border-width: 0px 0px thin;
  border-style: solid;
  border-color: rgb(242, 244, 247);
`;
