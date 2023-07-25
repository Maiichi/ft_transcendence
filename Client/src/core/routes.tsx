import styled from "styled-components";
import { Test, Home } from "../packages";

import { NotFoundError } from "./errors";
import { Header, NavBar } from "./utils";
import { useSize } from "./utils/hooks";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isMobile, isTab } = useSize();
  return (
    <>
      <Header />
      <Root>
        {!isMobile && <NavBar />}
        <Children> {children}</Children>
      </Root>
    </>
  );
};

const Root = styled.div`
  display: flex;
`;
const Children = styled.div`
  margin: 0 5px;
  padding: 5px;
  background: rgb(238, 242, 246);
  width: 100%;
  /* border: none rgba(144, 202, 249, 0.145); */
  border-radius: 5px;
`;
export const routes = [
  {
    path: "/test",
    element: (
      <Layout>
        <Test />
      </Layout>
    ),
    errorElement: <NotFoundError />,
  },
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: <NotFoundError />,
  },
];
