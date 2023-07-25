import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import TuneIcon from "@mui/icons-material/Tune";
export const SearchComponent = () => {
  return (
    <Paper
      component="form"
      sx={{
        background: " rgb(248, 250, 252)",
        borderRadius: "12px",

        paddingLeft: "16px",
        paddingRight: "16px",
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
      }}
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
        placeholder="Search Google Maps"
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton
        sx={{ color: "rgb(94, 53, 177)", p: "10px" }}
        aria-label="menu"
      >
        <TuneIcon />
      </IconButton>
    </Paper>
  );
};
