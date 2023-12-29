import { Avatar, Badge } from "@mui/material";
import {
  StyledLink,
  StyledUserCard,
  UserInfoContainer,
  UserName,
  UserLogin,
  NoMatchesFound,
} from ".";
import { useNavigate } from "react-router-dom";
import { I_User, ModalComponent } from "../../../core";
import { useState } from "react";
import { UnBlockUserModal } from "../../feat-Chat/components/modals/UnBlockUserModal";
import { Block } from "@mui/icons-material";

export const UserSelection = (props: {
  users: I_User[];
  forfriends?: true;
  forBlocked?: true;
  onSearch: boolean;
}) => {
  const { users, forfriends, forBlocked, onSearch } = props;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [closeType, setCloseType] = useState<"auto" | "click" | undefined>(
    undefined
  );
  const [ChildModal, setChildModal] = useState<JSX.Element>(<></>);
  const handleClickModal = (
    childModal: JSX.Element,
    closeType?: "auto" | "click"
  ) => {
    setCloseType(closeType);
    setOpen(true);
    setChildModal(childModal);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handelCklick = (uid: number, uname: string) => {
    if (forBlocked) {
      handleClickModal(
        <UnBlockUserModal
          handleClose={handleClose}
          intraId={uid}
          userName={uname}
        />
      );
    } else navigate(`/user/${uid}`);
  };

  return (
    <>
      <ModalComponent
        open={open}
        ChildComponent={ChildModal}
        handleClose={handleClose}
        closeType={closeType}
      />
      {users.length ? (
        users.map((user) => (
          <StyledLink onClick={() => handelCklick(user.intraId, user.userName)}>
            <StyledUserCard forBlocked={forBlocked}>
              <Avatar
                sx={{ height: 60, width: 60 }}
                src={user.avatar_url}
                alt="avatar"
              >
                User
              </Avatar>
              <Badge
                sx={{
                  display: `${forfriends ? "inline" : "none"}`,
                  width: 13,
                  height: 13,
                  animation: "ripple 1.2s infinite ease-in-out",
                  borderRadius: "50%",
                  top: "25px",
                  right: "24px",
                  backgroundColor: `${
                    user.status == "ONLINE" ? "green" : "#880b0b"
                  }`,
                }}
              ></Badge>
              {forBlocked && <Block fontSize="large" />}
              <UserInfoContainer>
                <UserName>{`${user.firstName} ${user.lastName}`}</UserName>
                <br />
                <UserLogin>@{user.userName.slice(0, 8)}</UserLogin>
              </UserInfoContainer>
            </StyledUserCard>
          </StyledLink>
        ))
      ) : (
        <NoMatchesFound>
          {onSearch || forBlocked
            ? ` No ${
                forfriends ? "friend" : forBlocked ? "boloked user" : "User"
              } found`
            : forfriends
            ? "No friend list yet"
            : "Search for Users"}
        </NoMatchesFound>
      )}
    </>
  );
};
