import { Copyright } from "@mui/icons-material";
import styled from "styled-components";
import { Header, ListNav } from ".";
import { useAppSelector } from "../../..";
import { CoreState } from "../../../CoreSlice";
import { useSize } from "../../hooks";
import { Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

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
        <Typography variant="body2" minWidth="200px">
          <Copyright /> By IOIMI team
        </Typography>
      </Footer>
    </Container>
  );
};

const Root = styled.div`
  display: flex;
  height: 90%;
  margin: 4px 5px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  scrollbar-color: transparent transparent;
`;
const Container = styled.div`
  height: 100%;
`;
const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  text-align: center;
  background: ${deepPurple[300]};
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;

  height: 5%;
  bottom: 0;
  position: fixed;
`;
const Children = styled.div<{ displayNavbar: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  @media (max-width: 426px) {
  }
`;
