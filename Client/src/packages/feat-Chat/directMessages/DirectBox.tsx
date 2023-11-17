import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../core";
import { I_DirectConversation, I_Message } from "../components/types";
import { getDirectConversationMessages } from "./redux/directMessageThunk";
import { MessageBox } from "../components/MessageBox";
import { DirectBoxHeader } from "./DirectBoxHeader";
import styled from "styled-components";
import { isConnectedUser } from "../../../core/utils/helperFunctions";
import {
  createDirectConversation,
  sendMessageToUser,
} from "./redux/directMessageSlice";
import { RightSide } from "./DirectBoxRight";

export const DirectBox = () => {
  // const { directConversation } = props;
  const dispatch = useAppDispatch();
  const direct = useAppSelector((state) => state.chat.currentConversation);
  const user = useAppSelector((state) => state.auth.user);
  const { conversations } = useAppSelector((state) => state.directMessage);
  const [messageContent, setMessageContent] = useState<string>("");
  const conversationMessages: [] = useAppSelector(
    (state) => state.directMessage.conversationsContent
  );
  const index = conversations.findIndex(
    (item: any) => item.id == direct.directConversationId
  );

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    const messageData = {
      receiverId: conversations[index].receiver.intraId,
      content: messageContent,
    };
    dispatch(createDirectConversation(messageData));
    setMessageContent("");
  };

  useEffect(() => {
    // check if directConversation.id is not exist in the state
    if (direct)
      dispatch(getDirectConversationMessages(direct.directConversationId));
  }, [direct.directConversationId]);
  return (
    <>
      <ChatBox>
        <Header>
          <DirectBoxHeader directConversation={conversations[index]} />
        </Header>
        <Wrapper>
          <ChatBoxTop>
            {conversationMessages.map((item: I_Message) => (
              <MessageBox
                own={isConnectedUser(item.sender.intraId, user.intraId)}
                data={item}
                key={item.id}
              />
            ))}
          </ChatBoxTop>
        </Wrapper>
        <ChatBoxBottom onSubmit={handleSendMessage}>
          <ChatMessageInput
            placeholder="Write your message ..."
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
          <ChatSubmitButtom>Send</ChatSubmitButtom>
        </ChatBoxBottom>
      </ChatBox>
      {/* <RightSide /> */}
    </>
  );
};

const ChatBox = styled.div`
  flex: 5.5;
  height: 100%;
  border-left: 1px solid rgb(215, 215, 215);
`;

const Header = styled.div`
  border-bottom: 1px solid #d7d7d7;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px 0px 10px;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80%;
  padding: 0px 10px 0px 0px;
`;

const ChatBoxTop = styled.div`
  height: 100%;
  overflow-y: scroll;

  /* Hide scrollbar for Chrome, Safari, and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge, and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const ChatBoxBottom = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10%;
`;

const ChatMessageInput = styled.textarea`
  width: 80%;
  height: 50px;
  padding: 10px;
  margin: 10px;
`;

const ChatSubmitButtom = styled.button`
  width: 70px;
  height: 40px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
`;

// const RightSide = styled.div`
//   flex: 2;
//   height: 100%;
//   /* border-radius: 20px; */
//   border-left: 1px solid #d7d7d7;
// `;
