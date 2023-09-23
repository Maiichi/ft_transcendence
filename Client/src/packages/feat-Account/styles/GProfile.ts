import styled from 'styled-components'


export const Score = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: ${(p) => p.color} 0px 0px 8px 0px;
  margin: 10px;
  border-radius: 8px;
`
export const RightCard = styled.div`
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
    padding: 1rem 0 1rem 4vw;
    /* background-color: rgb(255, 255, 255);
    color: rgb(17, 25, 39); */
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
    border-radius: 20px;
    -webkit-box-align: center;
    align-items: center;
    text-align: center;
    display: flex;
    gap: 40px;
    @media (max-width: 426px) {
    }
`
/**
 * `Left Card`: div selector
 * 
 * Children:
 *  @see CardAvatar2
 *  @see Achievements
 */
export const LeftCard = styled.div`
  flex: 30%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (min-width: 768px) {
    flex: 100%;
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
`
