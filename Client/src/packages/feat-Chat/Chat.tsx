import styled from "styled-components";
import { ChatDiscussion } from "./components/ChatDiscussion";
import { ChannelBox } from "./channels/ChannelBox";
import { DirectBox } from "./directMessages/DirectBox";
import { useAppSelector } from "../../core";
import { UserActions } from "./components/UserActions";
import { useSize } from "../../core/utils/hooks";

const ChatBox = () => {
  const { chat } = useAppSelector((state) => state);

  if (chat.currentConversation?.type === "direct") {
    return <DirectBox />;
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
  const { displayUserActions } = useAppSelector((state) => state.core);
  const { discussionsDisplay } = useAppSelector((state) => state.chat);
  const { isMobile } = useSize();
  return (
    <Root>
      {((isMobile && discussionsDisplay) || !isMobile) && <ChatDiscussion />}
      {((isMobile && !discussionsDisplay) || !isMobile) && <ChatBox />}

      {!isMobile && displayUserActions && <UserActions />}
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin: Opx 1Opx;
  height: 100%;
`;
const BoxNoConversation = styled.div`
  display: grid;
  place-content: center;
  flex: 5;
  border-left: 1px solid rgb(215, 215, 215);
`;
