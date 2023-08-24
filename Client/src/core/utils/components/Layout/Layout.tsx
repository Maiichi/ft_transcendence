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
  position: absolute;
  width: -webkit-fill-available;
`;
const Children = styled.div<{ displayNavbar: boolean }>`
  background: rgb(238, 242, 246);
  width: -webkit-fill-available;
  border-radius: 5px;
  margin: 1vw;
  @media (max-width: 426px) {
  }
`;
