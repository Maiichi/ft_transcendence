import styled from "styled-components";

export const NavBar = () => {
  const LeftMenu = [
    {
      id: "home",
      activeTab: "home",
      redirect: "/",
      render: <p>Home</p>,
    },
    {
      id: "test",
      activeTab: "test",
      redirect: "/test",
      render: <p>Login</p>,
    },
    {
      id: "game",
      activeTab: "game",
      redirect: "/",
      render: <p>Game</p>,
    },
  ];
  return <Root> {LeftMenu.map((item) => item.render)}</Root>;
};
const Root = styled.div`
  height: 100vw;
  padding-left: 16px;
  padding-right: 16px;
  background: aliceblue;
  border-radius: 5px;
`;
