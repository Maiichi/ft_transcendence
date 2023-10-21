import React from "react";
import styled, { css } from "styled-components";


/**
 * `global css usage for the Conatiners`
 */
const conatainer = css`
`
/**
 * `global css usage for the Items`
 */
const item = css`
`
/**
 * 1-main component to the User Profile 
 */
const ProfileCards = styled.main`
  ${conatainer}
`
/**
 * ``
 */
const Usercard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const Coalition = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin: 5px ;
  min-width: 20%;
`
const User = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 75%;
`
const style: Record<string, React.CSSProperties> = {
  div1: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '80%', 
  },
  div2: {
    display: "flex",
    justifyContent: 'space-around',
  },
  div3: {
    display: "flex"
  },
  div4: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "start",
  },
  div5: {
    fontSize: '12px',
  },
  box1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'start'
  },
  box2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'end',
    textAlign: 'center',
    padding: '0 2% 0 10%',
  },
  userAvatar: {
    borderRadius: '40px',
    width: '80px',
    height: '80px',
    marginTop: '10px',
    marginRight: '10px',
  },
  userName: {
  }
}

export { style }
export {
  ProfileCards,
  Usercard,
  Coalition,
  User
};
