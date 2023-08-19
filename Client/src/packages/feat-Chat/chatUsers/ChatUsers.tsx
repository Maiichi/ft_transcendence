import React from 'react'
import "./chatUsers.css"
import { ButtonAvatar, CardAvatar, H5 } from '../../feat-Account/components'
import { Avatar, Divider, Icon, Popper } from '@mui/material'
import { Title } from '@mui/icons-material'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { PopperComponent } from '../../../core'

interface Props {
    type: string
}

const isFriend = false;
const usersInRoom = [
    {
        name: 'Ishak Zail',
        isOnline: true,
        isFriend: false,
    },
    {
        name: 'Ismail Bouroummana',
        isOnline: false,
        isFriend: true,
    }
]

export const ChatUsers = ({type} : Props) => {
    const ButtonData = isFriend ? 'Invite to game' : 'Send Request';
  return (
    <div className="onlineUsersBox">
        {
            type === 'Dms' ? (
                <>
                <div className="onlineUsersHeader">
                    <h3 className="onlineUsersTop">
                        Online Users
                    </h3>
                </div>
                <div className="cardHolder">
                    <CardAvatar>
                        <Avatar
                            sx={{ width: "80px", height: "80px" }}
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                        />
                        <Title style={{ fontSize: "1rem" }}>Bouroummana Ismail</Title>
                        <H5>ibouroum</H5>
                        <Divider />
                        <ButtonAvatar>{ButtonData}</ButtonAvatar>
                        <ButtonAvatar>View Profile</ButtonAvatar>
                    </CardAvatar>
                </div>
                <div className="divider">

                </div>
                <div className="onlineUsers">
                    <div className="onlineUserImgContainer">
                        <img 
                            className='onlineUserImg'
                            src="https://media.istockphoto.com/id/1294780139/photo/close-up-portrait-of-smiling-man-with-eyeglasses-in-blue-shirt-3d-illustration-of-cartoon.jpg?s=1024x1024&w=is&k=20&c=6ENyB-NdL-HZJOtV6Jp8SD8TRx9w_KLswfIH9s6uGUs=" alt="" />
                        <div className="onlineUsersBadge">
                        </div>
                    </div>
                    <p className="onlineUsersName">
                        Ishak Zail
                    </p>
                    <div className="i0conHolder">
                        {/* < /> */}
                    </div>
                </div>
                </>
            )
            : (
                <>
                <div className="onlineUsersHeader">
                    <h3 className="onlineUsersTop">
                        Room Users
                    </h3>
                    
                </div>
                <div className="onlineUsers">
                        Room logic
                </div>
                </>
            )
        }
    </div>
  )
}
