import * as React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { deepPurple, purple } from "@mui/material/colors";

interface CustomButtonProps extends ButtonProps {
  onClick?: () => void;
  title: string;
  style?: React.CSSProperties;
}

export function ButtonComponent({
  variant,
  onClick,
  title,
  style,
  ...otherProps
}: CustomButtonProps) {
  return (
    <Button
      variant={variant || "contained"}
      onClick={onClick}
      color="secondary"
      sx={style || { backgroundColor: deepPurple[300] }}
      {...otherProps}
    >
      {title}
    </Button>
  );
}
