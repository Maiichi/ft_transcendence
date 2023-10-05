import styled from 'styled-components'


const NoPlayer = styled.section`
	padding: 10%;
	font-size: large;
	& span {
		color: red;
	}
`
const Player = styled.div`
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	text-align: center;
	border-radius: 8.295px;
	gap: 20px;
	margin: 30px;
	justify-content: space-around;
	background: rgba(156, 163, 175, 0.1);
	box-shadow: rgba(0, 0, 0, 0.25) 0px 2.07377px 4.14754px 0px;
`
const Players = styled.div`
    color: rgb(17, 25, 39);
    border-radius: 20px;
    -webkit-box-align: center;
    text-align: center;
    padding: 5px 0 5px 0;
    @media (max-width: 426px) {
	}
	box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
`
export {
	Players,
	Player,
	NoPlayer,

}