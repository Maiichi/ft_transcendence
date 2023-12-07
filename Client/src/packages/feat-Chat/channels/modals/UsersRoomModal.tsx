import { Close } from "@mui/icons-material";
import styled from "styled-components";
import { I_Room, Members, I_User } from "../../components/types";
import { useEffect, useState } from "react";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  SearchComponent,
  useAppDispatch,
  useAppSelector,
} from "../../../../core";
import { setDisplayUserActions } from "../../../../core/CoreSlice";
import { setSelectedUser } from "../../components/chatSlice";
import { UserActions } from "../../components/UserActions";
import { useSize } from "../../../../core/utils/hooks";

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

  const isBlacklisted = (intraId: number): boolean => {
    const isBlockedByYou = block.blockedByYou.some(
      (blockedMember: any) => blockedMember.intraId === intraId
    );
    const isBlockedYou = block.blockedYou.some(
      (blockedMember: any) => blockedMember.intraId === intraId
    );

    return isBlockedByYou || isBlockedYou;
  };

  const filtredMembers = channelConversation.members.filter(
    (member: Members) =>
      !isBlacklisted(member.user.intraId) &&
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
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${user.user.firstName} ${user.user.lastName}`}
                      secondary={"14 mutual Friend"}
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
const NotFound = styled.h4`
  margin: 0px;
  padding: 5px 0;
  text-align: center;
`;
