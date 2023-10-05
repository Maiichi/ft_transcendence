import {
  Avatar,
  FormControlLabel,
  Switch,
  TextField 
} from '@mui/material'
import { useState, useEffect } from 'react'

import {
  PictureEdit,
  SettingCards,
  CardAvatar,
  H5,
  Divider,
  ButtonAvatar,
  CardForm,
  ButtonForm,

  Title,
  Root,
} from './styles'


import { uinfo, UserInfo } from './API.d'
import { useAppSelector } from '../../core'

export const Settings = () => {
  const [userData, setuserData] = useState<UserInfo|any>({})
  const [twoFact, setTwoFact] = useState(false)
  const [userInfo, setuserInfo] = useState(useAppSelector((state) => state.auth.user))


  useEffect (() => {
    setuserInfo( (prevInfo:any) => {
      const updatedInfo = { ...prevInfo }
      updatedInfo.avatar_url = null
      return updatedInfo
  })
  }, [userInfo])

const style = {
  avatar: {
    width: "80px",
    height: "80px"
  },


}
  return (
    <Root>
      <Title>setting</Title>
      <SettingCards>
        <CardAvatar>
          <Avatar
            sx={style.avatar}
            alt={''}
            src={userInfo.avatar_url}
          />
          <h2 style={{ fontSize: "1rem" }}>{[userInfo.lastName, ' ', userInfo.firstName]}</h2>
          <H5>{userInfo.userName}</H5>
          <Divider />
          <PictureEdit>
            <ButtonAvatar onClick={()=> {}}>{ userInfo.avatar_url ? 'Change': 'upload' } Picture</ButtonAvatar>
          </PictureEdit>
        </CardAvatar>
      
        <CardForm>
          <h3 >Profile</h3>
          <H5>The informations can be edited</H5>
          <TextField
            sx={{ margin: "10px 0px", width: "80%" }}
            required
            id="firstname"
            label="Firstname"
            variant="outlined"
            defaultValue={userData?.firstName}
          />
          <TextField
            sx={{ margin: "10px 0px", width: "80%" }}
            required
            id="lastname"
            label="Lastname"
            variant="outlined"
            defaultValue={userData?.lastName}
          />
          <TextField
            sx={{ margin: "10px 0px", width: "80%" }}
            required
            id="username"
            label="Username"
            variant="outlined"
            defaultValue={userInfo.userName}
          />
          <FormControlLabel
            control={
              <Switch
                checked={twoFact}
                onChange={() => setTwoFact(!twoFact)}
                name="2FA"
              />
            }
            label="Two Factor Authentication"
          />
          <TextField
            sx={{ margin: "10px 0px", width: "80%" }}
            required
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            // defaultValue={}
          />
          <Divider />
          <ButtonForm>Save Details</ButtonForm>
        </CardForm>
      </SettingCards>
    </Root>
  );
}
