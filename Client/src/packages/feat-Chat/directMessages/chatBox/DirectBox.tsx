import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../core";
import { I_DirectConversation, I_Message } from "../../Types/types";
import { getDirectConversationMessages } from "../redux/directMessageThunk";
import { MessageBox } from "../../components/MessageBox";
import { DirectBoxHeader } from "./headerBox/DirectBoxHeader";
import styled from "styled-components";
import { isConnectedUser } from "../../../../core/utils/helperFunctions";

export const DirectBox = (props: {
  directConversation: I_DirectConversation;
}) => {
  const { directConversation } = props;

  const dispatch = useAppDispatch();
  const { directMessage, auth } = useAppSelector((state) => state);

  useEffect(() => {
    // check if directConversation.id is not exist in the state
    if (directConversation)
      dispatch(getDirectConversationMessages(directConversation.id));
  }, []);
  return (
    <>
      <ChatBox>
        <Header>
          <DirectBoxHeader directConversation={directConversation} />
        </Header>
        <Wrapper>
          <ChatBoxTop>
            {directMessage.conversationsContent.map((item: I_Message) => (
              <MessageBox
                own={isConnectedUser(item.sender.intraId, auth.user.intraId)}
                data={item}
                key={item.id}
              />
            ))}
          </ChatBoxTop>
        </Wrapper>
        <ChatBoxBottom>
          <ChatMessageInput placeholder="Write your message ..."></ChatMessageInput>
          <ChatSubmitButtom>Send</ChatSubmitButtom>
        </ChatBoxBottom>
      </ChatBox>
      <RightSide>onlineUsers</RightSide>
    </>
  );
};

const ChatBox = styled.div`
  flex: 5.5;
  height: 100%;
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

const ChatBoxBottom = styled.div`
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

const RightSide = styled.div`
  flex: 2;
  height: 100%;
  /* border-radius: 20px; */
  border-left: 1px solid #d7d7d7;
`;
