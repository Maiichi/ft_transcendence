import styled from "styled-components";


export const Score = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: ${(p) => p.color} 0px 0px 8px 0px;
  margin: 10px;
  border-radius: 8px;
`
export const RightCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 100%;
  @media (max-width: 768px) {
    flex: 66%;
  }
`
export const Achievements = styled.div`
  margin-right: 5px;
  background-color: rgb(255, 255, 255);
  color: rgb(17, 25, 39);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
  border-radius: 20px;
  -webkit-box-align: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  overflow-y: scroll;
  gap: 40px;
  @media (max-width: 426px) {

  }
`
export const Achievement = styled.div`
  display: flex;
  background: ${(p) => p.color};
  margin: 10px;
  justify-content: space-around;
  align-items: center;
`
export const TopPlayers = styled.div`
  margin-right: 5px;
  background-color: rgb(255, 255, 255);
  color: rgb(17, 25, 39);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
  border-radius: 20px;
  -webkit-box-align: center;

  text-align: center;
  padding: 10px;
  @media (max-width: 426px) {
  }
`
export const MatchHistory = styled.div`
  margin-right: 5px;
  background-color: rgb(255, 255, 255);
  color: rgb(17, 25, 39);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
  border-radius: 20px;
  -webkit-box-align: center;
  padding: 10px;
  text-align: center;
  @media (max-width: 426px) {
  }
`
export const Player = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  text-align: start;
  border-radius: 8.295px;
  gap: 20px;
  margin: 10px;
  justify-content: space-around;
  background: rgba(156, 163, 175, 0.1);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2.07377px 4.14754px 0px;
`
/**
 *  `CardAvatar2`: div slector
 */
export const CardAvatar2 = styled.div`
    margin-right: 5px;
    background-color: rgb(255, 255, 255);
    color: rgb(17, 25, 39);
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
    border-radius: 20px;
    -webkit-box-align: center;
    align-items: center;
    text-align: center;
    display: flex;
    padding: 0 10px;
    gap: 40px;
    @media (max-width: 426px) {
    }
`
/**
 * `Left Card`: div selector
 * 
 * Contains:
 *  - CardAvatar2
 *  - Achievements
 */
export const LeftCard = styled.div`
  flex: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 768px) {
    flex: 30%;
  }
`
/** 
 *  \<Cards> div Selector
 * 
 *  Children:
 *    @see LeftCard
 *    @see RightCard
 * */ 
export const Cards = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
/** 
 *  `component Root` Profile
 * 
 *  Children:
 *   @see Cards
 */ 
export const Root = styled.div`
  padding: 5px;
  border-radius: 32px;
`


/** 8888888888888888888888888888888888888 */
export const CardForm = styled.div`
  width: 65%;
  margin-left: 5px;

  background-color: rgb(255, 255, 255);
  color: rgb(17, 25, 39);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 32px 24px 10px 32px;
  @media (max-width: 426px) {
    margin: 5px 0px;
    width: 75%;
  }
`
export const ButtonAvatar = styled.button`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  outline: 0px;
  border: 0px;
  margin: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  font-weight: 600;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 0.875rem;
  line-height: 1.75;
  min-width: 64px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  color: rgb(99, 102, 241);
  width: 100%;
  border-radius: 12px;
  text-transform: none;
  padding: 9px 16px;
  &:hover {
    text-decoration: none;
    background-color: rgba(99, 102, 241, 0.04);
  }
`
export const ButtonForm = styled.button`
  border: 0px;
  margin: 0px;
  font-weight: 600;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 0.875rem;
  line-height: 1.75;
  color: rgb(255, 255, 255);
  background-color: rgb(99, 102, 241);
  border-radius: 12px;
  padding: 8px 20px;
  width: fit-content;
  margin-left: auto;
  &:hover {
    text-decoration: none;
    background-color: rgb(67, 56, 202);
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 10px;
  }
  `
export const H5 = styled.h4`
  margin: 0px;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.57;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  color: rgb(108, 115, 127);
`

export const Divider = styled.hr`
  margin-top: 15px;
  width: -webkit-fill-available;

  border-width: 0px 0px thin;
  border-style: solid;
  border-color: rgb(242, 244, 247);
`
export const CardAvatar = styled.div`
  width: 35%;
  height: fit-content;
  margin: 5px;
  padding: 32px 24px 6px 32px;
  background-color: rgb(255, 255, 255);
  color: rgb(17, 25, 39);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
  border-radius: 20px;
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 426px) {
    margin: 5px 0px;
    width: 75%;
  }
  `

/** 
 *  \<Title> Selector
 * 
 *  `component Title` Profile
 * */ 
export const Title = styled.div`
  text-align: center;
  margin: 0;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 700;
  margin-top: 16px;
  margin-bottom: 5px;
  line-height: 1.2;
  font-size: "2rem";
  `
  // const Title = styled.h4`
  // 
  //   flex: 1 1 15%;
  // `;

/**
 * Style 
 */
const style = {
  Title: {
    fontSize: " 1rem"
  },
  avatar: {
    width: "80px",
    height: "80px"
  },


}

export default style