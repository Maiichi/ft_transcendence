import {
  Avatar,
  AvatarGroup,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Select,
} from "@mui/material";
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
import { getMemberships } from "../feat-Chat/components/redux/roomThunk";
import { useNavigate } from "react-router-dom";
import { JoinChannelModal } from "./modal/joinChannelModal";

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
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
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
    var title = isUserInRoom(room, userId) ? "ACCESS" : "JOIN";

    const handleCLick = () => {
      if (title == "ACCESS") navigate("/chat");
      else if (room.type === "protected")
        handleClickModal(
          <JoinChannelModal roomId={room.id} handleClose={handleClose} />
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

  /** show list slected */
  const [selectedList, setSelected] = useState<"channels" | "users" | null>(
    null
  );
  const handleSelectChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as "users" | "channels" | "";
    setSelected(selectedValue === "" ? null : selectedValue);
  };
  const users = [1, 2, 3, 4];
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
        <FormControl variant="standard" sx={{ m: 0, pb: 3, minWidth: 120 }}>
          <InputLabel
            sx={{ display: `${selectedList ? "none" : "inline"}` }}
            id="demo-simple-select-standard-label"
          >
            Select...
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            name="Channels"
            id="dropdown"
            value={selectedList || ""}
            onChange={handleSelectChange}
            label="Age"
          >
            {selectedList ? <MenuItem value={""}>none</MenuItem> : null}
            <MenuItem value={"channels"}>channels</MenuItem>
            <MenuItem value={"users"}>users</MenuItem>
          </Select>
        </FormControl>
      </Holder>
      <ListHolder>
        {selectedList === "users" ? (
          users.length ? (
            users.map(() => (
              <StyledLink onClick={() => navigate(`/user/${user.intraId}`)}>
                <StyledUserCard>
                  <Avatar
                    sx={{ height: 60, width: 60 }}
                    src={user.avatar_url}
                    alt="avatar"
                  />
                  <UserInfoContainer>
                    <UserName>{`${user.firstName} ${user.lastName}`}</UserName>
                    <br />
                    <UserLogin>@{user.userName}</UserLogin>
                  </UserInfoContainer>
                  <RatingContainer>
                    <img
                      src="/img/applogo.svg"
                      alt="logo"
                      height={20}
                      width={20}
                    />
                  </RatingContainer>
                </StyledUserCard>
              </StyledLink>
            ))
          ) : (
            <NoMatchesFound>No matches found</NoMatchesFound>
          )
        ) : selectedList === "channels" ? (
          filteredRooms.length !== 0 ? (
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
                          ? require(`/app/images_uploads/${member.user.avatar_url}`)
                          : ""
                      }
                    />
                  ))}
                </AvatarGroup>
              </Channel>
            ))
          ) : (
            <div>No Room available</div>
          )
        ) : null}
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

const ChannelType = styled.div``;

const NoMatchesFound = styled.div`
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #3498db; /* Replace with your primary color */
`;

const StyledLink = styled.button`
  width: 100%;
  display: block;
  padding: 0;
  margin-top: 5px;
  border-radius: 9999px;
`;

const StyledUserCard = styled.div`
  display: flex;
  height: 3rem;
  width: 100%;
  align-items: center;
  gap: 0.25rem;
  border-radius: 9999px;
  background-color: #8c8c8c; /* Replace with your tertiary color */
  padding-right: 0.5rem;

  &:hover {
    background-color: #6b6b6b; /* Replace with your hover color */
  }
`;

const RankContainer = styled.div`
  flex-basis: 25%;
`;

const UserInfoContainer = styled.div`
  flex-grow: 1;
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0.75rem;
  }
`;

const UserName = styled.span`
  text-align: left;
  font-size: 0.75rem;
  color: #fff;
`;

const UserLogin = styled.span`
  text-align: left;
  font-size: 0.75rem;
  color: #fff;
`;

const RatingContainer = styled.div`
  display: none;

  @media (min-width: 640px) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-right: 2rem;
    font-size: 0.75rem;
    color: #fff;
  }
`;
