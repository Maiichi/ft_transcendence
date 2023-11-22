import { SxProps } from "@mui/material";
import styled, { css } from "styled-components";

const cardstyle = css`
  margin: 2%;
  /* margin-top: 0; */
  /* padding-top: 0; */
  max-width: 40%;
  @media (max-width: 940px) {
    max-width: none;
  }
`;
const smallCard = styled.data`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  min-width: 100px;
  max-width: 150px;
  /* max-height: 110px; */
  padding-top: 5px;
`;
/**
 * 1-main component to the User Profile
 */
const ProfileCards = styled.main`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 10px;
  align-content: flex-start; /* Ensure items align to the start of the container */
  /**  */
  & datalist,
  data,
  div {
    /* border: 1px solid black; */
  }
  max-width: 100%;
  overflow-x: scroll;
`;
/**
 * `Usercard` global information of the user as <data />
 */
const Usercard = styled.data`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  padding-right: 30px;
  ${cardstyle}
  @media (max-width: 940px) {
  }
`;
const Coalition = styled.data`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin: 5px;
  min-width: 20%;
  @media (max-width: 540px) {
    display: none;
  }
`;
const Board = styled.datalist`
  display: flex;
  flex-direction: column;
  min-width: 45%;
  justify-content: center;
  ${cardstyle}
`;
const Matchshistory = styled.datalist`
  display: flex;
  flex-wrap: wrap;
  gap: 45px 10px;
  justify-content: center;
  padding-bottom: 32px;
  ${cardstyle}
`;
const Match = styled(smallCard)<{ win: any }>`
  box-shadow: 2px 1px 4px 2px ${(props) => props.win};
  border-radius: 10px;
  max-height: 145px;
`;
const Achievemets = styled.datalist`
  display: flex;
  flex-wrap: wrap;
  gap: 15px 10px;
  justify-content: center;
  ${cardstyle}
  @media (max-width: 940px) {
  }
`;
const Achiv = styled(smallCard)`
  height: 80px;
`;

export {
  Board,
  ProfileCards,
  Usercard,
  Coalition,
  Matchshistory,
  Match,
  Achievemets,
  Achiv,
};
