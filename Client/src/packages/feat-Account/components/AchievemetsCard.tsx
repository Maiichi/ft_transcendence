import { Tooltip } from "@mui/material";
import { Achievemets, Achiv, Text } from "../styles";
import { AchievementType } from "./statsType";

const AchievemetsCard = (props: {
  userName: string;
  achivs: AchievementType[];
}) => {
  const { userName, achivs } = props;
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
      {achivs.map(
        (achiv, index) =>
          index < 9 && (
            <Achiv>
              <img
                style={{
                  width: "40px",
                  height: "40px",
                }}
                alt="logoAchiv"
                src={
                  achiv.geted
                    ? `/images/${achiv.logo}`
                    : `/images/blocked.png`
                }
              />
              <Tooltip
                title={achiv.geted ? achiv.name : "paly to get more"}
                enterDelay={500}
                leaveDelay={200}
                arrow
              >
                <p>
                  {achiv.geted ? achiv.name.slice(0, 6) : "locked"}
                </p>
              </Tooltip>
            </Achiv>
          )
      )}
    </Achievemets>
  );
};

export default AchievemetsCard;
