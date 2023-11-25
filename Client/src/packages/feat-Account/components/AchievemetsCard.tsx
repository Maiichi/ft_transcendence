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
        {`${userName}'s Achievements`}
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
                  achiv.progress >= 100
                    ? `/images/${achiv.logo}`
                    : `/images/padlocki.png`
                }
              />
              {achiv.progress >= 100 ? (
                <a title={achiv.name}> {achiv.name.slice(0, 6)}</a>
              ) : (
                <a title="paly to get more"> locked </a>
              )}{" "}
            </Achiv>
          )
      )}
    </Achievemets>
  );
};

export default AchievemetsCard;
