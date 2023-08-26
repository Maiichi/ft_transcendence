import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import React from "react";
interface Props {
  anchorEl: HTMLImageElement | HTMLButtonElement;
  open: boolean;
  placement: any;
  ChildComponent: JSX.Element;
  paperStyle?: React.CSSProperties;
  popperStyle?: React.CSSProperties;
}

export const PopperComponent = ({
  anchorEl,
  open,
  placement,
  ChildComponent,
  paperStyle,
  popperStyle,
}: Props) => {
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement={placement}
      transition
      sx={popperStyle}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper sx={paperStyle}>{ChildComponent}</Paper>
        </Fade>
      )}
    </Popper>
  );
};
