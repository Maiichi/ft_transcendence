import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { flexbox } from '@mui/system';

import style, {
  ProfileCards,
  Usercard,
  Coalition,
  User,

  Text
} from "./styles";
import { useAppDispatch, useAppSelector } from "../../core";
import { getuserasgamer, gamerType, getAchievements, getMatchsHistory, ops } from "./components";
import { Box, Button } from "@mui/material";
import {PersonAddAlt, Message} from '@mui/icons-material';
import { Pic } from "./static-data";
import CircularProgressBar from "./components/utils/CircularProgressBar";


const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const  user = useAppSelector(state => state.auth.user)
  const gamer:gamerType = ops
  const Loading = useState([
  ])
  useEffect(() => {
    if (user)
      dispatch(getuserasgamer(user))
  }, [Loading, user])

  return (
      <ProfileCards>
        <Usercard>
          <Coalition>
            <Text variant="subtitle2" sx={{mb: '5px'}}> {gamer.coalition.name} </Text>
            <img alt={'Coalition'} src={`${gamer.coalition.logo}`} />
            <h5 > #{gamer.rank}</h5>
          </Coalition>
          <div style={style.div1}>
            <div style={style.div2}>
              <div style={style.div3}>
                <img style={style.userAvatar} alt='UserImg' src={/*gamer.user?.avatar_url*/ Pic}/>
                <div style={style.div4}>
                  <Text variant="h5" style={style.userName} > {`${user.firstName} ${user.lastName}`} </Text>
                  <Button
                    size="small"
                    startIcon={<PersonAddAlt fontSize="small"/>}  
                    onClick={() => navigate('/account/profile') } > friend requist
                  </Button>
                  <Button
                    variant='outlined'
                    size="small"
                    startIcon={<Message fontSize="small"/>}
                    onClick={() => navigate('/account/profile')} > message
                  </Button>
                </div>
              </div>
              <CircularProgressBar progress={gamer.rank}/>
            </div>
            <div style={style.box2}>
              <Text variant="body1"> {'Total matches'} <br /> <span > {23} </span></Text>
              <Text variant="body1"> {'Wins'} <br /> <span> {20} </span></Text>
              <Text variant="body1"> {'Achievements'} <br /> <span> {13} </span></Text>
            </div>
          </div>
        </Usercard>
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
