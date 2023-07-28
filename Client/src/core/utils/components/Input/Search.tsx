import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import TuneIcon from "@mui/icons-material/Tune";
import ClearIcon from "@mui/icons-material/Clear";
interface Props {
  clear?: boolean;
  setOpen?: any;
}
export const SearchComponent = (props: Props) => {
  const { clear, setOpen } = props;
  return (
    <Paper
      component="form"
      sx={{
        background: " rgb(248, 250, 252)",
        borderRadius: "12px",
        
        p: "0 4px",
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
    </Paper>
  );
};
