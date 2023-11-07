import { ChannelBoxHeader } from "./ChannelBoxHeader";
import styled from "styled-components";

import { ChannelInformation } from "./ChannelInformation";
import { ChannelBoxContent } from "./ChannelBoxContent";

export const ChannelBox = () => {
  return (
    <>
      <ChatBox>
        <ChannelBoxHeader />
        <ChannelBoxContent />
      </ChatBox>
      <ChannelInformation />
    </>
  );
};

const ChatBox = styled.div`
  flex: 5.5;
  height: 100%;
`;
