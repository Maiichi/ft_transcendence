import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import React from "react";
interface Props {
  anchorEl: HTMLImageElement | HTMLButtonElement;
  open: boolean;
  placement: any;
  ChildComponent: JSX.Element;
  style?: React.CSSProperties;
}

export const PopperComponent = ({
  anchorEl,
  open,
  placement,
  ChildComponent,
  style,
}: Props) => {
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement={placement}
      transition
      sx={{ paddingTop: "20px" }}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper sx={style}>{ChildComponent}</Paper>
        </Fade>
      )}
    </Popper>
  );
};
