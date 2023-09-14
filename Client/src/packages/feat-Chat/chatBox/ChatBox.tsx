
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../../core";
import { ChannelSettingModal } from "../ChannelModal/ChannelSettingModal";
import { Message } from "./message/Message";
import "./chatBox.css"
import { getChatRoomMessages } from "../components/rooms/chatThunk";
import { useEffect } from "react";
import { getDirectConversationMessages } from "../components/conversations/conversationThunk";
import { Conversation, Membership, messageData } from "../Types/types";
import { useSocket } from "../../../core/socket/socketContext";
import { removeMembership, setIsConversation } from "../components/rooms/chatSlice";


interface Props {
    directConversation: Conversation | null
    channelConversation: Membership | null;
}
  
export const ChatBox: React.FC<Props> = ({
    directConversation, channelConversation
}) =>{
    const dispatch = useDispatch<AppDispatch>();
    const account = useAppSelector((state) => state.auth.user);
    const displayConversation = useAppSelector((state) => state.chat.isConversation);
    const token: string   = useAppSelector((state) => state.auth.token);
    const roomMessages: [] = useAppSelector((state) => state.chat.messages);
    const directConversationMessages: [] = useAppSelector((state) => state.conversation.messages);
    const socket = useSocket();

    useEffect(() => {
        if (channelConversation !== null)
            dispatch(getChatRoomMessages({token, roomId: channelConversation.id}));
        else if (directConversation !== null)
            dispatch(getDirectConversationMessages({token, conversationId: directConversation.id}))    
    },[dispatch, channelConversation, directConversation, displayConversation])

    useEffect(() => {
        if (socket && channelConversation)
        {
            socket.on('roomLeaved', (data) => {
                dispatch(removeMembership(data));
                dispatch(setIsConversation(false));
            });
            console.log("room should removed from here");
        }
    }, [socket, dispatch])

    const isConnectedUser = (intraId: number) => {
        if (account.intraId === intraId)
            return true;
        return false;
    }

    return (
        <>
        {
            (channelConversation === null && directConversation) ? (
                <div className="chatBox">
                    <div className="chatBoxHeader">
                        <ChannelSettingModal channelConversation={channelConversation} directConversation={directConversation} />
                    </div>
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                        {directConversationMessages.map((item: messageData ) => (
                            <>
                                <Message own={isConnectedUser(item.sender.intraId)} data ={item} />
                            </>
                        ))}
                        </div>
                    </div>
                    <div className="chatBoxBottom">
                    <textarea
                        className="chatMessageInput"
                        placeholder="Write your message ..."
                    ></textarea>
                    <button className="chatSubmitButtom">Send</button>
                    </div>
                </div>
            ) : (
                <>
                <div className="chatBox">
                    <div className="chatBoxHeader">
                        <ChannelSettingModal channelConversation={channelConversation} directConversation={directConversation} />
                    </div>
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            { 
                                !channelConversation && roomMessages.length === 0 ? 
                                (
                                    <div className="empty-conversation">
                                        <h2>it's always better to start a conversation 	&#128516;</h2>
                                    </div>
                                ) 
                                : 
                                (
                                    <>
                                        {roomMessages.map((item: messageData ) => (
                                            <>
                                                <Message own={isConnectedUser(item.sender.intraId)} data= {item} />
                                            </>
                                        ))}
                                    </>
                                ) 
                            }
                        </div>
                    </div>
                    <div className="chatBoxBottom">
                    <textarea
                        className="chatMessageInput"
                        placeholder="Write your message ..."
                    ></textarea>
                    <button className="chatSubmitButtom">Send</button>
                    </div>
                </div>
                </>
            )
        }
        </>
    );
}