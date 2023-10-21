import React , { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
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
  const { clear, setOpen , onInputUpdate} = props;
  const classes = useStyles();

  return (
    <div
      className={classes.paper}
      // sx={{
      //   background: " rgb(248, 250, 252)",
      //   borderRadius: "12px",
      //   p: "0 4px",
      //   display: "flex",
      //   alignItems: "center",
      // }}
    >
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
      <IconButton
        sx={{
          borderRadius: "8px",
          width: "34px",
          height: "34px",
          background: "rgb(237, 231, 246)",
          color: "rgb(94, 53, 177)",
          marginRight: "10px",
        }}
        aria-label="menu"
      >
        <TuneIcon />
      </IconButton>
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
