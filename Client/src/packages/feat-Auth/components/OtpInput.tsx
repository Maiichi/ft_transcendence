import React, { useState, ChangeEvent, KeyboardEvent, useRef } from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { FormHelperText } from "@mui/material";

const useStyles = makeStyles(() => ({
  otpInputContainer: {
    display: "flex",
    alignItems: "center",
  },
  otpInput: {
    marginRight: "4px",
    width: 40, // Adjust the width as needed
  },
}));

interface OtpInputProps {
  length?: number;
  onChange: (code: string) => void; // Callback function to pass OTP code to the parent component
  error: boolean;
  errorMessage: string;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  onChange,
  error,
  errorMessage,
}) => {
  const classes = useStyles();
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const inputs = useRef<HTMLInputElement[]>(Array(length).fill(null));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    slot: number
  ) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;

    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);

    // Trigger the onChange callback to pass the OTP code to the parent component
    onChange(newCode.join(""));

    if (slot !== length - 1 && num) {
      inputs.current[slot + 1].focus();
    }
  };

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    slot: number
  ) => {
    if (e.key === "Backspace" && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      inputs.current[slot - 1].focus();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className={classes.otpInputContainer}>
        {code.map((digit, index) => (
          <TextField
            key={`otp-input-${index}`}
            id={`otp-input-${index}`}
            variant="outlined"
            size="small"
            color="secondary"
            type="text"
            value={digit}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChange(event, index)
            }
            onKeyDown={(event: KeyboardEvent<HTMLInputElement>) =>
              handleKeyUp(event, index)
            }
            inputProps={{
              maxLength: 1,
              style: { textAlign: "center" },
              autoFocus: index === 0, // Autofocus the first input field
            }}
            className={classes.otpInput}
            inputRef={(ref) => (inputs.current[index] = ref)}
            error={error}
          />
        ))}
      </div>
      {error && <FormHelperText error>{errorMessage}</FormHelperText>}
    </div>
  );
};

export default OtpInput;
