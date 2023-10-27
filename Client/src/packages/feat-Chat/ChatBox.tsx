import styled from "styled-components";
import { I_Discussion } from "./Types/types";
import { ChannelBox } from "./channels/chatBox/ChannelBox";
import { DirectBox } from "./directMessages/chatBox/DirectBox";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../core";
import { CoreState } from "../../core/CoreSlice";

export const ChatBox = () => {
  const { core, chat } = useAppSelector((state) => state);
  if (
    chat.currentConversation?.type === "direct" &&
    chat.currentConversation.direct &&
    core.isConversation
  ) {
    return <DirectBox directConversation={chat.currentConversation.direct} />;
  } else if (
    chat.currentConversation?.type === "channel" &&
    chat.currentConversation.room &&
    core.isConversation
  ) {
    return <ChannelBox />;
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
  flex: 5;
`;
