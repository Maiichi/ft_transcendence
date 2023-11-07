import styled from "styled-components";
import { ChatDiscussion } from "./components/ChatDiscussion";
import { ChannelBox } from "./channels/ChannelBox";
import { DirectBox } from "./directMessages/DirectBox";
import { useAppSelector } from "../../core";

const ChatBox = () => {
  const { chat } = useAppSelector((state) => state);
  if (chat.currentConversation?.type === "direct") {
    return <DirectBox directConversation={chat.currentConversation.direct} />;
  } else if (chat.currentConversation?.type === "channel") {
    return <ChannelBox />;
  } else
    return (
      <BoxNoConversation>
        <h1> Click on a conversation to start chatting. </h1>
      </BoxNoConversation>
    );
};
export const Chat = () => {
  return (
    <Root>
      <ChatDiscussion />
      <ChatBox />
    </Root>
  );
};

const Root = styled.div`
  margin: 1vw;
  display: flex;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;auto;
  height: 800px;
  border-radius: 20px:

`;
const BoxNoConversation = styled.div`
  display: grid;
  place-content: center;
  flex: 5;
`;
