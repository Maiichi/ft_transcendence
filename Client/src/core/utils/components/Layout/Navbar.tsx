import { Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ChatIcon from "@mui/icons-material/Chat";
import { ListComponent } from "../List";
import { deepPurple } from "@mui/material/colors";
import { Leaderboard as LeaderboardIcon } from "@mui/icons-material";

type Anchor = "top" | "left" | "bottom" | "right";
const Menu = [
  {
    redirect: "/",
    render: "Game",
    icon: SportsEsportsIcon,
    style: { color: deepPurple[400] },
  },
  {
    redirect: "/chat",
    render: "Chat",
    icon: ChatIcon,
    style: { color: deepPurple[500] },
  },
  {
    redirect: "/search",
    render: "Search",
    icon: SearchIcon,
    style: { color: deepPurple[600] },
  },
  {
    redirect: "/leaderboard",
    render: "LeaderBoard",
    icon: LeaderboardIcon,
    style: { color: deepPurple[700] },
  },
];
interface ListNavProps {
  toggleDrawer?: (
    anchor: Anchor,
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}
export const ListNav = ({ toggleDrawer }: ListNavProps) => {
  return (
    <div
      style={{ width: "200px" }}
      onClick={toggleDrawer ? toggleDrawer("left", false) : undefined}
      onKeyDown={toggleDrawer ? toggleDrawer("left", false) : undefined}
    >
      <ListComponent menu={Menu} />
      <Divider />
    </div>
  );
};
