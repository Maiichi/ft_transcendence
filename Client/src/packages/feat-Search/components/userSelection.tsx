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
import { I_User } from "../../../core";

export const UserSelection = (props: {
  users: I_User[];
  forfriends?: true;
  onSearch: boolean;
}) => {
  const { users, forfriends, onSearch } = props;
  const navigate = useNavigate();

  return (
    <>
      {users.length ? (
        users.map((user) => (
          <StyledLink onClick={() => navigate(`/user/${user.intraId}`)}>
            <StyledUserCard>
              <Avatar
                sx={{ height: 60, width: 60 }}
                src={user.avatar_url}
                alt="avatar"
              />
              {forfriends && (
                <Badge
                  sx={{
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
              )}
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
          {onSearch
            ? ` No ${forfriends ? "friend" : "User"} found`
            : forfriends
            ? "No friend list yet"
            : "Search for Users"}
        </NoMatchesFound>
      )}
    </>
  );
};
