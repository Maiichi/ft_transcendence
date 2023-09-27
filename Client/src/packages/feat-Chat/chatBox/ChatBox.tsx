import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../../core";
import { ChannelSettingModal } from "../ChannelModal/ChannelSettingModal";
import { Message } from "./message/Message";
import "./chatBox.css";
import { getChatRoomMessages } from "../components/rooms/roomThunk";
import { useEffect, useState } from "react";
import {
  I_ConversationMessages,
  I_DirectConversation,
  I_Discussion,
  I_Message,
  I_Room,
} from "../Types/types";
import {
  DriveFileRenameOutlineTwoTone,
  PersonOffTwoTone,
  VideogameAssetTwoTone,
} from "@mui/icons-material";
import { getDirectConversationMessages } from "../components/directMessage/directMessageThunk";
import { S_DirectMessages } from "../components/directMessage/directMessageSlice";
import { Box, Modal } from "@mui/material";
import {
  Person,
  LogoutRounded,
  PersonAddAltRounded,
} from "@mui/icons-material";
interface Props {
  directConversation: I_DirectConversation | null;
  conversation: I_Discussion | null;
  channelConversation: I_Room | null;
}
interface ChatBoxProps {
  conversation: I_Discussion | null;
}
export const ChatBox: React.FC<ChatBoxProps> = ({ conversation }) => {
  if (conversation?.type === "direct" && conversation.direct) {
    return <DirectBox directConversation={conversation.direct} />;
  } else if (conversation?.type === "channel" && conversation.room) {
    return <ChannelBox channelConversation={conversation.room} />;
  } else
    return (
      <div className="chatBoxNoConversation">
        <h1> Click on a conversation to start chatting. </h1>
      </div>
    );
};

const DirectBox = (props: { directConversation: I_DirectConversation }) => {
  const { directConversation } = props;
  console.log(props.directConversation.id);

  const dispatch = useDispatch<AppDispatch>();
  const state: S_DirectMessages = useAppSelector(
    (state) => state.directMessage
  );
  useEffect(() => {
    // check if directConversation.id is not exist in the state
    dispatch(getDirectConversationMessages(directConversation.id));
  }, []);
  return (
    <>
      <div className="chatBoxHeader">
        <h4>{directConversation?.receiver?.userName}</h4>
      </div>
      {/* <MessageBox conversation={state.conversationsContent} /> */}
      <>
        <div className="onlineUsersHeader">
          <h3 className="onlineUsersTop">Room Users</h3>
        </div>
        <div className="onlineUsers">
          <div className="onlineUserImgContainer">
            <img
              className="onlineUserImg"
              src="https://media.istockphoto.com/id/1294780139/photo/close-up-portrait-of-smiling-man-with-eyeglasses-in-blue-shirt-3d-illustration-of-cartoon.jpg?s=1024x1024&w=is&k=20&c=6ENyB-NdL-HZJOtV6Jp8SD8TRx9w_KLswfIH9s6uGUs="
              alt=""
            />
            <div className="onlineUsersBadge"></div>
          </div>
          <p className="onlineUsersName">'test'</p>
          <div className="iconHolder">
            <div className="iconSVG" data-description="Invite to game">
              <VideogameAssetTwoTone />
            </div>
            <div className="iconSVG" data-description="Send a message">
              <DriveFileRenameOutlineTwoTone />
            </div>
            <div className="iconSVG" data-description="Block user">
              <PersonOffTwoTone />
            </div>
          </div>
        </div>
      </>
    </>
  );
};

