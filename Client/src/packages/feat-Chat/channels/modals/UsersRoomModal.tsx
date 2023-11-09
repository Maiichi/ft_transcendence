import { PersonAddAltRounded } from "@mui/icons-material";
import styled from "styled-components";
import { I_Room, Members } from "../../components/types";
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
import { SearchComponent, useAppDispatch } from "../../../../core";
import { getUserFriends } from "../redux/friendThunk";
import { setDisplayUserActions } from "../../../../core/CoreSlice";

export const UsersRoom = ({
  channelConversation,
  setOpen,
}: {
  channelConversation: I_Room;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  const [filteredUsers, setFilteredUsers] = useState<Array<Members>>(
    channelConversation.members
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleClick = () => {
    dispatch(setDisplayUserActions(true));
    setOpen(false);
  };

  const handleClickSearch = (str: string) => {
    setSearchQuery(str);
  };

  useEffect(() => {
    if (searchQuery.length) {
      const filteredFriends = channelConversation.members.filter(
        (member: Members) =>
          member.user.firstName
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase())
      );
      setFilteredUsers(filteredFriends);
    } else setFilteredUsers(channelConversation.members);
  }, [searchQuery]);
  useEffect(() => {
    dispatch(getUserFriends());
  }, []);

  return (
    <>
      <SearchComponent onInputUpdate={handleClickSearch} />
      <UsersModal>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItemButton sx={{ borderRadius: "10px" }}>
            <PersonAddAltRounded fontSize="large" />
            <h4 style={{ marginLeft: "10px" }}>Invite user</h4>
          </ListItemButton>
          {filteredUsers.map((user, index) => (
            <>
              <ListItem alignItems="flex-start">
                <ListItemButton
                  sx={{ borderRadius: "10px" }}
                  onClick={handleClick}
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

              <Divider variant="inset" component="li" />
            </>
          ))}
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
