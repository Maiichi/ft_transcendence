import { PersonAddAltRounded } from "@mui/icons-material";
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
import { SearchComponent, useAppDispatch, useAppSelector } from "../../../../core";
import { getUserFriends } from "../redux/friendThunk";
import { setDisplayUserActions } from "../../../../core/CoreSlice";
import { setSelectedUser } from "../../components/chatSlice";
import { I_Member } from "../../../feat-Search/types/types";

export const UsersRoom = ({
  channelConversation,
  setOpen,
}: {
  channelConversation: I_Room;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.auth.user);
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const block  = useAppSelector((state) => state.block);
  console.log('block ==', block);
  // const [filteredUsers, setFilteredUsers] = useState<Array<Members>>(
  //   channelConversation.members
  // );
  
  const isBlacklisted = (intraId: number): boolean => {
    const isBlockedByYou = block.blockedByYou.some((blockedMember: any) => blockedMember.intraId === intraId);
    const isBlockedYou = block.blockedYou.some((blockedMember: any) => blockedMember.intraId === intraId);
    console.log('isBlockedByYou =', isBlockedByYou);
    console.log('isBlockedYou =', isBlockedYou);
    return isBlockedByYou || isBlockedYou ;
  }

  const filtredMembers = channelConversation.members.filter((member: Members) =>
    (
      (!isBlacklisted(member.user.intraId))
      && (member.user.intraId !== currentUser.intraId )
      && (member.user.firstName
        .toLowerCase()
        .startsWith(searchQuery.toLowerCase())))
  );
  

  const handleClick = (user: I_User) => {
    dispatch(setSelectedUser(user));
    dispatch(setDisplayUserActions(true));
    setOpen(false);
  };

  const handleClickSearch = (str: string) => {
    setSearchQuery(str);
  };

  // useEffect(() => {
  //   if (searchQuery.length) {
  //     const filteredFriends = channelConversation.members.filter(
  //       (member: Members) =>
  //         ( member.user.intraId !== currentUser.intraId && (member.user.firstName
  //           .toLowerCase()
  //           .startsWith(searchQuery.toLowerCase())))
  //     );
  //     setFilteredUsers(filteredFriends);
  //   } else setFilteredUsers(channelConversation.members);
  // }, [searchQuery]);

  // useEffect(() => {
  //   dispatch(getUserFriends());
  // }, []);

  return (
    <>
      <SearchComponent onInputUpdate={handleClickSearch} />
      <UsersModal>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {/* <ListItemButton sx={{ borderRadius: "10px" }}>
            <PersonAddAltRounded fontSize="large" />
            <h4 style={{ marginLeft: "10px" }}>Invite user</h4>
          </ListItemButton> */}
          {filtredMembers.map((user, index) => (
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
