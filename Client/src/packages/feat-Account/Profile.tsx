import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import style, {
  ProfileCards,
  Usercard,
  Coalition,
  Matchshistory,
  Match,
  Text,
} from "./styles";
import { useAppDispatch, useAppSelector } from "../../core";
import {
  getuserasgamer,
  gamerType,
  getAchievements,
  getMatchsHistory,
  MatchHistoryType,
} from "./components";
import { Avatar, Box, Button, Icon } from "@mui/material";
import {
  PersonAddAlt,
  Message,
  CheckCircle,
  Dangerous,
  DoNotDisturbOn,
} from "@mui/icons-material";
import { Pic } from "./images_uploads";

import CircularProgressBar from "./components/utils/CircularProgressBar";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const gamer: gamerType = require("./static-data/gamer.json");
  const matchs = require("./static-data/MatchesHistory.json").matchs;
  const match: MatchHistoryType[] = [];
  for (let i = 1; ; i++) {
    if (!matchs[i]) break;
    match.push(matchs[i]);
  }

  const Loading = useState([]);
  useEffect(() => {
    if (user) dispatch(getuserasgamer(user));
  }, [Loading, user]);

  function getresult(one: number, two: number, results: Array<any>) {
    return one > two ? results[0] : one < two ? results[1] : results[2];
  }
  return (
    <ProfileCards>
      <Usercard>
        <Coalition>
          <Text variant="subtitle2" sx={{ mb: "5px" }}>
            {" "}
            {gamer.coalition.name}{" "}
          </Text>
          <img alt={"Coalition"} src={require(`${gamer.coalition.logo}`)} />
          <h5 style={{ margin: "7px" }}> #{gamer.rank}</h5>
        </Coalition>
        <div style={style.div1}>
          <div style={style.div2}>
            <div style={style.div3}>
              <Avatar
                style={style.userAvatar}
                alt="UserImg"
                src={/*gamer.user?.avatar_url*/ Pic}
              />
              <div style={style.div4}>
                <Text variant="h5" style={style.userName}>
                  {" "}
                  {`${user.firstName} ${user.lastName}`}{" "}
                </Text>
                <Button
                  sx={style.button1}
                  size="small"
                  startIcon={<PersonAddAlt fontSize="small" />}
                  onClick={() => navigate("/account/profile")}
                >
                  {" "}
                  friend requist
                </Button>
                <Button
                  sx={style.button1}
                  size="small"
                  startIcon={<Message fontSize="small" />}
                  onClick={() => navigate("/account/profile")}
                >
                  {" "}
                  message
                </Button>
              </div>
            </div>
            <CircularProgressBar progress={gamer.rank} />
          </div>
          <div style={style.box2}>
            <Text variant="body1">
              {" "}
              {"Total matches"} <br /> <span> {23} </span>
            </Text>
            <Text variant="body1">
              {" "}
              {"Wins"} <br /> <span> {20} </span>
            </Text>
            <Text variant="body1">
              {" "}
              {"Achievements"} <br /> <span> {13} </span>
            </Text>
          </div>
        </div>
      </Usercard>
      <div style={{ minWidth: "40%" }}></div>
      <Matchshistory>
        <Text variant="h5" sx={style.cardName}>
          {" "}
          {`${gamer?.user?.lastName}'s Last Matches`}
        </Text>
        {match.map((item: MatchHistoryType, index: number) => (
          <Match
            win={getresult(item.gain, item.nogain, [
              "#2fa025b8",
              "#b0141495",
              "#3b4243b7",
            ])}
          >
            <Avatar alt="we" src={`${item.pic}`} />
            <Text> {item.name} </Text>
            <p> {`${item.gain} : ${item.nogain}`} </p>
            {getresult(item.gain, item.nogain, [
              <CheckCircle color="success" />,
              <DoNotDisturbOn color="error" />,
              <Dangerous color="disabled" />,
            ])}
          </Match>
        ))}
      </Matchshistory>
      <div style={{ minWidth: "40%" }}></div>
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
