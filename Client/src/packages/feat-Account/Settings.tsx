import {
  Avatar,
  FormControlLabel,
  Switch,
  TextField 
} from '@mui/material'
import { useState, useEffect } from 'react'

import {
  Title,
  Cards,
  CardAvatar,
  H5,
  Divider,
  ButtonAvatar,
  CardForm,
  ButtonForm,
} from './styles'
import { uinfo, UserInfo } from './API.d'

export const Settings = () => {
  const [userData, setuserData] = useState<UserInfo|any>({});
  const [twoFact, setTwoFact] = useState<boolean>(false);


  let uname = 'mes-sadk'
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMzE3LCJlbWFpbCI6Im1lcy1zYWRrQHN0dWRlbnQuMTMzNy5tYSIsImlhdCI6MTY5NTQwMzc4MCwiZXhwIjoxNjk1NDkwMTgwfQ.6ZJ1OAg0hgD1Hyk7a-TF9PbZ1kdnQu4bu_OK9IoBR_A'


  useEffect (() => {
    uinfo(uname, token)
    .then (res => {
      if (res?.status === 200)
        setuserData(res.message)
      else
        throw 'Error'
    }).catch(err => {
      console.error('Error: ', err)
    })
  }, [])

  return (
    <>
      <Title style={{ fontSize: "2rem" }}>Account Profile</Title>
      <Cards>
        <CardAvatar>
          <Avatar
            sx={{ width: "80px", height: "80px" }}
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
          />
          <Title style={{ fontSize: "1rem" }}>{[userData?.lastName, ' ', userData?.firstName]}</Title>
          <H5>{uname}</H5>
          <Divider />
          <ButtonAvatar>Upload Picture</ButtonAvatar>
        </CardAvatar>
        <CardForm>
          <Title style={{ fontSize: "1rem" }}>Profile</Title>
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
            defaultValue={uname}
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
      </Cards>
    </>
  );
}
