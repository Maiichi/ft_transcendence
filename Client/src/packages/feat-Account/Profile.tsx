import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ProfileCards,

  /***global**/
  Root,
} from "./styles";
import { useAppDispatch, useAppSelector } from "../../core";
import { getAchievements, getMatchsHistory } from "./components";

const Profile = () => {
  const navigate = useNavigate();
  const [state, _] = useState(useAppSelector(state => state.profile))
  const dispatch = useAppDispatch()

  useEffect(() => {

  }, [])

  dispatch(getAchievements())
  dispatch(getMatchsHistory())
  return (
      <ProfileCards>

      </ProfileCards>
  );
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
