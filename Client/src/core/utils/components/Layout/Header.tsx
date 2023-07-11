import { Button } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SimpleDialog } from "../Dialog";
interface MenuTabs {
  redirect?: string;
  render: JSX.Element;
  activeTab?: string;
}
interface TabProps {
  isActive: boolean;
}
export const Header = () => {
  const [activeTab, setActiveTab] = useState<string>("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {}, [activeTab]);
  const ProfileClick = () => {
    console.log("Profile");
    setOpen(true);
  };
  const NotifClick = () => {
    console.log("Notifications");
  };

  const RightMenu: MenuTabs[] = [
    {
      render: (
        <CircleNotificationsIcon
          style={{ color: "#f2bb13" }}
          onClick={NotifClick}
        />
      ),
    },
    {
      render: (
        <ImgProfile
          src="https://cdn-icons-png.flaticon.com/512/4128/4128349.png"
          onClick={ProfileClick}
        />
      ),
    },
  ];
  const LeftMenu: MenuTabs[] = [
    {
      activeTab: "Home",
      redirect: "/",
      render: <>Home</>,
    },
    {
      activeTab: "test",
      redirect: "/test",
      render: <p>Login</p>,
    },
    {
      activeTab: "game",
      redirect: "/",
      render: <p>Game</p>,
    },
  ];

  const TabComponent = (item: MenuTabs) => {
    const tabClick = (item: MenuTabs) => {
      item.activeTab && setActiveTab(item.activeTab);
      item.redirect && navigate(item.redirect);
    };
    return (
      <Tab
        isActive={item.activeTab ? activeTab === item.activeTab : true}
        onClick={() => tabClick(item)}
      >
        {item.render}
      </Tab>
    );
  };
  return (
    <Root>
      <Left>
        {LeftMenu.map((item: MenuTabs) => (
          <TabComponent {...item} />
        ))}
      </Left>
      <Right>
        {RightMenu.map((item: MenuTabs) => (
          <TabComponent {...item} />
        ))}
      </Right>
      <SimpleDialog open={open} onClose={handleClose} />
    </Root>
  );
};
const Root = styled.div`
  padding: 10px;
  background-color: rgb(8, 27, 75);
  color: rgb(214, 220, 234);
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  display: flex;
  height: 20px;
  align-items: center;
  justify-content: space-between;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
`;
const Right = styled.div`
  display: flex;
  align-items: center;
`;
const Tab = styled.div<TabProps>`
  color: ${(props) => (props.isActive ? "#f2bb13" : "rgb(214, 220, 234)")};
  margin: 25px;
`;
const ImgProfile = styled.img`
  width: 33px;
  height: 34px;
  margin-top: 5px;
`;
