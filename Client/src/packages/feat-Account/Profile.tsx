import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading, useAppDispatch, useAppSelector } from "../../core";
import {
  ProfileState,
  getuserasgamer,
  getLeaderboard,
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

  const profileStates: ProfileState = useAppSelector((state) => state.profile);
  const Go: boolean = !useAppSelector(
    ({ profile }) =>
      profile.isLoading || profile.lead.isLoading || profile.matchs.isLoading
  );

  const user = profileStates.gamer.user;
  useEffect(() => {
    dispatch(getuserasgamer(uid));
    dispatch(getLeaderboard());

  }, []);

  if ((Go && !user) || uid < 1)
    return (
      <>
        user not found
        <Button onClick={() => navigate("/")}>go to home Page</Button>
      </>
    );

  return (
    <>
      {!Go ? (
        <Loading />
      ) : (
        <ProfileCards>
          <UserCard gamer={profileStates.gamer} isOwner={isOwner} />
          <BoardCard />
          <MatchsHistoryCard
            uid={uid}
            matchs={profileStates.matchs.matchsHistory}
            userName={user.userName}
          />
          <AchievemetsCard
            achivs={profileStates.achievement}
            userName={user.userName}
          />
        </ProfileCards>
      )}
    </>
  );
};

export { Profile };
