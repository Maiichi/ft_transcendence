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
    >
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleListItemClick()} key={email}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disableGutters>
          <ListItemButton autoFocus onClick={() => handleListItemClick()}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
};
