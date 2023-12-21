import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../core";
import {
  Alert,
  Avatar,
  Backdrop,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Step,
  StepButton,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { updateUserName, uploadAvatar } from "./authThunk";
import { useSize } from "../../../core/utils/hooks";
import { CardAvatar, Title } from "../../feat-Account/components";
import { CheckCircle, CloudUpload } from "@mui/icons-material";
import {
  ALLOWED_FILE_TYPES,
  MAX_IMAGE_SIZE,
  VisuallyHiddenInput,
} from "../../feat-Account/Settings";
import { setFirstLogin } from "./authSlice";

const FirstLogin = () => {
  const { firstLogin: isfirstLogin } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isMobile } = useSize();
  const auth = useAppSelector((state) => state.auth);
  const [textInput, setTextInput] = useState(auth.user.userName);
  const [inputError, setInputError] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileInfos, setFileInfos] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [open, setOpen] = useState(true);
  const [start, letStart] = useState(false);

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
      handleNext();
    } else {
      setImageError("Error uploading the file, please retry.");
    }
  };

  /*(((((((((())))))))))/ */
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  /*(((((((((())))))))))/ */
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
      dispatch(
        updateUserName({
          // isFirstTime: true,
          token: auth.token,
          id: auth.user.intraId,
          newUsername: textInput,
          user: null,
        })
      );
      handleNext();
    } else {
      setInputError("Invalid characters in username.");
    }
  };
  const handelFinish = () => {
    setOpen(true);
    dispatch(
      updateUserName({
        isFirstTime: true,
        token: auth.token,
        id: auth.user.intraId,
        newUsername: textInput,
        user: null,
      })
    );
    // navigate("/");
  };
  const steps = [
    {
      label: "Submit your username",
      Content: (
        <Stack direction="column" spacing={2}>
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
            sx={{ width: "30%" }}
            color="primary"
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
              sx={{ width: "80px", height: "80px" }}
              alt={auth.user.userName}
              src={selectedImage || `${auth.user.avatar_url}`}
            />
            <Title style={{ fontSize: "1rem" }}>{auth.user.userName}</Title>
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
            {selectedImage ? (
              <Button
                color="success"
                component="label"
                variant="contained"
                startIcon={<CheckCircle />}
                onClick={handleUpload}
              >
                Confirm upload
              </Button>
            ) : (
              <Button
                component="label"
                variant="contained"
                startIcon={selectedImage ? <CheckCircle /> : <CloudUpload />}
              >
                Upload picture
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
            )}
          </CardAvatar>
        </>
      ),
    },
    {
      label: "finish",
      Content: <></>,
    },
  ];
  useEffect(() => {
    !isfirstLogin && navigate("/");
    letStart(true);
    setOpen(false);
  }, [isfirstLogin]);

  return (
    <>
      {start && (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          minWidth="100%"
          minHeight="100%"
        >
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            sx={isMobile ? {} : { maxWidth: "70%", minWidth: "70%" }}
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === 2 ? (
                      <Typography variant="caption">Last step</Typography>
                    ) : null
                  }
                >
                  <Typography variant="h6" component="div">
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
                          onClick={handelFinish}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {"Finish"}
                        </Button>
                      )}
                      {index === 0 || (
                        <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
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
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      ></Backdrop>
    </>
  );
};

export default FirstLogin;
