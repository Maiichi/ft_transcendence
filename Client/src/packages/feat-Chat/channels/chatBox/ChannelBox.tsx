import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../core";
import { I_Message, I_Room } from "../../Types/types";
import { getChatRoomMessages } from "../redux/roomThunk";
import { ChannelBoxHeader } from "./headerBox/ChannelBoxHeader";
import { MessageBox } from "../../components/MessageBox";
import styled from "styled-components";
import { isConnectedUser } from "../../../../core/utils/helperFunctions";
import {
  MoreHoriz,
  MoreHorizOutlined,
  PersonAddAltRounded,
  Settings,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";

const ChannelUsers = () => {
  const { room } = useAppSelector((state) => state.chat.currentConversation);

  return (
    <RightSide>
      <ChannelNameHolder>
        <ChannelName>{room.name}</ChannelName>
        {room.description}
        <ChannelSettingIcons>
          <Settings />
          <PersonAddAltRounded />
          <Settings />
        </ChannelSettingIcons>
      </ChannelNameHolder>
      <div>
        Owner:
        {[1, 2, 3, 4].map((item) => (
          <OwnerDiv>
            <Owner>
              <Avatar></Avatar>
              Name
            </Owner>
            <MoreHorizOutlined></MoreHorizOutlined>
          </OwnerDiv>
        ))}
        <Admins>admin</Admins>
        <Members>member</Members>
      </div>
    </RightSide>
  );
};

const ChannelBoxContent = () => {
  const { room } = useAppSelector((state) => state.chat.currentConversation);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const channelMessages: [] = useAppSelector(
    (state) => state.channels.messages
  );

  useEffect(() => {
    if (room) dispatch(getChatRoomMessages(room.id));
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
export const ChannelBox = () => {
  return (
    <>
      <ChatBox>
        <ChannelBoxHeader />
        <ChannelBoxContent />
      </ChatBox>
      <ChannelUsers />
    </>
  );
};

const ChatBox = styled.div`
  flex: 5.5;
  height: 100%;
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

/** CHANNEL USERS **/

const ChannelNameHolder = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 0.5px solid #d7d7d7;
`;

const ChannelName = styled.h2`
  text-align: center;
`;

const ChannelSettingIcons = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
`;

const Owner = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Admins = styled.div`
  background-color: blue;
`;

const Members = styled.div`
  background-color: grey;
`;

const OwnerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: rgb(245, 246, 247);
  }
  padding: 5px;
`;
