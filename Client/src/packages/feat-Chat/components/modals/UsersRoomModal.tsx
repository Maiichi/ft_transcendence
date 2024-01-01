import { Close } from "@mui/icons-material";
import styled from "styled-components";
import { I_Room, Members } from "../types";
import { useState } from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  I_User,
  SearchComponent,
  useAppDispatch,
  useAppSelector,
} from "../../../../core";
import { setDisplayUserActions } from "../../../../core/CoreSlice";
import { setSelectedUser } from "../redux/chatSlice";
import { useSize } from "../../../../core/utils/hooks";
import { NotFound } from "../style";
import { isAdmin, isBlockedByYou, isBlockedYou, isOwner } from "../utils";

export const UsersRoom = ({
  channelConversation,
  setOpenPopper,
  setOpenPopperAction,
}: {
  channelConversation: I_Room;
  setOpenPopper: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenPopperAction: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const { isMobile } = useSize();
  const currentUser = useAppSelector((state) => state.auth.user);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const block = useAppSelector((state) => state.block);


  const filtredMembers = channelConversation.members.filter(
    (member: Members) =>
      !(
        isBlockedByYou(member.user.intraId, block) &&
        !isAdmin(channelConversation, currentUser.intraId) &&
        !isOwner(channelConversation, currentUser.intraId)
      ) &&
      !(
        isBlockedYou(member.user.intraId, block) &&
        !isAdmin(channelConversation, currentUser.intraId) &&
        !isOwner(channelConversation, currentUser.intraId)
      ) &&
      member.user.intraId !== currentUser.intraId &&
      (!searchQuery ||
        member.user.firstName
          .toLowerCase()
          .startsWith(searchQuery.toLowerCase()))
  );

  const handleClick = (user: I_User) => {
    dispatch(setSelectedUser(user));
    dispatch(setDisplayUserActions(true));
    setOpenPopper(false);
    if (isMobile) {
      setOpenPopperAction(true);
    }
  };

  const handleClickSearch = (str: string) => {
    setSearchQuery(str);
  };

  return (
    <>
      <Header>
        <Title>Users</Title>
        <Close
          sx={{
            "&:hover": {
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
            },
          }}
          style={{ cursor: "pointer" }}
          onClick={() => setOpenPopper(false)}
        />
      </Header>
      <SearchComponent onInputUpdate={handleClickSearch} />
      <UsersModal>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {filtredMembers.length != 0 ? (
            filtredMembers.map((user, index) => (
              <>
                <ListItem alignItems="flex-start" key={index}>
                  <ListItemButton
                    sx={{ borderRadius: "10px" }}
                    onClick={() => handleClick(user.user)}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={user.user.avatar_url} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${user.user.firstName} ${user.user.lastName}`}
                    />
                  </ListItemButton>
                </ListItem>
              </>
            ))
          ) : (
            <NotFound>No user Found</NotFound>
          )}
        </List>
      </UsersModal>
    </>
  );
};

const UsersModal = styled.div`
  overflow-y: scroll;
  max-height: 100%;
  scrollbar-color: red;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`;
const Title = styled.h3`
  margin: 0;
`;
