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
  getBlacklist,
} from "./components";
import { ProfileCards, Button } from "./styles";
import { isBlockedByYou, isBlockedYou } from "../feat-Chat/components/utils";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();

  const intraId = useAppSelector((state) => state.auth.user.intraId);
  const block = useAppSelector((state) => state.block);
  const uid: number = params.uid ? parseInt(params.uid) : intraId;
  const isOwner: boolean = intraId === uid;

  const profileStates: ProfileState = useAppSelector((state) => state.profile);
  const isLoading: boolean = !useAppSelector(
    ({ profile }) =>
      profile.isLoading || profile.lead.isLoading || profile.matchs.isLoading
  );

  const user = profileStates.gamer.user;
  useEffect(() => {
    dispatch(getuserasgamer(uid));
    dispatch(getLeaderboard());
    dispatch(getBlacklist());
  }, [uid]);
  if (
    (!user && isLoading) ||
    isBlockedByYou(uid, block) ||
    isBlockedByYou(uid, block)
  ) {
    navigate("/");
    return null;
  }

  return (
    <>
      {!isLoading ? (
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
