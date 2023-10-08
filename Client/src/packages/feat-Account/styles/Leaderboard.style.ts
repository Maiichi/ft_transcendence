import styled from 'styled-components'


const NoPlayer = styled.section`
	padding: 10%;
	font-size: large;
	& span {
		color: red;
	}
`
const Player = styled.li`
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	border-radius: 8.295px;
	gap: 20px;
	padding: 3px;
	margin: 25px;
	justify-content: space-around;
	background: rgba(156, 163, 175, 0.1);
	box-shadow: rgba(0, 0, 0, 0.25) 0px 2.07377px 4.14754px 0px;
`
const Players = styled.ol`
	padding: 0;
	margin: 0;
    border-radius: 20px;
    -webkit-box-align: center;
    text-align: start;
    padding-bottom: 10px;
    @media (max-width: 426px) {
	}
	box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
`
const styles = {
}

export {
	styles as LdbStyles,
	Players,
	Player,
	NoPlayer,

}