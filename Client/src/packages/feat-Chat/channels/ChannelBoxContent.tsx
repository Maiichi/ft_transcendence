import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../core";
import { I_Message } from "../components/types";
import { getChatRoomMessages } from "./redux/roomThunk";
import { MessageBox } from "../components/MessageBox";
import styled from "styled-components";
import { isConnectedUser } from "../../../core/utils/helperFunctions";

export const ChannelBoxContent = () => {
  const { roomId } = useAppSelector((state) => state.chat.currentConversation);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const channelMessages: [] = useAppSelector(
    (state) => state.channels.messages
  );

  useEffect(() => {
    if (roomId) dispatch(getChatRoomMessages(roomId));
  }, []);

  return (
    <>
      <Wrapper>
        <ChatBoxTop>
          {channelMessages.length === 0 ? (
            <EmptyConversation>
              <h2>it's always better to start a conversation &#128516;</h2>
            </EmptyConversation>
          ) : (
            <>
              {channelMessages.map((item: I_Message) => (
                <MessageBox
                  own={isConnectedUser(item.sender.intraId, user.intraId)}
                  data={item}
                  key={item.id}
                />
              ))}
            </>
          )}
        </ChatBoxTop>
      </Wrapper>
      <ChatBoxBottom>
        <ChatMessageInput placeholder="Write your message ..." />
        <ChatSubmitButtom>Send</ChatSubmitButtom>
      </ChatBoxBottom>
    </>
  );
};
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

const EmptyConversation = styled.div`
  display: grid;
  place-items: center;
  /* display: flex; */
  /* justify-content: center; Horizontally center the content */
  /* align-items: center; Vertically center the content */
  height: 100%;
`;
