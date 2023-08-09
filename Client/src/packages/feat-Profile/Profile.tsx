import { Avatar, FormControlLabel, Switch, TextField } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

export const Profile = () => {
  const [twoFact, setTwoFact] = useState<boolean>(false);
  return (
    <Root>
      <Title style={{ fontSize: "2rem" }}>Account</Title>
      <Cards>
        <CardAvatar>
          <Avatar
            sx={{ width: "80px", height: "80px" }}
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
          />
          <Title style={{ fontSize: "1rem" }}>Bouroummana Ismail</Title>
          <H5>ibouroum</H5>
          <Divider />
          <ButtonAvatar>Upload Picture</ButtonAvatar>
        </CardAvatar>
        <CardForm>
          <Title style={{ fontSize: "1rem" }}>Profile</Title>
          <H5>The informations can be edited</H5>
          <TextField
            sx={{ margin: "10px 0px", width: "80%" }}
            required
            id="firstname"
            label="Firstname"
            variant="outlined"
            defaultValue="Ismail"
          />
          <TextField
            sx={{ margin: "10px 0px", width: "80%" }}
            required
            id="lastname"
            label="Lastname"
            variant="outlined"
            defaultValue="Bouroummana"
          />
          <TextField
            sx={{ margin: "10px 0px", width: "80%" }}
            required
            id="username"
            label="Username"
            variant="outlined"
            defaultValue="ibouroum"
          />
          <FormControlLabel
            control={
              <Switch
                checked={twoFact}
                onChange={() => setTwoFact(!twoFact)}
                name="2FA"
              />
            }
            label="Two Factor Authentication"
          />
          <TextField
            sx={{ margin: "10px 0px", width: "80%" }}
            required
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            defaultValue="+212689912489"
          />
          <Divider />
          <ButtonForm>Save Details</ButtonForm>
        </CardForm>
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
const CardAvatar = styled.div`
  width: 35%;
  height: fit-content;
  margin-right: 5px;
  padding: 32px 24px 6px 32px;
  background-color: rgb(255, 255, 255);
  color: rgb(17, 25, 39);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
  border-radius: 20px;
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 426px) {
    margin: 5px 0px;
    width: 75%;
  }
`;
const CardForm = styled.div`
  width: 65%;
  margin-left: 5px;

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
