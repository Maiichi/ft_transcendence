import styled from "styled-components";


const Score = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: ${(p) => p.color} 0px 0px 8px 0px;
  margin: 10px;
  border-radius: 8px;
`
const RightCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 100%;
  @media (max-width: 768px) {
    flex: 66%;
  }
`
const Achievements = styled.div`
  margin-right: 5px;
  /* background-color: rgb(255, 255, 255); */
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
const Achievement = styled.div`
  display: flex;
  background: ${(p) => p.color};
  margin: 10px;
  justify-content: space-around;
  align-items: center;
`
const TopPlayers = styled.div`
  margin-right: 5px;
  /* background-color: rgb(255, 255, 255); */
  color: rgb(17, 25, 39);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
  border-radius: 20px;
  -webkit-box-align: center;

  text-align: center;
  padding: 10px;
  @media (max-width: 426px) {
  }
`
const MatchHistory = styled.div`
  margin-right: 5px;
  /* background-color: rgb(255, 255, 255); */
  color: rgb(17, 25, 39);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
  border-radius: 20px;
  -webkit-box-align: center;
  padding: 10px;
  text-align: center;
  @media (max-width: 426px) {
  }
`
const Player = styled.div`
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
const CardAvatar2 = styled.div`
    margin-right: 5px;
    /* background-color: rgb(255, 255, 255); */
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
const LeftCard = styled.div`
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
const Cards = styled.div`
  padding: 5px;
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
const Root = styled.div`
  background-color: #f9f9f9;
  padding: 0;
  margin: 0;
`

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
export {Root, Cards,
  LeftCard,
    CardAvatar2,
    Player,
    MatchHistory,
    TopPlayers,
      Achievement,
    Achievements,
  RightCard,
  Score,
}