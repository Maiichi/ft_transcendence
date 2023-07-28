import styled from "styled-components";
import { Header, ListNav } from ".";
import { useAppSelector } from "../../..";
import { CoreState } from "../../../CoreSlice";
import { useSize } from "../../hooks";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isMobile, isTab } = useSize();
  const state: CoreState = useAppSelector((state) => state.core);
  return (
    <>
      <Header />
      <Root>
        {state.displayNavbar && !isMobile && <ListNav />}
        <Children displayNavbar={state.displayNavbar}> {children}</Children>
      </Root>
    </>
  );
};

const Root = styled.div`
  display: flex;
`;
const Children = styled.div<{ displayNavbar: boolean }>`
  margin: 8px 5px;
  padding: 5px;
  background: rgb(238, 242, 246);
  width: 100%;
  position: fixed;
  height: -webkit-fill-available;
  margin-left: ${(p) => (p.displayNavbar ? "200px" : "0px")};
  border-radius: 5px;
  @media (max-width: 425px) {
    margin: 10px 5px;
  }
`;
