import { Avatar, FormControlLabel, Switch, TextField } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import {
    Title,
    Cards,
    CardAvatar,
    H5,
    Divider,
    ButtonAvatar,
    CardForm,
    ButtonForm,
} from "./components";
import TwoFactorSetup from "../feat-Auth/components/TwoFactorSetup";
import { useAppSelector } from "../../core";

export const Profile = () => {
    const [twoFact, setTwoFact] = useState<boolean>(false);
    const auth = useAppSelector((state) => state.auth);
    return (
        <Root>
            <Title style={{ fontSize: "2rem" }}>Account Profile</Title>
            <Cards>
                <CardAvatar>
                    <Avatar
                        sx={{ width: "80px", height: "80px" }}
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                    />
                    <Title style={{ fontSize: "1rem" }}>
                        Bouroummana Ismail
                    </Title>
                    <H5>ibouroum</H5>
                    <Divider />
                    <ButtonAvatar>Upload Picture</ButtonAvatar>
                </CardAvatar>
                <CardForm>
                    <Title style={{ fontSize: "1rem" }}>Profile</Title>
                    <H5>The informations can be edited</H5>
                    {/* <TextField
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
          /> */}
                    <TextField
                        sx={{ margin: "10px 0px", width: "80%" }}
                        required
                        id="username"
                        label="Username"
                        variant="outlined"
                        defaultValue={auth.user.userName}
                    />
                    <TwoFactorSetup
                        twoFactorActivate={auth.user.twoFactorActivate}
                    />
                    {/* <TextField
            sx={{ margin: "10px 0px", width: "80%" }}
            required
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            defaultValue="+212689912489"
          /> */}
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
