import { deepPurple } from "@mui/material/colors";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  // width : 32%;
  margin: auto;
  // border: 1px solid;
  @media (max-width: 426px) {
    margin: 0;
    width: 100%;
  }
  overflow: hidden;
  height: 800px;
  @media (max-height: 700px) {
    height: 560px;
  }
`;

const Holder = styled.div`
  display: flex;
  width: 40%;
  margin: auto;
  gap: 0.5em;
  align-items: center;
  justify-content: center;
  @media (max-width: 426px) {
    flex-direction: column;
  }
`;

const SearchBar = styled.div`
  width: 80%;
  height: 50px;
  padding: 10px;
  border-radius: 5px;
  position: relative;
`;

const ListHolder = styled.div`
  display: grid;
  // flex-direction: column;
  margin-top: 10px;
  gap: 0.5rem;
  height: 80%;
  align-content: baseline;
  align-items: center;
  grid-template-columns: repeat(auto-fit, 300px);
  justify-content: center;
  gap: 20px 10px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 90%;
`;

const Channel = styled.div`
  display: flex;
  width: 90%;
  padding: 0px 5px 5px 5px;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 0.375rem;
  border-width: 2px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  max-width: 500px;
  border: 0.5px solid #8e00a1;
`;

const ChannelName = styled.p`
  justify-items: center;
`;

const ButtonNameHolder = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  @media (max-width: 426px) {
    flex-direction: column;
    align-items: inherit;
  }
`;

const ChannelType = styled.div``;

const NoMatchesFound = styled.div`
  height: 500px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: ${deepPurple[400]}; /* Replace with your primary color */
`;

const StyledLink = styled.button`
  width: 100%;
  display: block;
  padding: 0;
  margin-top: 5px;
  border-radius: 9999px;
`;

const StyledUserCard = styled.div<{ forBlocked?: true }>`
  display: flex;
  height: 3rem;
  width: 100%;
  align-items: center;
  gap: 0.25rem;
  cursor: ${({ forBlocked }) => (forBlocked ? "no-drop" : "pointer")};
  border-radius: 9999px;
  background-color: white;
  padding-right: 0.5rem;

  &:hover {
    background-color: ${({ forBlocked }) => (forBlocked ? "#ccc" : "#6b6b6b")};
    animation: vibrate 0.25s linear ${({ forBlocked }) => (forBlocked ? 1 : 0)}
      alternate;
    @keyframes vibrate {
      0%,
      100% {
        transform: translateX(0);
      }
      30% {
        transform: translateX(-4px);
      }
      75% {
        transform: translateX(4px);
      }
      90% {
        transform: translateX(-4px);
      }
    }
  }
`;

const RankContainer = styled.div`
  flex-basis: 25%;
`;

const UserInfoContainer = styled.div`
  flex-grow: 1;
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0.75rem;
  }
`;

const UserName = styled.span`
  text-align: left;
  font-size: 0.75rem;
  color: black;
`;

const UserLogin = styled.span`
  text-align: left;
  font-size: 0.75rem;
  color: black;
`;

export {
  NoMatchesFound,
  ButtonNameHolder,
  RankContainer,
  Root,
  SearchBar,
  StyledLink,
  StyledUserCard,
  Channel,
  ChannelName,
  ChannelType,
  UserInfoContainer,
  UserLogin,
  UserName,
  ListHolder,
  Holder,
};
