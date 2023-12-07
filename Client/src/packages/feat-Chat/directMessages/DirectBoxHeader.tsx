import { I_DirectConversation } from "../components/types";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { useSize } from "../../../core/utils/hooks";
import { setDiscussionsDisplay } from "../components/redux/chatSlice";
import { PopperComponent, useAppDispatch } from "../../../core";
import { useStyles } from "../components/style";
import { UserActions } from "../components/UserActions";
import { useState } from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
export const DirectBoxHeader = (props: {
  directConversation: I_DirectConversation;
}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { isMobile } = useSize();

  const { directConversation } = props;
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<any | null>(null);

  const handleClickModal = (
    e: React.MouseEvent<any>,
    childModal: JSX.Element,
    closeType?: "auto" | "click"
  ) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <PopperComponent
        paperStyle={{
          backgroundColor: "rgb(255, 255, 255)",
          color: "rgb(54, 65, 82)",
          borderRadius: "10px",
          overflow: "hidden",
          border: "none rgba(144, 202, 249, 0.145)",
        }}
        popperStyle={{
          paddingTop: "5px",
        }}
        anchorEl={anchorEl}
        open={open && isMobile}
        placement={"bottom-start"}
        ChildComponent={<UserActions handleClosePopper={handleClose} />}
      />
      {isMobile && (
        <DehazeIcon
          className={classes.iconBase}
          onClick={() => {
            dispatch(setDiscussionsDisplay(true));
          }}
        />
      )}
      <h4>
        {directConversation?.receiver?.firstName}
        {directConversation?.receiver?.lastName}
      </h4>
      {isMobile && (
        <ManageAccountsIcon
          className={classes.iconBase}
          onClick={(e) =>
            handleClickModal(e, <UserActions handleClosePopper={setOpen} />)
          }
        />
      )}
    </>
  );
};
