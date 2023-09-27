import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../../core";
import { ChannelSettingModal } from "../ChannelModal/ChannelSettingModal";
import { Message } from "./message/Message";
import "./chatBox.css";
import { getChatRoomMessages } from "../components/rooms/roomThunk";
import { useEffect } from "react";
import {
  I_ConversationMessages,
  I_DirectConversation,
  I_Discussion,
  I_Message,
  I_Room,
} from "../Types/types";
import {
  DriveFileRenameOutlineTwoTone,
  PersonOffTwoTone,
  VideogameAssetTwoTone,
} from "@mui/icons-material";
import { getDirectConversationMessages } from "../components/directMessage/directMessageThunk";

interface Props {
  directConversation: I_DirectConversation | null;
  conversation: I_Discussion | null;
  channelConversation: I_Room | null;
}

export const ChatBox: React.FC<Props> = ({
  directConversation,
  channelConversation,
  conversation,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const account = useAppSelector((state) => state.auth.user);
  const roomMessages: [] = useAppSelector((state) => state.channels.messages);

  useEffect(() => {
    if (channelConversation !== null)
      dispatch(getChatRoomMessages(channelConversation.id));
    // else if (directConversation !== null)
    //   dispatch(
    //     getDirectConversationMessages({
    //       token,
    //       conversationId: directConversation.id,
    //     })
    //   );
  }, []);

  const isConnectedUser = (intraId: number) => {
    if (account.intraId === intraId) return true;
    return false;
  };

  return (
    <>
      {channelConversation === null && directConversation ? (
        <div className="chatBox">
          <div className="chatBoxHeader">
            <ChannelSettingModal
              channelConversation={channelConversation}
              directConversation={directConversation}
            />
          </div>
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              {[1, 2].map((item: any) => (
                <Message
                  own={isConnectedUser(item.sender.intraId)}
                  data={item}
                />
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
              <ChannelSettingModal
                channelConversation={channelConversation}
                directConversation={directConversation}
              />
            </div>
            <div className="chatBoxWrapper">
              <div className="chatBoxTop">
                {!channelConversation && roomMessages.length === 0 ? (
                  <div className="empty-conversation">
                    <h2>
                      it's always better to start a conversation &#128516;
                    </h2>
                  </div>
                ) : (
                  <>
                    {roomMessages.map((item: any) => (
                      <>
                        <Message
                          own={isConnectedUser(item.sender.intraId)}
                          data={item}
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
        </>
      )}
    </>
  );
};

const BoxMessage = (conversation: I_ConversationMessages) => {
  const account = useAppSelector((state) => state.auth.user);
  const isConnectedUser = (intraId: number) => {
    if (account.intraId === intraId) return true;
    return false;
  };
  return (
    <div className="chatBox">
      <div className="chatBoxWrapper">
        <div className="chatBoxTop">
          {conversation.messages.map((item: I_Message) => (
            <>
              <Message own={isConnectedUser(item.sender.intraId)} data={item} />
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
  );
};
const BoxDirect = (directConversation: I_DirectConversation) => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useAppSelector((state) => state.directMessage);
  useEffect(() => {
    dispatch(getDirectConversationMessages(directConversation.id));
  }, []);
  return (
    <>
      <div className="chatBoxHeader">
        <h4>{directConversation?.receiver.userName}</h4>
      </div>
      <BoxMessage conversation={state.conversationsContent} />
      <>
        <div className="onlineUsersHeader">
          <h3 className="onlineUsersTop">Room Users</h3>
        </div>
        <div className="onlineUsers">
          <div className="onlineUserImgContainer">
            <img
              className="onlineUserImg"
              src="https://media.istockphoto.com/id/1294780139/photo/close-up-portrait-of-smiling-man-with-eyeglasses-in-blue-shirt-3d-illustration-of-cartoon.jpg?s=1024x1024&w=is&k=20&c=6ENyB-NdL-HZJOtV6Jp8SD8TRx9w_KLswfIH9s6uGUs="
              alt=""
            />
            <div className="onlineUsersBadge"></div>
          </div>
          <p className="onlineUsersName">'test'</p>
          <div className="iconHolder">
            <div className="iconSVG" data-description="Invite to game">
              <VideogameAssetTwoTone></VideogameAssetTwoTone>
            </div>
            <div className="iconSVG" data-description="Send a message">
              <DriveFileRenameOutlineTwoTone></DriveFileRenameOutlineTwoTone>
            </div>
            <div className="iconSVG" data-description="Block user">
              <PersonOffTwoTone></PersonOffTwoTone>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

const BoxChannel = (channelConversation: I_DirectConversation) => {};
