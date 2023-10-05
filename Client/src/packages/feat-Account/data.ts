
import { Avatar } from "@mui/material";
import Logo from "./images_uploads/federation.png";
import Pic from './images_uploads/th-imoj.jpeg'

const AchievementsArr = [
{
    name: "Hero",
    Description: "Must play 10 games",
    progress: 100,
    isValid: true,
    logo: Logo,
},
{
    name: "Hero",
    Description: "Must play 10 games",
    progress: 100,
    isValid: true,
    logo: Logo,
},
{
    name: "Hero",
    Description: "Must play 10 games",
    progress: 100,
    isValid: true,
    logo: Logo,
},
{
    name: "Hero",
    Description: "Must play 10 games",
    progress: 100,
    isValid: true,
    logo: Logo,
},
{
    name: "Athlete",
    Description: "Must win 10 games",
    progress: 100,
    isValid: true,
    logo: Logo,
},
{
    name: "Diamond",
    Description: "Must win 100 games",
    progress: 40,
    isValid: false,
    logo: Logo,
},
{
    name: "Bronze",
    Description: "Must play 500 games",
    progress: 10,
    isValid: false,
    logo: Logo,
},
]
const Histories = [
{
    user: {
    name: "izajhk",
    picture: Pic,
    },
    score: [13333333, 4],
},
{
    user: {
    name: "di",
    picture: Pic,
    },
    score: [2, 4],
},
{
    user: {
    name: "johytuytuytuytutyutyn",
    picture: Pic,
    },
    score: [6, 4],
},
{
    user: {
    name: "mbvfbfbark",
    picture: Pic,
    },
    score: [1, 2],
},
{
    user: {
    name: "sara",
    picture: Pic,
    },
    score: [4, 4],
},
]
const TopPlayersArr = [
{
    name: "Lionnel",
    ladder: 100,
    wins: 50,
    loss: 10,
    achievement: Logo,
    picture: 'Pic,'
},
{
    name: "mark",
    ladder: 90,
    wins: 40,
    loss: 15,
    achievement: Logo,
    picture: 'Pic,'
},
{
    name: "john",
    ladder: 75,
    wins: 50,
    loss: 40,
    achievement: Logo,
    picture: 'Pic,'
},
]

const players = TopPlayersArr
export { AchievementsArr, Histories, TopPlayersArr, players, Logo, Pic }
