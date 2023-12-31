import styled, { css } from "styled-components";

const Grow = styled.div<{ prograssShow: "circular" | "linear" }>`
  display: ${(props) => (props.prograssShow === "linear" ? "none" : "inline")};
`;
const cardstyle = css`
  margin: 2%;
  border: 0px inset black; /* tmp */

  margin-top: 0;
  width: 45%;
  @media (max-width: 940px) {
    width: 95%;
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
  gap: 2% 1%;
  align-content: flex-start;
  max-width: 100%;
  overflow-x: scroll;
`;
/**
 * `Usercard` global information of the user as <data />
 */
const Usercard = styled.data`
  display: flex;
  justify-content: center;
  padding-top: 4%;
  ${cardstyle}
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
  padding-bottom: 44px;
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
`;
const Achiv = styled(smallCard)`
  height: 80px;
`;

export {
  Board,
  ProfileCards,
  Usercard,
  Matchshistory,
  Match,
  Achievemets,
  Achiv,
  Grow,
};
