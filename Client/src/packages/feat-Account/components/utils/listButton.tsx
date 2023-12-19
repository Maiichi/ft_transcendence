import { MoreVert } from "@mui/icons-material";
import { Button, ListItemIcon, Popover } from "@mui/material";

interface ListButtonProps {
  children?: React.ReactNode;
  isTab?: boolean;
  onCklick: (event: React.MouseEvent<any>) => void;
  anchorEl: any;
  open: boolean;
  setOpen: any;
}

const ListButton: React.FC<ListButtonProps> = ({
  children,
  isTab,
  onCklick,
  anchorEl,
  open,
  setOpen,
}) => {
  const handleClick = onCklick;
  return isTab ? (
    <>
      <Button variant="text" onClick={handleClick} startIcon={<MoreVert />} />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {children}
      </Popover>
    </>
  ) : (
    <ListItemIcon>{children}</ListItemIcon>
  );
};

export default ListButton;
