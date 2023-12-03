import { MoreVert } from "@mui/icons-material";
import { Button, ListItemIcon } from "@mui/material";
import { PopperComponent } from "../../../../core";

const ListButton: React.FC<{
  children?: React.ReactNode;
  isTab?: boolean;
  foo: (event: React.MouseEvent<any>, index: number) => void;
  anchorEl: any;
  open: boolean;
  index: number;
}> = ({ children, isTab, foo, anchorEl, open, index }) => {
  const handleClick = (event: React.MouseEvent<any>) => {
    foo(event, anchorEl === event.currentTarget && open ? -1 : index);
  };
  return isTab ? (
    <>
      <Button variant="text" onClick={handleClick} startIcon={<MoreVert />} />

      <PopperComponent
        anchorEl={anchorEl}
        popperStyle={{ paddingTop: "2px" }}
        placement="bottom-end"
        open={open}
        ChildComponent={<>{children}</>}
        paperStyle={{}}
      />
    </>
  ) : (
    <ListItemIcon>{children}</ListItemIcon>
  );
};

export default ListButton;
