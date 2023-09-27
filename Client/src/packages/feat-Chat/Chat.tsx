import { useEffect, useState } from "react";
import { SearchComponent, useAppDispatch, useAppSelector } from "../../core";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import Picture from "./Picture.png";
import "./chat.css";
import { ChatUsers } from "./chatUsers/ChatUsers";
import { Badge } from "@mui/material";
import { CreateChannelModal } from "./ChannelModal/CreateChannelModal";
import { getMemberships } from "./components/rooms/roomThunk";
import { getDirectConversations } from "./components/directMessage/directMessageThunk";
import { ChatBox } from "./chatBox/ChatBox";
import { convertDateTime, changeMessageLength } from "./Utils/utils";
import { setIsConversation } from "./components/rooms/roomSlice";
import { I_Discussion } from "./Types/types";

export const Chat = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const memberships = useAppSelector((state) => state.channels.memberships);
  const conversations: [] = useAppSelector(
    (state) => state.directMessage.conversations
  );
  const displayConversation: boolean = useAppSelector(
    (state) => state.channels.isConversation
  );
  const searchQuery = useAppSelector((state) => state.filter.searchQuery);
  const [directConversation, setDirectConversation] = useState(null);
  const [channelConversation, setChannelConversation] = useState(null);
  const [conversation, setConversation] = useState<I_Discussion | null>(null);

  useEffect(
    () => {
      dispatch(getMemberships(token));
      dispatch(getDirectConversations(token));
    },
    [
      // dispatch,
      // token,
      // directConversation,
      // channelConversation,
      // displayConversation,
    ]
  );

  // Filter chat rooms based on the search query
  const filteredRooms = memberships.filter((item: any) =>
    item.room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter conversations based on the search query
  const filteredConversations = conversations.filter((discussion: any) =>
    discussion.participants[0].firstName
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // const isConnected = useAppSelector((state) => state.socket.isConnected);
  // const message = useAppSelector((state) => state.socket.message);
  return (
    <Root>
      <div className="discussions">
        <p className="messages-text">Discussions</p>
        <SearchComponent onInputUpdate={searchQuery} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "rgb(94, 53, 177)",
            margin: "0px 10px 0px 10px",
            fontWeight: "900",
          }}
        >
          <p>Channels</p>
          <CreateChannelModal />
        </div>
        <div className="channelListHolder">
          {filteredRooms.map((item: any) => (
            <h4
              key={item.room.id}
              className={`channel-name ${
                channelConversation === item.id ? "selected" : ""
              }`}
              onClick={() => {
                setChannelConversation(item.room);
                // setConversation({
                //   data: item.room,
                //   type: "channel",
                // });
                setDirectConversation(null);
                dispatch(setIsConversation(true));
              }}
            >
              # {item.room.name}
            </h4>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "rgb(94, 53, 177)",
            margin: "0px 10px 0px 10px",
            fontWeight: "900",
          }}
        >
          <p>Direct Messages</p>
          <div>
            <AddIcon style={{ padding: "5px" }} />
          </div>
        </div>
        <div className="DirectMessageListHolder">
          {filteredConversations.map((discussion: any) => (
            <div
              key={discussion.id}
              className={`discussion ${
                directConversation === discussion.id ? "selected" : ""
              }`}
              onClick={() => {
                setDirectConversation(discussion);
                // setConversation({
                //   data: discussion,
                //   type: "direct",
                // });
                setChannelConversation(null);
                dispatch(setIsConversation(true));
              }} // Update the selected conversation on click
            >
              <Badge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                color={
                  discussion.participants[0].status === "ONLINE"
                    ? "success"
                    : "error"
                }
                overlap="circular"
                variant="dot"
              >
                <img className="photo" src={Picture} alt="" />
              </Badge>

              <div className="desc-contact">
                <p className="name">
                  {discussion.participants[0].firstName}{" "}
                  {discussion.participants[0].lastName}
                </p>
                <p className="message">
                  {changeMessageLength(discussion.messages[0].content)}
                </p>
              </div>
              <p style={{ fontSize: 13 }}>
                {convertDateTime(discussion.messages[0].createdAt)}
              </p>
            </div>
          ))}
        </div>
      </div>
      {displayConversation === false ? (
        <div className="chatBoxNoConversation">
          <h1> Click on a conversation to start chatting. </h1>
        </div>
      ) : (
        <>
          <ChatBox
            channelConversation={channelConversation}
            conversation={conversation}
            directConversation={directConversation}
          />
          <ChatUsers
            channelConversation={channelConversation}
            directConversation={directConversation}
          />
        </>
      )}
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
  height: 900px;
  border-radius: 20px:

`;

// const boxStyle = {
//   position: "absolute" as "absolute",
//   top: "30%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "1px solid #000",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: "20px",
//   height: "400px",
// };
