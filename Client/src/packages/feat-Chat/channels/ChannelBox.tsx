import { ChannelBoxHeader } from "./ChannelBoxHeader";
import styled from "styled-components";

import { ChannelBoxContent } from "./ChannelBoxContent";

export const ChannelBox = () => {
  return (
    <>
      <ChatBox>
        <ChannelBoxHeader />
        <ChannelBoxContent />
      </ChatBox>
    </>
  );
};

const ChatBox = styled.div`
  flex: 5.5;
  height: 100%;
  border-left: 1px solid rgb(215, 215, 215);
`;
