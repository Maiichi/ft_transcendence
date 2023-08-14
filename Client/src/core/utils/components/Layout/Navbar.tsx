import { Chip, Divider, makeStyles } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from '@mui/icons-material/Chat';
import { ListComponent } from "../List";

type Anchor = "top" | "left" | "bottom" | "right";
const Menu = [
  {
    redirect: "/",
    render: "Home",
    icon: HomeIcon,
  },
  {
    redirect: "/test",
    render: "Login",
    icon: SearchIcon,
  },
  {
    redirect: "/game",
    render: "Game",
    icon: SportsEsportsIcon,
  },
  {
    redirect : "/chat",
    render: "Chat",
    icon: ChatIcon
  }
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
