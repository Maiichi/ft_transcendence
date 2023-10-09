import { useNavigate } from "react-router-dom";
import { Button } from "../styles/Leaderboard.style";

const OwnerProfile = () => {
	const navigate = useNavigate()

  return <>
      <Button onClick={() => navigate('/Leaderboard')}>
        See more {'...'}
      </Button>
    </>
}
export default OwnerProfile