const ChannelBox = (props: { channelConversation: I_Room }) => {
  console.log(props.channelConversation.id);
  const { channelConversation } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [openLeaveModal, setOpenLeaveModal] = useState(false);
  const handleClose = () => {
    setOpen(!open);
  };
  const roomMessages: [] = useAppSelector((state) => state.channels.messages);

  const handleCloseLeaveRoomModal = () => {
    setOpenLeaveModal(!openLeaveModal);
  };

  const handleLeaveRoom = () => {
    setOpenLeaveModal(false);
  };
  const state: S_DirectMessages = useAppSelector(
    (state) => state.directMessage
  );
  const account = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (channelConversation !== null)
      dispatch(getChatRoomMessages(channelConversation.id));
  }, []);
  return (
    <>
      <>
        <h4># {channelConversation.name} </h4>
        <div className="icons-holder">
          <div className="channel-members" onClick={() => setOpen(true)}>
            <Person /> {channelConversation.members.length}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-search-invite-users-to-room"
              aria-describedby="modal-description"
            >
              <Box sx={boxStyle}>
                <div className="modalHeader">
                  <h2>Users</h2>
                  <button
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    X
                  </button>
                  {/* <Close className={"close-button"} style={{cursor: 'pointer'}} onClick={() => setOpen(false)} /> */}
                </div>
                <div
                  style={{
                    overflow: "hidden",
                    maxHeight: "400px",
                  }}
                >
                  <div className="modal-search">
                    {/* <SearchComponent /> */}
                  </div>
                  <div
                    className="modal-invite-user"
                    // onClick={() => setOpenInviteModal(true)}
                  >
                    <PersonAddAltRounded fontSize="large" />
                    <h4 style={{ marginLeft: "10px" }}>Invite user</h4>
                    {/* <Modal open = {openInviteModal} onClose={() => {setOpenInviteModal(false)}} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" > <Box sx={boxStyle}> hello <button onClick={() => {setOpenInviteModal(false)}} >X</button> </Box> </Modal> */}
                  </div>
                  <div className="modal-users">
                    {channelConversation.members.map((user) => (
                      <p className="user-element">{user.user.userName}</p>
                    ))}
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
          <LogoutRounded
            onClick={() => setOpenLeaveModal(true)}
            style={{ cursor: "pointer" }}
          />
          <Modal
            open={openLeaveModal}
            onClose={handleCloseLeaveRoomModal}
            aria-labelledby="modal-search-invite-users-to-room"
            aria-describedby="modal-description"
          >
            <Box sx={boxStyle}>
              <div className="modalHeader">
                <h3>you want to leave #{channelConversation.name} ?</h3>
                {/* <Close className={"close-button"} style={{cursor: 'pointer'}} onClick={() => setOpen(false)} /> */}
              </div>
              <div className="modalFooter">
                <button
                  className="button-cancel"
                  onClick={() => setOpenLeaveModal(false)}
                >
                  Cancel
                </button>
                <button className="button-leave" onClick={handleLeaveRoom}>
                  {" "}
                  Confirm{" "}
                </button>
              </div>
            </Box>
          </Modal>
        </div>
      </>
      {/* {!channelConversation && roomMessages.length === 0 ? (
        <div className="empty-conversation">
          <h2>it's always better to start a conversation &#128516;</h2>
        </div>
      ) : (
        <MessageBox conversation={state.conversationsContent} />
      )} */}
      <>
        <div className="onlineUsersHeader">
          <h3 className="onlineUsersTop">Room Users</h3>
        </div>
        <div className="onlineUsers">
          <div className="onlineUserImgContainer">
            <img
              className="onlineUserImg"
              src="https://media.istockphoto.com/id/1294780139/photo/close-up-portrait-of-smiling-man-with-eyeglasses-in-blue-shirt-3d-illustration-of-cartoon.jpg?s=1024x1024&w=is&k=20&c=6ENyB-NdL-HZJOtV6Jp8SD8TRx9w_KLswfIH9s6uGUs="
              alt=""
            />
            <div className="onlineUsersBadge"></div>
          </div>
          <p className="onlineUsersName">{account.userName}</p>
          <div className="iconHolder">
            <div className="iconSVG" data-description="Invite to game">
              <VideogameAssetTwoTone></VideogameAssetTwoTone>
            </div>
            <div className="iconSVG" data-description="Send a message">
              <DriveFileRenameOutlineTwoTone></DriveFileRenameOutlineTwoTone>
            </div>
            <div className="iconSVG" data-description="Block user">
              <PersonOffTwoTone></PersonOffTwoTone>
            </div>
          </div>
        </div>
      </>
    </>
  );
};
const MessageBox = (conversation: I_ConversationMessages) => {
  const account = useAppSelector((state) => state.auth.user);
  const isConnectedUser = (intraId: number) => {
    if (account.intraId === intraId) return true;
    return false;
  };
  return (
    <div className="chatBox">
      <div className="chatBoxWrapper">
        <div className="chatBoxTop">
          {conversation.messages.map((item: I_Message) => (
            <Message own={isConnectedUser(item.sender.intraId)} data={item} />
          ))}
        </div>
      </div>
      <div className="chatBoxBottom">
        <textarea
          className="chatMessageInput"
          placeholder="Write your message ..."
        ></textarea>
        <button className="chatSubmitButtom">Send</button>
      </div>
    </div>
  );
};
const boxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
  overflow: "hidden",
};
export const ChatBoxte: React.FC<Props> = ({
  directConversation,
  channelConversation,
  conversation,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const account = useAppSelector((state) => state.auth.user);
  const roomMessages: [] = useAppSelector((state) => state.channels.messages);

  useEffect(() => {
    if (channelConversation !== null)
      dispatch(getChatRoomMessages(channelConversation.id));
  }, []);

  const isConnectedUser = (intraId: number) => {
    if (account.intraId === intraId) return true;
    return false;
  };

  return (
    <>
      {channelConversation === null && directConversation ? (
        <div className="chatBox">
          <div className="chatBoxHeader">
            <ChannelSettingModal
              channelConversation={channelConversation}
              directConversation={directConversation}
            />
          </div>
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              {[1, 2].map((item: any) => (
                <Message
                  own={isConnectedUser(item.sender.intraId)}
                  data={item}
                />
              ))}
            </div>
          </div>
          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput"
              placeholder="Write your message ..."
            ></textarea>
            <button className="chatSubmitButtom">Send</button>
          </div>
        </div>
      ) : (
        <>
          <div className="chatBox">
            <div className="chatBoxHeader">
              <ChannelSettingModal
                channelConversation={channelConversation}
                directConversation={directConversation}
              />
            </div>
            <div className="chatBoxWrapper">
              <div className="chatBoxTop">
                {!channelConversation && roomMessages.length === 0 ? (
                  <div className="empty-conversation">
                    <h2>
                      it's always better to start a conversation &#128516;
                    </h2>
                  </div>
                ) : (
                  <>
                    {roomMessages.map((item: any) => (
                      <>
                        <Message
                          own={isConnectedUser(item.sender.intraId)}
                          data={item}
                        />
                      </>
                    ))}
                  </>
                )}
              </div>
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="Write your message ..."
              ></textarea>
              <button className="chatSubmitButtom">Send</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
