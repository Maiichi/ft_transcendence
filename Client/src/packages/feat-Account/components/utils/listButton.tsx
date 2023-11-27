import { MoreVert } from "@mui/icons-material";
import { Dialog, List, Button, ListItemIcon } from "@mui/material";
import { useState } from "react";

export interface SimpleDialogProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open, children } = props;

  return (
    <Dialog onClose={() => onClose()} open={open}>
      <List>{children}</List>
    </Dialog>
  );
}

const ListButton: React.FC<{
  children?: React.ReactNode;
  isTab?: boolean;
}> = ({ children, isTab }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return isTab ? (
    <>
      <Button
        variant="text"
        onClick={handleClickOpen}
        startIcon={<MoreVert />}
      />
      <SimpleDialog open={open} onClose={handleClose}>
        {children}
      </SimpleDialog>
    </>
  ) : (
    <ListItemIcon>{children}</ListItemIcon>
  );
};

export default ListButton;
