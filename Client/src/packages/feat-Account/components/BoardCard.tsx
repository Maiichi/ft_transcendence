import { useNavigate } from "react-router-dom";
import { Leaderboard } from "./Leaderboard";
import { Board, Button, Text } from "../styles";

const BoardCard = () => {
  const navigate = useNavigate();
  return (
    <Board>
      <Text
        variant="h4"
        sx={{
          width: "100%",
          textAlignLast: "center",
          fontSize: "19px",
          fontFamily: "monospace",
          fontWeight: "bolder",
          mb: 0,
          pb:0
        }}
      >
        Top 3 player
      </Text>
      <Leaderboard primary={false} />
      <Button color="secondary" onClick={() => navigate("/Leaderboard")}>See more...</Button>
    </Board>
  );
};

export default BoardCard;
