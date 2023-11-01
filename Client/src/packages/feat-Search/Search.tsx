import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import styled from "styled-components";
import {
  ModalComponent,
  SearchComponent,
  useAppDispatch,
  useAppSelector,
} from "../../core";
import { useEffect, useState } from "react";
import { getAllRooms } from "./redux/searchThunk";
import { I_Room_Search } from "./types/types";
import { joinRoom } from "./redux/searchSlice";
import { getMemberships } from "../feat-Chat/channels/redux/roomThunk";
import { useNavigate } from "react-router-dom";
import { JoinChannelModal } from "./modal/joinChannelModal";
import { setCurrentConversation } from "../feat-Chat/chatSlice";

export const Search = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const rooms: [] = useAppSelector((state) => state.search.rooms);
  const user = useAppSelector((state) => state.auth.user);

  const handleClickSearch = (str: string) => {
    setSearchQuery(str);
  };

  useEffect(() => {
    dispatch(getMemberships());
    dispatch(getAllRooms());
  }, []);

  const handleJoinRoom = (rooms: I_Room_Search) => {
    const roomInfo = {
      id: rooms.id,
      password: rooms.password,
    };
    dispatch(joinRoom(roomInfo));
  };

  // Filter chat rooms based on the search query
  const filteredRooms: I_Room_Search[] = rooms.filter((item: any) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const ButtonRoom = ({
    room,
    userId,
  }: {
    room: I_Room_Search;
    userId: number;
  }) => {
    const [open, setOpen] = useState(false);
    const [closeType, setCloseType] = useState<"auto" | "click" | undefined>(
      undefined,
    );

    const [ChildModal, setChildModal] = useState<JSX.Element>(<></>);

    const handleClickModal = (
      childModal: JSX.Element,
      closeType?: "auto" | "click",
    ) => {
      setCloseType(closeType);
      setOpen(true);
      setChildModal(childModal);
    };
    const handleClose = () => {
      setOpen(false);
    };
    var title = isUserInRoom(room, userId) ? "ACCESS" : "JOIN";

    const handleCLick = () => {
      if (title == 'ACCESS') 
        navigate("/chat");
      else if (room.type === "protected")
        handleClickModal(
          <JoinChannelModal roomId={room.id} handleClose={handleClose} />,
        );
      else handleJoinRoom(room);
    };
    return (
      <>
        <ModalComponent
          open={open}
          ChildComponent={ChildModal}
          handleClose={handleClose}
          closeType={closeType}
        />
        <Button
          variant="contained"
          style={{ backgroundColor: "#5e35b1d9" }}
          onClick={handleCLick}
        >
          {title}
        </Button>
      </>
    );
  };


  // check if the user is a member or not to display the button based on the membership
  const isUserInRoom = (roomS: I_Room_Search, userID: number) => {
    return roomS.members.find((item) => item.user.intraId == userID);
  };

  // console.log("rooms length==", rooms.length);
  return (
    <Root>
      <Holder>
        <SearchBar>
          <SearchComponent onInputUpdate={handleClickSearch} />
          {/* <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            style = {{width: '100%', color: 'grey', borderColor: 'red'}}
            InputProps={{
                style: {
                    color: "black"
                }
            }}
            InputLabelProps={{
              style: { color: "black" },
            }}
            FormHelperTextProps={{
              style: {
                color: 'red'
              }
            }}
            // onChange={}
          /> */}
        </SearchBar>
        <Select name="Channels">
          <option value="channels">channels</option>
          <option value="users">users</option>
        </Select>
      </Holder>
      <ListHolder>
        {filteredRooms.length !== 0 ? (
          filteredRooms.map((room: I_Room_Search) => (
            <Channel key={room.id}>
              <ButtonNameHolder>
                <div
                  style={
                    {
                      // display: 'flex',
                      // flexDirection: 'column',
                      // alignItem: 'center'
                    }
                  }
                >
                  <ChannelName>{room.name}</ChannelName>
                  <ChannelType>{room.type}</ChannelType>
                </div>
                <ButtonRoom room={room} userId={user.intraId} />
              </ButtonNameHolder>
              <AvatarGroup max={4} style={{ justifyContent: "flex-end" }}>
                {room.members.map((member: any) => (
                  <Avatar
                    key={member.user.intraId}
                    alt="user"
                    src={
                      member.user.avatar_url
                        ? require(
                            `/app/images_uploads/${member.user.avatar_url}`,
                          )
                        : ""
                    }
                  />
                ))}
              </AvatarGroup>
            </Channel>
          ))
        ) : (
          <div>No Room available</div>
        )}
      </ListHolder>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  // width : 32%;
  margin: auto;
  // border: 1px solid;
  @media (max-width: 426px) {
    margin: 0;
    width: 100%;
  }
  overflow: hidden;
  height: 800px;
  @media (max-height: 700px) {
    height: 560px;
  }
`;

const Holder = styled.div`
  display: flex;
  width: 40%;
  margin: auto;
  gap: 0.5em;
  align-items: center;
  justify-content: center;
  @media (max-width: 426px) {
    flex-direction: column;
  }
`;

const SearchBar = styled.div`
  width: 80%;
  height: 50px;
  padding: 10px;
  border-radius: 5px;
  position: relative;
`;

const Select = styled.select`
  width: 20%;
  height: 60%;
  border-radius: 5px;
`;

const ListHolder = styled.div`
  display: grid;
  // flex-direction: column;
  margin-top: 10px;
  gap: 0.5rem;
  height: 80%;
  align-content: baseline;
  align-items: center;
  grid-template-columns: repeat(auto-fit, 300px);
  justify-content: center;
  gap: 20px 10px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 90%;
`;

const UserList = styled.div``;

const Channel = styled.div`
  display: flex;
  width: 90%;
  padding: 0px 5px 5px 5px;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 0.375rem;
  border-width: 2px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  max-width: 500px;
  border: 0.5px solid #8e00a1;
`;

const ChannelName = styled.p`
  justify-items: center;
`;

const ButtonNameHolder = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  @media (max-width: 426px) {
    flex-direction: column;
    align-items: inherit;
  }
`;

const ChannelMembersNumber = styled.div``;

const ChannelMembers = styled.div``;

const JoinButton = styled.button`
  height: 30px;
  width: 60px;
  border-radius: 5px;
`;

const ChannelType = styled.div``;
