import styled from "styled-components";
import { I_Discussion } from "./Types/types";
import { ChannelBox } from "./channels/chatBox/ChannelBox";
import { DirectBox } from "./directMessages/chatBox/DirectBox";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../core";
import { CoreState } from "../../core/CoreSlice";

interface ChatBoxProps {
    conversation: I_Discussion | null;
  }
export const ChatBox: React.FC<ChatBoxProps> = ({ conversation }) => {
    console.log("ChatBox Rendring !");
    const state: CoreState = useAppSelector((state) => state.core);
    useEffect(() => {

    },[state.isConversation]);
    if (conversation?.type === "direct" && conversation.direct) {
      return <DirectBox directConversation={conversation.direct} />;
    } else if (conversation?.type === "channel" && conversation.room) {
      return <ChannelBox channelConversation={conversation.room} />;
    } else
      return (
        <BoxNoConversation>
          <h1> Click on a conversation to start chatting. </h1>
        </BoxNoConversation>
      );
};

const BoxNoConversation = styled.div`
  display: grid;
  place-content: center;

`;