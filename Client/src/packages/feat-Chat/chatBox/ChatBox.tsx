
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../../core";
import { ChannelSettingModal } from "../ChannelModal/ChannelSettingModal";
import { Message } from "../message/Message";
import "./chatBox.css"
import { getChatRoomMessages } from "../components/rooms/chatThunk";
import { useEffect } from "react";
import { getDirectConversationMessages } from "../components/conversations/conversationThunk";

interface Conversation {
    id: number;
    createdAt: string;
    updatedAt: string;
    type: string;
    messages: { content: string; createdAt: string }[];
    participants: {
      userName: string;
      firstName: string;
      lastName: string;
      status: string;
    }[];
  }
  
  interface Room {
    id: number;
    members: {
      isAdmin: boolean;
      isBanned: boolean;
      isMute: boolean;
      isOwner: boolean;
      user: {
        firstName: string;
        lastName: string;
        userName: string;
      };
    }[];
    conversation : {
        id: number,
        createdAt: string,
        messages: {
            sender: {},
            content: string,
            createdAt: string
        }[],
        participants:[],
        type: string,
        updatedAt: string
    }
    name: string;
    createdAt: string;
    updatedAt: string;
    password: string;
    type: string;
  }

  interface messageData {
    sender: {
        intraId: number,
        firstName: string,
        lastName: string,
        userName: string
    },
    content: string,
    createdAt: string
}
  
interface Props {
    directConversation: Conversation | null
    channelConversation: Room | null;
}
  
export const ChatBox: React.FC<Props> = ({
    directConversation, channelConversation
}) =>{
    const dispatch = useDispatch<AppDispatch>();
    const account = useAppSelector((state) => state.auth.user);
    const token: string   = useAppSelector((state) => state.auth.token);
    const roomMessages: [] = useAppSelector((state) => state.chat.messages);
    const directConversationMessages: [] = useAppSelector((state) => state.conversation.messages);
    
    useEffect(() => {
        if (channelConversation !== null)
            dispatch(getChatRoomMessages({token, roomId: channelConversation.id}));
        else if (directConversation !== null)
            dispatch(getDirectConversationMessages({token, conversationId: directConversation.id}))    
    },[dispatch, channelConversation])


    const isConnectedUser = (intraId: number) => {
        if (account.intraId == intraId)
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
                                <Message own={isConnectedUser(item.sender.intraId)} data = {item} />
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
                                roomMessages.length === 0 ? 
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