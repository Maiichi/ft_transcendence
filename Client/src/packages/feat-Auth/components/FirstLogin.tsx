import { useAppDispatch, useAppSelector } from "../../../core";
import {
  Alert,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Stack,
  Step,
  StepContent,
  StepIcon,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { updateUserName, uploadAvatar } from "./authThunk";
import { useSize } from "../../../core/utils/hooks";
import { CardAvatar } from "../../feat-Account/components";
import { DoneOutline, CloudUpload, Logout } from "@mui/icons-material";
import {
  ALLOWED_FILE_TYPES,
  MAX_IMAGE_SIZE,
  VisuallyHiddenInput,
} from "../../feat-Account/Settings";
import { deepPurple, purple } from "@mui/material/colors";
import { userLogout } from "./authSlice";

const FirstLogin = () => {
  const { firstLogin: isfirstLogin } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { isMobile } = useSize();
  const auth = useAppSelector((state) => state.auth);
  const [textInput, setTextInput] = useState(auth.user.userName);
  const [inputError, setInputError] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileInfos, setFileInfos] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageError(null);
    const fileInput = event.target;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      if (file) {
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
          setImageError("Invalid file type. Please select a valid image file.");
          event.target.value = "";
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && typeof e.target.result === "string") {
            if (file.size > MAX_IMAGE_SIZE) {
              setImageError("Image size exceeds the allowed limit.");
              event.target.value = "";
            } else {
              setFileInfos(file);
              setSelectedImage(e.target.result);
            }
          }
        };
        reader.onerror = (e) => {
          setImageError("Error reading the file.");
          console.log("Error reading the file:", e?.target?.error);
        };
        reader.onabort = (e) => {
          setImageError("Error reading the file.");
          console.warn("File reading aborted:", e);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      const imageBlob = new Blob([selectedImage], {
        type: fileInfos?.type,
      });
      const formData = new FormData();
      formData.append("file", imageBlob, fileInfos?.name);
      dispatch(
        uploadAvatar({
          id: auth.user.intraId,
          token: auth.token,
          formData: formData,
          picture: "",
        })
      ).then(() => {
        setSelectedImage(null);
      });
    }
    handleNext();
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isValid = (value: string) => /^[a-zA-Z0-9]*$/.test(value);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setTextInput(inputValue);
    !isValid(inputValue)
      ? setInputError("Invalid characters in username.")
      : setInputError("");
  };

  const handleSubmit = () => {
    if (isValid(textInput)) {
      handleNext();
    } else {
      setInputError("Invalid characters in username.");
    }
  };
  const handelFinish = () => {
    dispatch(
      updateUserName({
        isFirstTime: true,
        token: auth.token,
        id: auth.user.intraId,
        newUsername: textInput,
        user: null,
      })
    );
    setTimeout(() => {
      if (isfirstLogin) {
        setInputError("userName reserved!");
        setActiveStep(0);
      }
    }, 100);
  };
  const handelLogout = () => {
    dispatch(userLogout());
  };
  const steps = [
    {
      label: "Submit your username",
      Content: (
        <Stack direction="column" spacing={2}>
          <TextField
            error={!!inputError}
            value={textInput}
            color="secondary"
            variant="standard"
            placeholder="Username"
            onChange={handleInputChange}
            helperText={inputError}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "30%" }}
            color="secondary"
            onClick={handleSubmit}
            disabled={!textInput || !!inputError}
          >
            Submit
          </Button>
        </Stack>
      ),
    },
    {
      label: "Upload picture",
      Content: (
        <>
          <CardAvatar firstLogin>
            <Avatar
              sx={{
                width: "80px",
                height: "80px",
                backgroundColor: purple[200],
              }}
              alt={auth.user.userName}
              src={selectedImage || `${auth.user.avatar_url}`}
            >
              User
            </Avatar>
            <Divider />
            {imageError && (
              <Alert
                severity="error"
                onClose={() => {
                  setImageError(null);
                }}
              >
                {imageError}
              </Alert>
            )}
            <ButtonGroup
              color="secondary"
              variant="text"
              aria-label="outlined primary button group"
            >
              <Button component="label" startIcon={<CloudUpload />}>
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              <Button startIcon={<DoneOutline />} onClick={handleUpload} />
            </ButtonGroup>
          </CardAvatar>
        </>
      ),
    },
    {
      label: "finish",
      Content: <></>,
    },
  ];

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex" || "none",
          justifyContent: "flex-end",
        }}
      >
        <Button
          sx={{ mr: 2, mt: 1 }}
          color="secondary"
          size="large"
          id="logout"
          endIcon={<Logout fontSize="large" />}
          onClick={handelLogout}
        >
          <Typography>Logout</Typography>
        </Button>
      </div>

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        minHeight="80%"
      >
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={isMobile ? {} : { maxWidth: "70%", minWidth: "70%" }}
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={CustomStepIcon}
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                <Typography
                  color={deepPurple[400]}
                  variant="h6"
                  component="div"
                >
                  {step.label}
                </Typography>
              </StepLabel>
              <StepContent>
                {step.Content}
                <Box sx={{ mb: 2 }}>
                  <div>
                    {index === steps.length - 1 && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handelFinish}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {"Finish"}
                      </Button>
                    )}
                    {index === 0 || (
                      <Button
                        color="secondary"
                        sx={{ color: deepPurple[700], mt: 1, mr: 1 }}
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                    )}
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Stack>
    </>
  );
};

function CustomStepIcon(props: { icon?: any; active?: any; completed?: any }) {
  const { active, completed } = props;

  return (
    <StepIcon
      style={{
        color: active ? purple[500] : completed ? purple[900] : purple[200],
      }}
      icon={completed ? "✔" : props.icon}
    />
  );
}

export default FirstLogin;
