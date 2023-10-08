import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Avatar, Button } from "@mui/material"
import { Chat, PersonAdd, SportsCricket } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from "../../core"
import { getLeaderboard } from "./API.d"
import {
	Players,
	Player,
	NoPlayer,
	Rotate,
	/***global**/
	Title,
	H5,
	Root,
} from "./styles"
import './styles/going.module.css'
import { Pic } from "./API.d/data"

function sendGameRequist(userName:string) { }
function sendFriendRequist(userName:string) { }

const Loading = () => {
	return <> Loading </>
}

const Leaderboard = () => {
	const navigate = useNavigate()
	const state = useAppSelector(state => state.LeaderBoard)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getLeaderboard())
	}, [state.leaderboard])

	return (
	<Root $primary={true}>
		<Title> Leaderboard </Title>
		{ state.isLoading
			? <Loading/>
			: state.leaderboard
				? <Players>
					{state.leaderboard.map((item:any, index:any) => (
						<Player>
							<div>
								<h5>#{index + 1}</h5>
								<p>Rank</p>
							</div>
							<div>
								<Avatar className="avatar"
									alt={'player: ' + (index + 1)}
									src={Pic}
								/>
								<img
									alt={'player: ' + index}
									src={item.achievement}
								/>
								<h5>{item.name}</h5>
							</div>
							<div className="matches">
								<div>
									<h5>{item.ladder} </h5>
									<H5> Ladder </H5>
								</div>
								<div>
									<h5>{item.wins} </h5>
									<H5> Wins </H5>
								</div>
								<div>
									<h5>{item.loss}</h5>
									<H5> Losses </H5>
								</div>
							</div>
							<div>
								<Button onClick={() => sendGameRequist(item.name)}><SportsCricket /></Button>
								<Button onClick={() => navigate('/chat')}><Chat /></Button>
								<Button onClick={() => sendFriendRequist(item.name)}><PersonAdd /></Button>
							</div>
						</Player>
					))}
				</Players>
				: <NoPlayer>
					<h3> No Player is registred in <br /> the leaderboard
						<br /><br /> <span>Play</span> and you'll here!</h3>
					<Rotate>
						<Button variant="contained" onClick={() => navigate('/game')}> P l a y </Button>
					</Rotate>
				</NoPlayer>
		}
	</Root>
)}

// export default Leaderboard
export { Leaderboard }