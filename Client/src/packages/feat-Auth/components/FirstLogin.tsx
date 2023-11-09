import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../core";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { updateUserName } from "./authThunk";

const FirstLogin = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const auth = useAppSelector((state) => state.auth);
    const [textInput, setTextInput] = useState(auth.user.userName);
    const [inputError, setInputError] = useState("");

    // Check if the input contains only alphanumeric characters
    const isValid = (value: string) => /^[a-zA-Z0-9]*$/.test(value);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        setTextInput(inputValue);
        !isValid(inputValue)
            ? setInputError("Invalid characters in username.")
            : setInputError("");
    };

    const handleSubmit = () => {
        if (isValid(textInput)) {
            dispatch(
                updateUserName({
                    isFirstTime: true,
                    token: auth.token,
                    id: auth.user.intraId,
                    newUsername: textInput,
                    user: null,
                })
            );
            navigate("/");
        } else {
            setInputError("Invalid characters in username.");
        }
    };

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            minHeight="100vh"
        >
            <Typography variant="h4" component="div">
                {"Submit your username"}
            </Typography>
            <TextField
                error={!!inputError}
                value={textInput}
                variant="standard"
                placeholder="Username"
                onChange={handleInputChange}
                helperText={inputError}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!textInput || !!inputError}
            >
                Submit
            </Button>
        </Stack>
    );
};

export default FirstLogin;
