import { useNavigate } from "react-router-dom";
import { Message, PersonAddAlt } from "@mui/icons-material";
import { Avatar, Button, Coalition, Text, Usercard } from "../styles";
import { gamerType } from "./statsType";
import CircularProgressBar from "./utils/CircularProgressBar";
import images from "../images_uploads";

const UserCard = (props: { gamer: gamerType }) => {
  const { gamer } = props;
  const navigate = useNavigate();
  return (
    <Usercard>
      <Coalition>
        <Text variant="h6" sx={{ mb: "5px" }}>
          {gamer.coalition.name}
        </Text>
        <img
          alt={"Coalition"}
          src={`/app/${images[gamer.coalition.logo]}`}
          style={{
            width: 80,
            height: 120,
          }}
        />  
        <h3 style={{ margin: "7px" }}> #{gamer.rank}</h3>
      </Coalition>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minWidth: "80%",
          marginTop: "6%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "0 20px 0 20px",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mr: 2,
              }}
              alt="UserImg"
              src={`/app/images_uploads/${gamer.user.avatar_url}`}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "start",
              }}
            >
              <Text variant="h5">
                {`${gamer.user.firstName} ${gamer.user.lastName}`}
              </Text>
              <Button
                sx={{
                  padding: "0",
                  textTransform: "lowercase",
                }}
                size="small"
                startIcon={<PersonAddAlt fontSize="small" />}
                onClick={() => navigate("/account/profile")}
              >
                friend requist
              </Button>
              <Button
                sx={{
                  padding: "0",
                  textTransform: "lowercase",
                }}
                size="small"
                startIcon={<Message fontSize="small" />}
                onClick={() => navigate("/account/profile")}
              >
                message
              </Button>
            </div>
          </div>
          <CircularProgressBar progress={gamer.rank} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "end",
            textAlign: "center",
            padding: "0 2% 0 10%",
          }}
        >
          <Text variant="body1">
            {"Total matches"} <br /> <span> {gamer.totalmatch} </span>
          </Text>
          <Text variant="body1">
            {"Wins"} <br /> <span> {gamer.wins} </span>
          </Text>
          <Text variant="body1">
            {"Achievements"} <br /> <span> {gamer.achivs} </span>
          </Text>
        </div>
      </div>
    </Usercard>
  );
};

export default UserCard;
