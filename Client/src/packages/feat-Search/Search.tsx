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
import { getMemberships } from "../feat-Chat/components/redux/roomThunk";
import {
  Holder,
  SearchBar,
  ListHolder,
  ChannelsSelection,
  UserSelection,
  Root,
} from "./components";
import {
  AddLoading,
  getUserFriends,
  userType,
} from "../feat-Account/components";
import { S_Search } from "./redux/searchSlice";

type SearchSelection = "users" | "channels" | "friends" | "blockeds";

export const Search = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const search: S_Search = useAppSelector(({ search }) => search);
  const friends: AddLoading<userType[]> = useAppSelector(
    ({ friends }) => friends
  );
  const user = useAppSelector((state) => state.auth.user);

  const handleClickSearch = (str: string) => {
    setSearchQuery(str);
  };

  useEffect(() => {
    dispatch(getMemberships());
    dispatch(getAllRooms());
    dispatch(getAllUsers());
    dispatch(getUserFriends());
  }, []);
  console.log(friends.foo);
  // Filter chat rooms based on the search query
  const filtre = (list: Array<I_Room_Search | I_User>, enableData?: true) =>
    searchQuery || enableData
      ? list.filter((item: any) =>
          (item.name ?? item.firstName.concat(item.lastName))
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : [];

  /** show list slected */
  const [selectedList, setSelected] = useState<SearchSelection>("friends");
  const handleSelectChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as SearchSelection;
    setSelected(selectedValue);
  };

  const ListContenet = () => {
    switch (selectedList) {
      case "users":
        return (
          <>
            {search.isLoading || (
              <UserSelection
                users={filtre(search.users) as I_User[]}
                onSearch={!!searchQuery}
              />
            )}
          </>
        );
      case "channels":
        return (
          <>
            {search.isLoading || (
              <ChannelsSelection
                filteredRooms={filtre(search.rooms)}
                userId={user.intraId}
                onSearch={!!searchQuery}
              />
            )}
          </>
        );
      case "blockeds":
        return <h1> blockeds </h1>;
      case "friends":
        return (
          <>
            {friends.isLoading || (
              <UserSelection
                users={filtre(friends.foo ?? [], true) as userType[]}
                forfriends
                onSearch={!!searchQuery}
              />
            )}
          </>
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
        <ListContenet />
      </ListHolder>
    </Root>
  );
};
