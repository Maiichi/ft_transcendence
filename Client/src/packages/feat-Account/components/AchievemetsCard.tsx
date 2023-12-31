import { Tooltip } from "@mui/material";
import { Achievemets, Achiv, Text } from "../styles";
import { AchievementType } from "./statsType";

const AchievemetsCard = (props: {
  userName: string;
  achivs: { name: string }[];
}) => {
  const { userName, achivs } = props;
  const achivlist: AchievementType[] = Object.values(
    require("../static-data/Achievements.json")
  );

  return (
    <Achievemets>
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
        {`${userName.slice(0, 8)}'s Achievements`}
      </Text>
      {achivlist.map((achiv, index) => {
        const getted: boolean = !!achivs.some(
          ({ name }) => name === achiv.name
        );
        if (index > 9) return <></>;
        return (
          <Achiv>
            <img
              style={{
                width: "40px",
                height: "40px",
              }}
              alt="logoAchiv"
              src={getted ? `/images/${achiv.logo}` : `/images/blocked.png`}
            />
            <Tooltip
              title={getted ? achiv.name : "paly to get more"}
              enterDelay={500}
              leaveDelay={200}
              arrow
            >
              <p>{getted ? achiv.name.slice(0, 6) : "locked"}</p>
            </Tooltip>
          </Achiv>
        );
      })}
    </Achievemets>
  );
};

export default AchievemetsCard;
