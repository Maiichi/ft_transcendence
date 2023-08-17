import React from 'react'
import "./chatUsers.css"

export const ChatUsers = () => {
  return (
    <div className="onlineUsersBox">
        <div className="onlineUsersHeader">
        <h3 className="onlineUsersTop">
            ONLINE USERS
        </h3>
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
        </div>
    </div>
  )
}
