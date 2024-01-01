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
  setToNoError,
} from "./components";
import { ProfileCards } from "./styles";
import { isBlockedByYou, isBlockedYou } from "../feat-Chat/components/utils";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();

  const intraId = useAppSelector((state) => state.auth.user.intraId);
  const block = useAppSelector((state) => state.block);
  const paramuid: number = params.uid ? parseInt(params.uid, 10) : intraId;
  const uid: number = Number.isNaN(paramuid) ? intraId : paramuid;
  const isOwner: boolean = intraId === uid;

  const profileStates: ProfileState = useAppSelector((state) => state.profile);
  const profileError: string | null = useAppSelector(
    (state) => state.profile.error
  );
  const isLoading: boolean = !useAppSelector(
    ({ profile }) =>
      profile.isLoading || profile.lead.isLoading || profile.matchs.isLoading
  );
  const user = profileStates.gamer.user;

  useEffect(() => {
    dispatch(getBlacklist());
    dispatch(getuserasgamer(uid));
    dispatch(getLeaderboard());
  }, [uid]);

  useEffect(() => {
    if (
      (block && (isBlockedByYou(uid, block) || isBlockedYou(uid, block))) ||
      profileError || Number.isNaN(paramuid) || /[^0-9]/.test(params.uid??'')
    ) {
      dispatch(setToNoError());
      navigate("/");
    }
  }, [block, profileError]);

  return (
    <>
      {!isLoading || !user ? (
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
