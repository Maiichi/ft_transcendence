import React from 'react'
import "./message.css"

interface Props {
    own: boolean
}
export const Message = ({own}: Props) => {
    const messageClass = own ? "messageBox own" : "messageBox";
    return (
        <div className={messageClass}>
            <div className="messageTop">
                <img className='messageImg' src="https://media.istockphoto.com/id/1294780139/photo/close-up-portrait-of-smiling-man-with-eyeglasses-in-blue-shirt-3d-illustration-of-cartoon.jpg?s=1024x1024&w=is&k=20&c=6ENyB-NdL-HZJOtV6Jp8SD8TRx9w_KLswfIH9s6uGUs=" alt="" />
                <p className="messageText">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum, maiores in numquam molestiae distinctio nostrum, est temporibus officiis quas vitae dolore illum suscipit deleniti quae, hic iusto. Inventore, error et!
                </p> 
            </div>
        
            <div className="messageBottom">
                1 hour ago
            </div>
        </div>
    )
}
