import { Alert, Avatar, TextField } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import {
  Title,
  Cards,
  CardAvatar,
  H5,
  Divider,
  CardForm,
  ButtonForm,
} from "./components";
import TwoFactorSetup from "../feat-Auth/components/TwoFactorSetup";
import { useAppDispatch, useAppSelector } from "../../core";
import { styled as muiStyled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CheckCircle } from "@mui/icons-material";
import {
  updateUserName,
  uploadAvatar,
} from "../feat-Auth/components/authThunk";

export const VisuallyHiddenInput = muiStyled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export const AccountSettings = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
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
          token: auth.token,
          id: auth.user.intraId,
          newUsername: textInput,
          user: null,
        })
      );
    } else {
      setInputError("Invalid characters in username.");
    }
  };
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileInfos, setFileInfos] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageError(null);
    const fileInput = event.target;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      if (file) {
        // Read the selected image and set it in the state for preview
        // Check if the selected file type is allowed
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
          setImageError("Invalid file type. Please select a valid image file.");
          // Optionally, you can reset the input to clear the selected file
          event.target.value = "";
          return;
        }
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target && typeof e.target.result === "string") {
            if (file.size > MAX_IMAGE_SIZE) {
              setImageError("Image size exceeds the allowed limit.");
              // Optionally, you can reset the input to clear the selected file
              event.target.value = "";
            } else {
              setFileInfos(file);
              setSelectedImage(e.target.result);
            }
          }
        };

        reader.onerror = (e) => {
          // Handle errors here
          setImageError("Error reading the file.");
          console.log("Error reading the file:", e?.target?.error);
        };

        reader.onabort = (e) => {
          // Handle aborts (e.g., if the user cancels the file input)
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

      // Create a form data object
      const formData = new FormData();

      // Append the image data to the form data
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
    } else {
      setImageError("Error uploading the file, please retry.");
    }
  };
  return (
    <Root>
      <Title style={{ fontSize: "2rem" }}>Account Profile</Title>
      <Cards>
        <CardAvatar>
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
              color="secondary"
              variant="contained"
              startIcon={selectedImage ? <CheckCircle /> : <CloudUploadIcon />}
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
        <CardForm>
          <Title style={{ fontSize: "1rem" }}>Profile</Title>
          <H5>The informations can be edited</H5>
          <TextField
            sx={{ margin: "10px 0px", width: "80%" }}
            color="secondary"
            required
            id="username"
            label="Username"
            variant="outlined"
            error={!!inputError}
            value={textInput}
            placeholder="Username"
            onChange={handleInputChange}
            helperText={inputError}
          />
          <TwoFactorSetup twoFactorActivate={auth.user.twoFactorActivate} />
          <Divider />
          <ButtonForm
            type="submit"
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            disabled={!textInput || !!inputError}
          >
            Save Details
          </ButtonForm>
        </CardForm>
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
