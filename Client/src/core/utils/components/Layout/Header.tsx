import { useState } from "react";
import { useEffect } from "react";
import { ReactElement } from "react";
import { redirect } from "react-router-dom";
import styled from "styled-components";
interface MenuTabs {
  redirect: string;
  render: JSX.Element;
  activeTab: string;
}
interface TabProps {
  isActive: boolean;
}
export const Header = () => {
  const [activeTab, setActiveTab] = useState("");
  useEffect(() => {}, [activeTab]);
  const Menu: MenuTabs[] = [
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
      redirect: "/game",
      render: <p>Game</p>,
    },
  ];
  return (
    <Root>
      {Menu.map((item) => (
        <Tab
          isActive={activeTab == item.activeTab ? true : false}
          onClick={() => {
            console.log("Ddscsd");
            setActiveTab(item.activeTab);
            redirect("/test");
          }}
        >
          {item.render}
        </Tab>
      ))}
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
const Tab = styled.div<TabProps>`
  color: ${(props) =>
    props.isActive ? "rgb(214, 220, 234)" : "rgb(214, 220, 234)"};
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
`;
