import { useNavigate } from "react-router-dom";
import { CheckCircle, DoNotDisturbOn, Dangerous } from "@mui/icons-material";
import { Avatar, Match, Matchshistory, Text } from "../styles";
import { MatchHistoryType } from "./statsType";

const MatchsHistoryCard = (props: {
  userName: string;
  uid: number;
  matchs: MatchHistoryType[];
}) => {
  const { userName, matchs, uid } = props;
  const getresult = (winer: number, equal: boolean, results: Array<any>) =>
    equal ? results[2] : winer === uid ? results[0] : results[1];
  const navigate = useNavigate();

  return (
    <Matchshistory>
      <Text
        variant="h5"
        sx={{
          width: "100%",
          textAlignLast: "center",
          fontSize: "19px",
          fontFamily: "monospace",
          fontWeight: "bolder",
        }}
      >
        {`${userName.slice(0, 8)}'s Last Matches`}
      </Text>
      {matchs && matchs.length ? (
        matchs.map((item, index) => {
          if (index > 4 || item.Players.length !== 2) return null; // never applied
          const op = item.Players[0].intraId === uid ? 1 : 0;
          return (
            <Match
              onClick={() => navigate(`/gamesHistory?uid=${uid}#${index + 1}`)}
              win={getresult(item.winnerId, item.score1 === item.score2, [
                "#2fa025b8",
                "#b0141495",
                "#3b4243b7",
              ])}
            >
              <Avatar
                sx={{ width: 60, height: 60, mb: 2 }}
                alt="we"
                src={item.Players[op].avatar_url}
              />
              <Text> {item.Players[op].userName.slice(0, 8)} </Text>
              <p>
                {`${item.Players[op].score} : ${
                  item.Players[op ? 0 : 1].score
                }`}
              </p>
              {getresult(item.winnerId, item.score1 === item.score2, [
                <CheckCircle color="success" />,
                <DoNotDisturbOn color="error" />,
                <Dangerous color="disabled" />,
              ])}
            </Match>
          );
        })
      ) : (
        <div
          style={{
            textAlign: "center",
            lineHeight: "35px",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          No match palyed yet <br /> Play to see your history
        </div>
      )}
    </Matchshistory>
  );
};

export default MatchsHistoryCard;
