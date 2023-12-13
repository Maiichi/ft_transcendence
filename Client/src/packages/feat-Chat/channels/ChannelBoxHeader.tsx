import { useState } from "react";
import {
  LogoutRounded,
  Person,
  PersonAddAltRounded,
} from "@mui/icons-material";
import DehazeIcon from "@mui/icons-material/Dehaze";
import styled from "styled-components";
import { LeaveRoomModal } from "../components/modals/leaveChannelModal";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  ModalComponent,
  PopperComponent,
  useAppDispatch,
  useAppSelector,
} from "../../../core";
import { UsersRoom } from "../components/modals/UsersRoomModal";
import { CreateChannelModal } from "../components/modals/CreateChannelModal";
import { isAdmin, isOwner } from "../components/utils";
import { AddUserToRoomModal } from "../components/modals/AddUserToRoomModal";
import { useSize } from "../../../core/utils/hooks";
import { useStyles } from "../components/style";
import { setDiscussionsDisplay } from "../components/redux/chatSlice";
import { UserActions } from "../components/UserActions";

export const ChannelBoxHeader = () => {
  const { isMobile } = useSize();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { roomId } = useAppSelector((state) => state.chat.currentConversation);
  const { memberships } = useAppSelector((state) => state.channels);
  const user = useAppSelector((state) => state.auth.user);

  const index = memberships.findIndex((item: any) => item.id == roomId);
  const [open, setOpen] = useState(false);
  const [openPopper, setOpenPopper] = useState(false);
  const [openPopperAction, setOpenPopperAction] = useState(false);

  const [closeType, setCloseType] = useState<"auto" | "click" | undefined>(
    undefined
  );

  const [ChildModal, setChildModal] = useState<JSX.Element>(<></>);
  const [ChildPopper, setChildPopper] = useState<JSX.Element>(<></>);

  const [anchorEl, setAnchorEl] = useState<any | null>(null);

  const handleClickModal = (
    childModal: JSX.Element,
    closeType?: "auto" | "click"
  ) => {
    setCloseType(closeType);
    setOpen(true);
    setOpenPopper(false);
    setChildModal(childModal);
  };
  const handleClickPopper = (
    e: React.MouseEvent<any>,
    childPopper: JSX.Element
  ) => {
    setAnchorEl(e.currentTarget);
    setOpenPopper(true);
    setOpen(false);
    setChildPopper(childPopper);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClosePopper = () => {
    setOpenPopper(false);
  };
  const isChannelOwner = isOwner(memberships[index], user.intraId);
  const isChannelAdmin = isAdmin(memberships[index], user.intraId);

  return (
    <Header>
      <ModalComponent
        open={open}
        ChildComponent={ChildModal}
        handleClose={handleClose}
        closeType={closeType}
      />
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
        open={openPopperAction && isMobile}
        placement={"bottom-start"}
        ChildComponent={<UserActions handleClosePopper={setOpenPopperAction} />}
      />
      <PopperComponent
        paperStyle={{
          backgroundColor: "rgb(255, 255, 255)",
          color: "rgb(54, 65, 82)",
          borderRadius: "10px",
          overflow: "hidden",
          border: "none rgba(144, 202, 249, 0.145)",
          padding: "10px",
        }}
        popperStyle={{
          paddingTop: "5px",
        }}
        anchorEl={anchorEl}
        open={openPopper}
        placement={"bottom-start"}
        ChildComponent={ChildPopper}
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
        # {memberships[index].name}
        {isChannelOwner && (
          <ArrowDropDownIcon
            onClick={() =>
              handleClickModal(
                <CreateChannelModal
                  handleClose={handleClose}
                  channelConversation={memberships[index]}
                />
              )
            }
          />
        )}
      </h4>
      <IconHolder>
        {isChannelAdmin && (
          <ChannelMembers>
            <PersonAddAltRounded
              sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: "rgb(245, 246, 247)" },
              }}
              onClick={(e) => {
                handleClickPopper(
                  e,
                  <AddUserToRoomModal handleClose={handleClosePopper} />
                );
              }}
            />
          </ChannelMembers>
        )}
        <ChannelMembers
          onClick={(e) =>
            handleClickPopper(
              e,
              <UsersRoom
                channelConversation={memberships[index]}
                setOpenPopper={setOpenPopper}
                setOpenPopperAction={setOpenPopperAction}
              />
            )
          }
        >
          <Person /> {memberships[index].members.length}
        </ChannelMembers>
        <ChannelMembers>
          <LogoutRounded
            onClick={() =>
              handleClickModal(
                <LeaveRoomModal
                  channelConversation={memberships[index]}
                  handleClose={handleClose}
                />
              )
            }
            style={{ cursor: "pointer" }}
          />
        </ChannelMembers>
      </IconHolder>
    </Header>
  );
};

const IconHolder = styled.div`
  display: flex;
  align-items: center;
`;

const Header = styled.div`
  border-bottom: 1px solid #d7d7d7;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px 0px 10px;
  align-items: center;
`;
const ChannelMembers = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #d7d7d7;
  border-radius: 7px;
  margin: 2px;
  cursor: pointer;
  padding: 5px;
  width: fit-content;
  height: fit-content;
  &:hover {
    background-color: #f1f1f1;
  }
`;
