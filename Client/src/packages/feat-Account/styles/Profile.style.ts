import styled, { css } from "styled-components";

const cardstyle = css`
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
  max-height: 110px;
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
  align-items: center;
  margin: 2%;
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
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  min-width: 45%;
  justify-content: center;
  ${cardstyle}
`;
const Matchshistory = styled.datalist`
  display: flex;
  flex-wrap: wrap;
  gap: 45px 15px;
  justify-content: center;
  margin: 2%;
  padding-bottom: 32px;
  ${cardstyle}
`;
const Match = styled(smallCard)<{ win: any }>`
  box-shadow: 2px 1px 4px 2px ${(props) => props.win};
  border-radius: 10px;
  height: 150px;
`;
const Achievemets = styled.datalist`
  display: flex;
  flex-wrap: wrap;
  gap: 15px 10px;
  justify-content: center;

  margin: 2%;
  ${cardstyle}
  @media (max-width: 940px) {
  }
`;
const Achiv = styled(smallCard)`
  height: 80px;
`;
const styleP: Record<string, React.CSSProperties> = {
  div1: {
    display: "flex",
    flexDirection: "column",
    minWidth: "80%",
  },
  div2: {
    display: "flex",
    justifyContent: "space-around",
  },
  div3: {
    display: "flex",
  },
  div4: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "start",
  },
  div5: {
    fontSize: "12px",
  },
  button1: {
    padding: "0",
    textTransform: "lowercase",
  },
  box1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "start",
  },
  box2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "end",
    textAlign: "center",
    padding: "0 2% 0 10%",
  },
  userAvatar: {
    width: "80px",
    height: "80px",
    marginRight: "10px",
  },
  achivlogo: {
    width: "40px",
    height: "40px",
  },
  userName: {},
  cardName: {
    width: "90%",
    padding: "0px",
    margin: "0px",
    fontSize: "20px",
    fontFamily: "revert",
    height: "5px",
    textAlign: "start",
  },
};

export default styleP;
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
