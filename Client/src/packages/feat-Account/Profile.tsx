import { useNavigate } from "react-router-dom";
import {
  Button,

  /***global**/
  Root,
} from "./styles";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <Root>
      <Button onClick={() => navigate("/Leaderboard")}>
        See more {"...< >>Leaderboard >"}
      </Button>
    </Root>
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
