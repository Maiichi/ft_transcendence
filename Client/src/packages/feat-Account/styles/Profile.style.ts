import { Card } from "@mui/material";
import React from "react";
import styled, { css } from "styled-components";

/**
 * `global css usage for the Conatiners`
 */
const conatainer = css``;
/**
 * `global css usage for the Items`
 */
const item = css``;
/**
 * 1-main component to the User Profile
 */
const ProfileCards = styled.main`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
/**
 * ``
 */
const Usercard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 50%;
  @media (max-width: 940px) {
    max-width: none;
  }
  margin: 2%;
`;
const Coalition = styled.div`
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
const Matchshistory = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 45px 15px;
  margin: 3px 7px;
  justify-content: center;
  max-width: 50%;
  @media (max-width: 940px) {
    max-width: none;
  }
`;
const Match = styled.div<{ win: any }>`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  box-shadow: 2px 1px 4px 2px ${(props) => props.win};
  /* flex: 1 1/2 1; */
  height: 150px;
  min-width: 100px;
  max-width: 150px;
  max-height: 110px;
  padding-top: 5px;
  border-radius: 10px;
`;
const style: Record<string, React.CSSProperties> = {
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

export { style };
export { ProfileCards, Usercard, Coalition, Matchshistory, Match };
