import "./message.css"
import { convertDateTime } from "../../Utils/utils";
interface Props {
    own: boolean,
    data: {
        sender: {
            intraId: number,
            firstName: string,
            lastName: string,
            userName: string
        },
        content: string,
        createdAt: string
    }
}
export const Message = ({own, data}: Props) => {
    const messageClass = own ? "messageBox own" : "messageBox";
    return (
        <div className={messageClass} key={data.createdAt}>
            <div className="messageTop">
                <img className='messageImg' src="https://media.istockphoto.com/id/1294780139/photo/close-up-portrait-of-smiling-man-with-eyeglasses-in-blue-shirt-3d-illustration-of-cartoon.jpg?s=1024x1024&w=is&k=20&c=6ENyB-NdL-HZJOtV6Jp8SD8TRx9w_KLswfIH9s6uGUs=" alt="" />
                <p className="messageText">
                    {data.content}
                </p>  
            </div>
            <div className="messageBottom">
                    {convertDateTime(data.createdAt)}
            </div>
        </div>
    )
}
