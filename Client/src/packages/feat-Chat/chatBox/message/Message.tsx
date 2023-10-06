import "./message.css"
import { convertDateTime } from "../../Utils/utils";
interface Props {
    own: boolean,
    data: {
        sender: {
            intraId: number,
            firstName: string,
            lastName: string,
            userName: string,
            avatar_url: string,
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
                {data.sender.avatar_url !== null ? 
                (<img className="messageImg" src={require(`/app/images_uploads/${data.sender.avatar_url}`)} alt="" />) 
                :
                (<img className="messageImg" src="" alt="" />)
                }
                {/* <img className='messageImg' src={require(`/app/images_uploads/${data.sender.avatar_url}`)} alt="" /> */}
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
