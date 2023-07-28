import { Chip, Divider, makeStyles } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../Navbar.css";
import styled from "styled-components";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

type Anchor = "top" | "left" | "bottom" | "right";
const LeftMenu = [
  {
    id: "home",
    activeTab: "home",
    redirect: "/",
    render: "Home",
    icon: SearchIcon,
  },
  {
    id: "test",
    activeTab: "test",
    redirect: "/test",
    render: "Login",
    icon: SearchIcon,
  },
  {
    id: "game",
    activeTab: "game",
    redirect: "/game",
    render: "Game",
    icon: SearchIcon,
  },
];
export const NavBar = () => {
  return (
    <Root>
      {LeftMenu.map((item) => (
        <Tab key={item.id}>
          <item.icon className="icon" />
          <span className="title">{item.render}</span>
        </Tab>
      ))}
    </Root>
  );
};

export const ListNav = (toggleDrawer?: any) => (
  <div
    style={{ width: "200px" }}

    // onClick={toggleDrawer && toggleDrawer("left", false)}
    // onKeyDown={toggleDrawer && toggleDrawer("left", false)}
  >
    <List>
      {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton className="item">
            <ListItemIcon className="icon">
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <h5 className="title">{text}</h5>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
  </div>
);
const Tab = styled.div`
  margin: 0px 0px 4px;
  display: flex;
  padding: 10px 16px 10px 24px;
  color: rgb(54, 65, 82);
  border-radius: 12px;
  align-items: flex-start;
  background-color: inherit;
  &:hover {
    color: rgb(94, 53, 177);
    background-color: rgb(237, 231, 246);
  }
`;
const Root = styled.div`
  padding: 16px;

  border-radius: 5px;
`;
