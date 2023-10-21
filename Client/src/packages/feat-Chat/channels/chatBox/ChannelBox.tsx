import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../core";
import { I_Message, I_Room } from "../../Types/types";
import { getChatRoomMessages } from "../redux/roomThunk";
import { ChannelBoxHeader } from "./headerBox/ChannelBoxHeader";
import { MessageBox } from "../../components/MessageBox";
import styled from "styled-components";

export const ChannelBox = (props: { channelConversation: I_Room }) => {
  // console.log(props.channelConversation.id);
  console.log("Channel Box rendring !");
  const { channelConversation } = props;
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth.user);
  const channelMessages: [] = useAppSelector(
    (state) => state.channels.messages,
  );

  const isConnectedUser = (intraId: number) => {
    if (auth.user.intraId === intraId) return true;
    return false;
  };
  useEffect(() => {
    if (channelConversation !== null)
      dispatch(getChatRoomMessages(channelConversation.id));
  }, [channelConversation]);

  return (
    <>
      <ChatBox>
        <Header>
          <ChannelBoxHeader channelConversation={channelConversation} />
        </Header>
        <Wrapper>
          <ChatBoxTop>
            {channelMessages.length === 0 ? (
              <EmptyConversation>
                <h2>it's always better to start a conversation &#128516;</h2>
              </EmptyConversation>
            ) : (
              <>
                {channelMessages.map((item: I_Message) => (
                  <>
                    <MessageBox
                      own={isConnectedUser(item.sender.intraId)}
                      data={item}
                      key={item.id}
                    />
                  </>
                ))}
              </>
            )}
          </ChatBoxTop>
        </Wrapper>
        <ChatBoxBottom>
          <ChatMessageInput placeholder="Write your message ..." />
          <ChatSubmitButtom>Send</ChatSubmitButtom>
        </ChatBoxBottom>
      </ChatBox>
      {/* need an improvement */}
      <RightSide> USERS </RightSide>
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

const EmptyConversation = styled.div`
  display: grid;
  place-items: center;
  /* display: flex; */
  /* justify-content: center; Horizontally center the content */
  /* align-items: center; Vertically center the content */
  height: 100%;
`;

const RightSide = styled.div`
  flex: 2;
  height: 100%;
  /* border-radius: 20px; */
  border-left: 1px solid #d7d7d7;
`;
