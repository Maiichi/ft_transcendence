import { Chip, Divider, makeStyles } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../Navbar.css";
import styled from "styled-components";

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
  height: 100vw;
  padding: 16px;
  background: aliceblue;
  border-radius: 5px;
`;
