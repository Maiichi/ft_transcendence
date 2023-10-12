import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  DialogTitle,
  Dialog,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

const emails = ["username@gmail.com", "user02@gmail.com"];

const useStyles = makeStyles({
  myButton: {
    height: "unset !important",
    position: "fixed",
    top: "43px",
    right: "3px",
    // color: "white",
    // "&:hover": {
    //   backgroundColor: "darkred",
    // },
  },
  myButto: {
    margin: "unset !important",
  },
});

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

export const SimpleDialog = (props: SimpleDialogProps) => {
  const { onClose, open } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      classes={{ container: classes.myButton, paper: classes.myButto }}
    ></Dialog>
  );
};
