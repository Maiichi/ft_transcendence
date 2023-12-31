import React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ClearIcon from "@mui/icons-material/Clear";
import { makeStyles } from "@material-ui/styles";

interface Props {
  clear?: boolean;
  setOpen?: any;
  onInputUpdate: (str: string) => void;
}

const useStyles = makeStyles({
  paper: {
    background: " rgb(248, 250, 252)",

    display: "flex",
    alignItems: "center",
  },
  "@media (max-width: 425px)": {
    paper: {
      width: "97%",
      margin: "2px",
      /* align-items: center, */
      /* margin-right: auto, */

      background: "#ffffff",
      // Other styles that apply when the media query matches
    },
  },
});
export const SearchComponent = (props: Props) => {
  const { clear, setOpen, onInputUpdate } = props;
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <IconButton
        type="button"
        sx={{ color: "rgb(94, 53, 177)", p: "10px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search "
        onChange={(e) => onInputUpdate(e.target.value)}
      />

      {clear && setOpen && (
        <IconButton
          sx={{
            borderRadius: "8px",
            width: "34px",
            height: "34px",
            background: "rgb(251, 233, 231)",
            color: "rgb(216, 67, 21)",
          }}
          aria-label="menu"
          onClick={() => setOpen(false)}
        >
          <ClearIcon />
        </IconButton>
      )}
    </div>
  );
};
