import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../../core";
import { Message } from "./message/Message";
import "./chatBox.css";
import { getChatRoomMessages } from "../components/rooms/roomThunk";
import { useEffect, useState } from "react";
import {
  I_DirectConversation,
  I_Discussion,
  I_Message,
  I_Room,
} from "../Types/types";
import { getDirectConversationMessages } from "../components/directMessage/directMessageThunk";
import { S_DirectMessages } from "../components/directMessage/directMessageSlice";
import { DirectBoxHeader } from "./boxHeader/DirectBoxHeader";
import { ChannelBoxHeader } from "./boxHeader/ChannelBoxHeader";

interface Props {
  directConversation: I_DirectConversation | null;
  conversation: I_Discussion | null;
  channelConversation: I_Room | null;
}
interface ChatBoxProps {
  conversation: I_Discussion | null;
}
export const ChatBox: React.FC<ChatBoxProps> = ({ conversation }) => {
  console.log("ChatBox Rendring !");
  if (conversation?.type === "direct" && conversation.direct) {
    return <DirectBox directConversation={conversation.direct} />;
  } else if (conversation?.type === "channel" && conversation.room) {
    return <ChannelBox channelConversation={conversation.room} />;
  } else
    return (
      <div className="chatBoxNoConversation">
        <h1> Click on a conversation to start chatting. </h1>
      </div>
    );
};

const DirectBox = (props: { directConversation: I_DirectConversation }) => {
  const { directConversation } = props;
  // console.log(props.directConversation);

  const dispatch = useDispatch<AppDispatch>();
  const state: S_DirectMessages = useAppSelector(
    (state) => state.directMessage
  );
  // console.log("state == " , state);
  const directMessages: [] = useAppSelector(
    (state) => state.directMessage.conversationsContent
  );
  const account = useAppSelector((state) => state.auth.user);
  const isConnectedUser = (intraId: number) => {
    if (account.intraId === intraId) return true;
    return false;
  };

  useEffect(() => {
    // check if directConversation.id is not exist in the state
    if (directConversation)
      dispatch(getDirectConversationMessages(directConversation.id));
  }, []);
  return (
    <>
      <div className="chatBox">
        <div className="chatBoxHeader">
          <DirectBoxHeader directConversation={directConversation} />
        </div>
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            {directMessages.map((item: I_Message) => (
              <Message own={isConnectedUser(item.sender.intraId)} data={item} />
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
      <div className="onlineUsersBox">onlineUsers</div>
    </>
  );
};

const ChannelBox = (props: { channelConversation: I_Room }) => {
  // console.log(props.channelConversation.id);
  console.log("Channel Box rendring !");
  const { channelConversation } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [openLeaveModal, setOpenLeaveModal] = useState(false);
  const handleClose = () => {
    setOpen(!open);
  };
  const roomMessages: [] = useAppSelector((state) => state.channels.messages);

  const handleCloseLeaveRoomModal = () => {
    setOpenLeaveModal(!openLeaveModal);
  };

  const handleLeaveRoom = () => {
    setOpenLeaveModal(false);
  };
  // const state: S_DirectMessages = useAppSelector(
  //   (state) => state.directMessage
  // );
  const account = useAppSelector((state) => state.auth.user);
  const isConnectedUser = (intraId: number) => {
    if (account.intraId === intraId) return true;
    return false;
  };

  useEffect(() => {
    if (channelConversation !== null)
      dispatch(getChatRoomMessages(channelConversation.id));
  }, []);
  return (
    <>
      <div className="chatBox">
        <div className="chatBoxHeader">
          <ChannelBoxHeader channelConversation={channelConversation} />
        </div>
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            {roomMessages.length === 0 ? (
              <div className="empty-conversation">
                <h2>it's always better to start a conversation &#128516;</h2>
              </div>
            ) : (
              <>
                {roomMessages.map((item: I_Message) => (
                  <>
                    <Message
                      own={isConnectedUser(item.sender.intraId)}
                      data={item}
                      key={item.id}
                    />
                  </>
                ))}
              </>
            )}
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
      <div className="onlineUsersBox">onlineUsers</div>
    </>
  );
};

const boxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
  overflow: "hidden",
};

// const MessageBox = (conversation: I_ConversationMessages) => {
//   const account = useAppSelector((state) => state.auth.user);
//   const isConnectedUser = (intraId: number) => {
//     if (account.intraId === intraId) return true;
//     return false;
//   };
//   return (
//     <div className="chatBox">
//       <div className="chatBoxWrapper">
//         <div className="chatBoxTop">
//           {conversation.messages.map((item: I_Message) => (
//             <Message own={isConnectedUser(item.sender.intraId)} data={item} />
//           ))}
//         </div>
//       </div>
//       <div className="chatBoxBottom">
//         <textarea
//           className="chatMessageInput"
//           placeholder="Write your message ..."
//         ></textarea>
//         <button className="chatSubmitButtom">Send</button>
//       </div>
//     </div>
//   );
// };

// export const ChatBoxte: React.FC<Props> = ({
//   directConversation,
//   channelConversation,
//   conversation,
// }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const account = useAppSelector((state) => state.auth.user);
//   const roomMessages: [] = useAppSelector((state) => state.channels.messages);

//   useEffect(() => {
//     if (channelConversation !== null)
//       dispatch(getChatRoomMessages(channelConversation.id));
//   }, []);

//   const isConnectedUser = (intraId: number) => {
//     if (account.intraId === intraId) return true;
//     return false;
//   };

//   return (
//     <>
//       {channelConversation === null && directConversation ? (
//         <div className="chatBox">
//           <div className="chatBoxHeader">
//             <ChannelSettingModal
//               channelConversation={channelConversation}
//               directConversation={directConversation}
//             />
//           </div>
//           <div className="chatBoxWrapper">
//             <div className="chatBoxTop">
//               {[1, 2].map((item: any) => (
//                 <Message
//                   own={isConnectedUser(item.sender.intraId)}
//                   data={item}
//                 />
//               ))}
//             </div>
//           </div>
//           <div className="chatBoxBottom">
//             <textarea
//               className="chatMessageInput"
//               placeholder="Write your message ..."
//             ></textarea>
//             <button className="chatSubmitButtom">Send</button>
//           </div>
//         </div>
//       ) : (
//         <>
//           <div className="chatBox">
//             <div className="chatBoxHeader">
//               <ChannelSettingModal
//                 channelConversation={channelConversation}
//                 directConversation={directConversation}
//               />
//             </div>
//             <div className="chatBoxWrapper">
//               <div className="chatBoxTop">
//                 {!channelConversation && roomMessages.length === 0 ? (
//                   <div className="empty-conversation">
//                     <h2>
//                       it's always better to start a conversation &#128516;
//                     </h2>
//                   </div>
//                 ) : (
//                   <>
//                     {roomMessages.map((item: any) => (
//                       <>
//                         <Message
//                           own={isConnectedUser(item.sender.intraId)}
//                           data={item}
//                         />
//                       </>
//                     ))}
//                   </>
//                 )}
//               </div>
//             </div>
//             <div className="chatBoxBottom">
//               <textarea
//                 className="chatMessageInput"
//                 placeholder="Write your message ..."
//               ></textarea>
//               <button className="chatSubmitButtom">Send</button>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };
