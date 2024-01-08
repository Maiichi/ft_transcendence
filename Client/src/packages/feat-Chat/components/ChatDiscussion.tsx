import { useEffect, useState } from "react";
import {
  ModalComponent,
  SearchComponent,
  useAppDispatch,
  useAppSelector,
} from "../../../core";
import styled from "styled-components";

import { Badge } from "@mui/material";
import { convertDateTime, changeMessageLength } from "./utils";
import { I_DirectConversation, I_Room } from "./types";

import { CreateChannelModal } from "./modals/CreateChannelModal";
import { getMemberships } from "./redux/roomThunk";
import { getDirectConversations } from "./redux/directMessageThunk";
import { Add } from "@mui/icons-material";
import { NewDirectMessage } from "./modals/CreateDirectMessageModal";
import {
  setCurrentConversation,
  setDiscussionsDisplay,
  setSelectedUser,
} from "./redux/chatSlice";
import { setDisplayUserActions } from "../../../core/CoreSlice";
import { NotFound } from "./style";
export const ChatDiscussion = () => {
  const dispatch = useAppDispatch();

  const channels = useAppSelector((state) => state.channels);
  const directMessage = useAppSelector((state) => state.directMessage);
  const chat = useAppSelector((state) => state.chat);
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
    dispatch(setDiscussionsDisplay(false));
    dispatch(
      setCurrentConversation({
        roomId: type == "channel" ? data.id : null,
        directConversationId: type == "direct" ? data.id : null,
        type: type,
      })
    );
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
          {filteredRooms.length != 0 ? (
            filteredRooms.map((item: I_Room) => (
              <ChannelName
                key={item.id}
                className={`channel-name ${
                  chat.currentConversation?.roomId === item.id ? "selected" : ""
                }`}
                onClick={() => {
                  dispatch(setDisplayUserActions(false));
                  handleCLick("channel", item);
                }}
              >
                # {item.name}
              </ChannelName>
            ))
          ) : channels.memberships != 0 ? (
            <NotFound>Channel name is not found</NotFound>
          ) : (
            <NotFound>You should join or create a new room</NotFound>
          )}
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
                <NewDirectMessage
                  handleClose={handleClose}
                  selectedUser={null}
                />,
                "auto"
              )
            }
          />
        </Tab>
        <DirectMessageListHolder>
          {filteredConversations.length != 0 ? (
            filteredConversations.map((discussion: any) => (
              <Discussion
                key={discussion.id}
                selected={
                  chat.currentConversation?.directConversationId ===
                  discussion.id
                }
                onClick={() => {
                  dispatch(setSelectedUser(discussion.receiver));
                  dispatch(setDisplayUserActions(true));
                  handleCLick("direct", discussion);
                }}
              >
                <Badge
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  color={
                    discussion.receiver.status === "ONLINE"
                      ? "success"
                      : "error"
                  }
                  overlap="circular"
                  variant="dot"
                >
                  <AvatarImage
                    src={`${discussion.receiver.avatar_url}`}
                    alt=""
                  />
                </Badge>
                <ContactDescription>
                  <DiscussionName>
                    {discussion.receiver.firstName}{" "}
                    {discussion.receiver.lastName}
                  </DiscussionName>
                  <DiscussionMessage>
                    {changeMessageLength(discussion.lastMessage.content)}
                  </DiscussionMessage>
                </ContactDescription>
                <p style={{ fontSize: 13 }}>
                  {convertDateTime(discussion.lastMessage.createdAt)}
                </p>
              </Discussion>
            ))
          ) : directMessage.conversations != 0 ? (
            <NotFound>Username is not found</NotFound>
          ) : (
            <NotFound>You should start new conversation</NotFound>
          )}
        </DirectMessageListHolder>
      </Discussions>
    </>
  );
};

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
  padding: 5px;
  width: 220px;
  @media (max-width: 425px) {
    width: 100%;
  }
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
