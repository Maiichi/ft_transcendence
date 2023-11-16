import { Copyright } from "@mui/icons-material";
import styled from "styled-components";
import { Header, ListNav } from ".";
import { useAppSelector } from "../../..";
import { CoreState } from "../../../CoreSlice";
import { useSize } from "../../hooks";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isMobile, isTab } = useSize();
  const state: CoreState = useAppSelector((state) => state.core);
  return (
    <Container>
      <Header />
      <Root>
        {state.displayNavbar && !isMobile && <ListNav />}
        <Children displayNavbar={state.displayNavbar}> {children}</Children>
      </Root>
      <Footer>
        <Copyright /> By Ibouroum
      </Footer>
    </Container>
  );
};

const Root = styled.div`
  display: flex;
  height: 90%;
  margin: 4px 5px;
`;
const Container = styled.div`
  height: 100%;
`;
const Footer = styled.div`
  width: 100%;
  text-align: center;
  background: #eee7f7;
  height: 5%;
`;
const Children = styled.div<{ displayNavbar: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  @media (max-width: 426px) {
  }
`;
