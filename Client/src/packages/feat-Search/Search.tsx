import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Select,
} from "@mui/material";
import { I_User, SearchComponent, useAppDispatch, useAppSelector } from "../../core";
import { getAllRooms, getAllUsers } from "./redux/searchThunk";
import { I_Room_Search } from "./types/types";
import { getMemberships } from "../feat-Chat/components/redux/roomThunk";
import {
  Holder,
  SearchBar,
  ListHolder,
  ChannelsSelection,
  UserSelection,
  Root,
} from "./components";

export const Search = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { rooms, users }: { rooms: []; users: [] } =
    useAppSelector((state) => state.search);
  const user = useAppSelector((state) => state.auth.user);

  const handleClickSearch = (str: string) => {
    setSearchQuery(str);
  };

  console.log("users == ", users);

  useEffect(() => {
    dispatch(getMemberships());
    dispatch(getAllRooms());
    dispatch(getAllUsers());
  }, []);

  // Filter chat rooms based on the search query
  const filteredRooms: I_Room_Search[] = rooms.filter((item: any) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filtredUsers: I_User[] = users.filter((user: I_User) => 
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /** show list slected */
  const [selectedList, setSelected] = useState<"users" | "channels">(
    "users"
  );
  const handleSelectChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as "users" | "channels";
    setSelected(selectedValue);
  };

  return (
    <Root>
      <Holder>
        <SearchBar>
          <SearchComponent onInputUpdate={handleClickSearch} />
        </SearchBar>
        <FormControl variant="standard" sx={{ m: 0, pb: 3, minWidth: 120 }}>
          <InputLabel
            sx={{ display: `${selectedList ? "none" : "inline"}` }}
            id="demo-simple-select-standard-label"
          >
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            name="Channels"
            id="dropdown"
            value={selectedList}
            onChange={handleSelectChange}
          >
            <MenuItem value={"channels"}>channels</MenuItem>
            <MenuItem value={"users"}>users</MenuItem>
          </Select>
        </FormControl>
      </Holder>
      <ListHolder>
        {selectedList === "users" ? (
          <UserSelection users={filtredUsers} />
        ) : selectedList === "channels" ? (
          <ChannelsSelection
            filteredRooms={filteredRooms}
            userId={user.intraId}
          />
        ) : null}
      </ListHolder>
    </Root>
  );
};
