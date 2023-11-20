import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  iconBase: {
    borderRadius: "6px",
    height: "25px",
    transition: "all 0.2s ease-in-out 0s",
    background: "rgb(237, 231, 246)",
    color: "rgb(94, 53, 177)",
    "&:hover": {
      background: "rgb(94, 53, 177)",
      color: "rgb(214, 220, 234)",
    },
  },
  dehazeIcon: {
    borderRadius: "6px",
    height: "25px",
    transition: "all 0.2s ease-in-out 0s",
    background: "rgb(237, 231, 246)",
    color: "rgb(94, 53, 177)",
    "&:hover": {
      background: "rgb(94, 53, 177)",
      color: "rgb(214, 220, 234)",
    },
  },
  "@media (max-width: 768px)": {
    dehazeIcon: {
      // Other styles that apply when the media query matches
    },
  },
});