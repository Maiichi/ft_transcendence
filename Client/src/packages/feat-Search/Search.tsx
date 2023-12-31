import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Select,
} from "@mui/material";
import {
  I_User,
  SearchComponent,
  useAppDispatch,
  useAppSelector,
} from "../../core";
import { getAllRooms, getAllUsers } from "./redux/searchThunk";
import { I_Room_Search } from "./types/types";
import {
  Holder,
  SearchBar,
  ListHolder,
  ChannelsSelection,
  UserSelection,
  Root,
} from "./components";
import {
  getBlacklist,
  getUserFriends,
} from "../feat-Account/components";
import { S_Search } from "./redux/searchSlice";

type SearchSelection = "users" | "channels" | "friends" | "blockeds";

export const Search = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const search: S_Search = useAppSelector(({ search }) => search);
  const friends: I_User[] = useAppSelector(({ friends }) => friends.friends);
  const blocked: I_User[] = useAppSelector(({ block }) => block.blockedByYou);
  const user: I_User = useAppSelector(({ auth }) => auth.user);

  const handleClickSearch = (str: string) => {
    setSearchQuery(str);
  };
  const [selectedList, setSelected] = useState<SearchSelection>("friends");

  useEffect(() => {
    dispatch(getUserFriends());
    dispatch(getBlacklist());
    dispatch(getAllRooms());
    dispatch(getAllUsers());
  }, []);
  // Filter chat rooms based on the search query
  const filtre = (list: Array<I_Room_Search | I_User> | undefined) =>
    (list ?? []).filter((item: any) =>
      (item.name ?? item.firstName.concat(item.lastName))
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  /** show list slected */
  const handleSelectChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as SearchSelection;
    setSelected(selectedValue);
  };

  const ListContent = () => {
    switch (selectedList) {
      case "users":
        return (
          <UserSelection
            users={filtre(search.users) as I_User[]}
            onSearch={!!searchQuery}
          />
        );
      case "channels":
        return (
          <ChannelsSelection
            filteredRooms={filtre(search.rooms)}
            userId={user.intraId}
            onSearch={!!searchQuery}
          />
        );
      case "blockeds":
        return (
          <UserSelection
            users={filtre(blocked) as I_User[]}
            forBlocked
            onSearch={!!searchQuery}
          />
        );
      case "friends":
        return (
          <UserSelection
            users={filtre(friends) as I_User[]}
            forfriends
            onSearch={!!searchQuery}
          />
        );
    }
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
          ></InputLabel>
          <Select
            color="secondary"
            labelId="demo-simple-select-standard-label"
            name="Channels"
            id="dropdown"
            value={selectedList}
            onChange={handleSelectChange}
          >
            <MenuItem value={"friends"}>friends</MenuItem>
            <MenuItem value={"users"}>users</MenuItem>
            <MenuItem value={"channels"}>channels</MenuItem>
            <MenuItem value={"blockeds"}>blocked list</MenuItem>
          </Select>
        </FormControl>
      </Holder>
      <ListHolder>
        <ListContent />
      </ListHolder>
    </Root>
  );
};
