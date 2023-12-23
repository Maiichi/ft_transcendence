import { Avatar } from "@mui/material";
import {
  StyledLink,
  StyledUserCard,
  UserInfoContainer,
  UserName,
  UserLogin,
  RatingContainer,
  NoMatchesFound,
} from ".";
import { useNavigate } from "react-router-dom";
import { userType } from "../../feat-Account/components";
import { I_User } from "../../feat-Chat/components/types";

interface Users {
  users: I_User[];
}

export const UserSelection = ({ users }: Users) => {
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
              <UserInfoContainer>
                <UserName>{`${user.firstName} ${user.lastName}`}</UserName>
                <br />
                <UserLogin>@{user.userName.slice(0, 8)}</UserLogin>
              </UserInfoContainer>
              <RatingContainer>
                {/* <img src="/img/applogo.svg" alt="logo" height={20} width={20} /> */}
              </RatingContainer>
            </StyledUserCard>
          </StyledLink>
        ))
      ) : (
        <NoMatchesFound>No User found</NoMatchesFound>
      )}
    </>
  );
};

// export default UserSelection;
// export { UserSelection };
