import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
interface Props {
  anchorEl: HTMLImageElement | HTMLButtonElement;
  open: boolean;
  placement: any;
  ChildComponent: JSX.Element;
}

export const PopperComponent = ({
  anchorEl,
  open,
  placement,
  ChildComponent,
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
          <Paper>{ChildComponent}</Paper>
        </Fade>
      )}
    </Popper>
  );
};
