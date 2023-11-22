import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../core";
import {
  ProfileState,
  getuserasgamer,
  getLeaderboard,
  Loading,
  BoardCard,
  AchievemetsCard,
  MatchsHistoryCard,
  UserCard,
} from "./components";
import { ProfileCards, Button } from "./styles";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const _uid = useParams<{ uid: string }>();

  const intraId = useAppSelector((state) => state.auth.user.intraId);
  const uid: number =
    typeof _uid.uid === "string" ? parseInt(_uid.uid, 10) : intraId;
  const isOwner: boolean = intraId === uid;
  uid > 0 || isOwner || navigate("/");

  const profileStates: ProfileState = useAppSelector((state) => state.profile);
  const isloading: boolean = useAppSelector(
    (state) => state.profile.isLoading || state.profile.lead.isLoading
  );

  const user = profileStates.gamer.user;
  useEffect(() => {
    dispatch(getuserasgamer(uid));
    dispatch(getLeaderboard());
  }, [_uid]);

  const Go = !isloading;
  if (Go && !user)
    return (
      <>
        user not found
        <Button onClick={() => navigate("/")}>go to home</Button>
      </>
    );

  switch (Go) {
    case false:
      return <Loading />;
    default:
      return (
        <ProfileCards>
          <UserCard gamer={profileStates.gamer} />
          <BoardCard />
          <MatchsHistoryCard
            matchs={profileStates.MatchHistory}
            userName={user.userName}
          />
          <AchievemetsCard
            achivs={profileStates.achievement}
            userName={user.userName}
          />
        </ProfileCards>
      );
  }
};

/**
 *  Profile Component
 *
 * The Profile component is responsible for rendering and displaying user profile information.
 * It typically receives user data as props and presents it in a structured format.
 * This component can be used to show details such as the user's name, profile picture, bio,
 * and other relevant information.
 *
 **/
export { Profile };
