import { useEffect, useState } from "react";
import {
  ModalComponent,
  SearchComponent,
  useAppDispatch,
  useAppSelector,
} from "../../core";
import styled from "styled-components";
// import "./chat.css";

import { Alert, Badge, Snackbar } from "@mui/material";
import { convertDateTime, changeMessageLength } from "./Utils/utils";
import { I_DirectConversation, I_Discussion, I_Room } from "./Types/types";
import { ChatBox } from "./ChatBox";
import { CreateChannelModal } from "./channels/modals/CreateChannelModal";
import { getMemberships } from "./channels/redux/roomThunk";
import { getDirectConversations } from "./directMessages/redux/directMessageThunk";
import { setIsConversation } from "../../core/CoreSlice";
import { Add } from "@mui/icons-material";
import { NewDirectMessage } from "./channels/modals/CreateDirectMessageModal";
import { setCurrentConversation } from "./chatSlice";
const ChatDiscussion = () => {
  const dispatch = useAppDispatch();
  const { channels, directMessage, filter, chat } = useAppSelector(
    (state) => state
  );
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [closeType, setCloseType] = useState<"auto" | "click" | undefined>(
    undefined
  );
  const [ChildModal, setChildModal] = useState<JSX.Element>(<></>);
  const handleClickModal = (
    childModal: JSX.Element,
    closeType?: "auto" | "click"
  ) => {
    setCloseType(closeType);
    setOpen(true);
    setChildModal(childModal);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getMemberships());
    dispatch(getDirectConversations());
  }, []);
  const filteredRooms = channels.memberships.filter((item: I_Room) =>
    item.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );
  const filteredConversations = directMessage.conversations.filter(
    (discussion: any) =>
      discussion.receiver.firstName
        .toLowerCase()
        .startsWith(searchQuery.toLowerCase())
  );
  const handleCLick = (
    type: "direct" | "channel",
    data: I_DirectConversation | I_Room
  ) => {
    dispatch(
      setCurrentConversation({
        room: type == "channel" ? (data as I_Room) : null,
        direct: type == "direct" ? (data as I_DirectConversation) : null,
        type: type,
      })
    );

    dispatch(setIsConversation(true));
  };

  const handleClickSearch = (str: string) => {
    setSearchQuery(str);
  };

  return (
    <>
      <ModalComponent
        open={open}
        ChildComponent={ChildModal}
        handleClose={handleClose}
        closeType={closeType}
      />
      <Discussions>
        <TextMessage>Discussions</TextMessage>
        <SearchComponent onInputUpdate={handleClickSearch} />
        <Tab>
          <p>Channels</p>
          <Add
            sx={{
              cursor: "pointer",
              "&:hover": { backgroundColor: "rgb(245, 246, 247)" },
            }}
            onClick={() =>
              handleClickModal(<CreateChannelModal handleClose={handleClose} />)
            }
          />
        </Tab>
        <ChannelListHolder>
          {filteredRooms.map((item: I_Room) => (
            <ChannelName
              key={item.id}
              className={`channel-name ${
                chat.currentConversation?.room === item ? "selected" : ""
              }`}
              onClick={() => handleCLick("channel", item)}
            >
              # {item.name}
            </ChannelName>
          ))}
        </ChannelListHolder>
        <Tab>
          <p>Direct Messages</p>
          <Add
            sx={{
              cursor: "pointer",
              "&:hover": { backgroundColor: "rgb(245, 246, 247)" },
            }}
            onClick={() =>
              handleClickModal(
                <NewDirectMessage handleClose={handleClose} />,
                "auto"
              )
            }
          />
        </Tab>
        <DirectMessageListHolder>
          {filteredConversations.map((discussion: any) => (
            <Discussion
              key={discussion.id}
              selected={chat.currentConversation?.direct === discussion.id}
              onClick={() => handleCLick("direct", discussion)}
            >
              <Badge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                color={
                  discussion.receiver.status === "ONLINE" ? "success" : "error"
                }
                overlap="circular"
                variant="dot"
              >
                {discussion.receiver.avatar_url !== null ? (
                  <AvatarImage
                    src={require(`/app/images_uploads/${discussion.receiver.avatar_url}`)}
                    alt=""
                  />
                ) : (
                  <AvatarImage src="" alt="" />
                )}
              </Badge>
              <ContactDescription>
                <DiscussionName>
                  {discussion.receiver.firstName} {discussion.receiver.lastName}
                </DiscussionName>
                <DiscussionMessage>
                  {changeMessageLength(discussion.lastMessage.content)}
                </DiscussionMessage>
              </ContactDescription>
              <p style={{ fontSize: 13 }}>
                {convertDateTime(discussion.lastMessage.createdAt)}
              </p>
            </Discussion>
          ))}
        </DirectMessageListHolder>
      </Discussions>
    </>
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
  // padding: 0;
  // margin: 5px;
  height: 800px;
  border-radius: 20px:

`;
const Tab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(94, 53, 177);
  margin: 0px 10px 0px 10px;
  font-weight: 900;
`;

const Discussions = styled.div`
  overflow: hidden;
  /* display: inline-block; */
  padding: 5px;
  border-right: 1px solid #d7d7d7;
`;

const Discussion = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 10px 0px;
  &:hover {
    cursor: pointer;
    background-color: #f5f6f7;
  }
  ${(props) =>
    props.selected &&
    `
    /* Add styles for the selected state */
    background-color: #f5f6f7;
  `}
`;

const TextMessage = styled.p`
  margin: 10px; /* Remove default margin for <p> tag */
  font-size: 40px;
`;

const ChannelListHolder = styled.div`
  padding: 0px 15px;
  overflow-y: scroll;
  max-height: 35%;
`;

const DirectMessageListHolder = styled.div`
  overflow-y: scroll;
  padding: "0px 15px";
  max-height: 35%;
`;

const ChannelName = styled.h4`
  margin: 0px 0px 10px 0px;
  cursor: pointer;
  &:hover {
    background-color: #f5f6f7;
  }
`;

const AvatarImage = styled.img`
  width: 45px;
  height: 45px;
`;

const ContactDescription = styled.div`
  max-width: 70%;
`;

const DiscussionName = styled.div`
  margin: 0 0 0 20px;
  font-family: "Montserrat", sans-serif;
  font-size: 11pt;
  color: #515151;
`;

const DiscussionMessage = styled.div`
  margin: 6px 0 0 20px;
  font-family: "Montserrat", sans-serif;
  font-size: 9pt;
  color: #515151;
`;
