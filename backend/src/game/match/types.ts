import { Socket } from "socket.io/dist/socket";
export 
interface Paddle {
	y: number;
  }
  
 export  interface Player {
	socket?: Socket;
	score: number;
	paddle: Paddle;
  }
  
 export  interface Ball {
	x: number;
	y: number;
	dx: number;
	dy: number;
  }
  
 export  interface Game {
	player1: Player;
	player2: Player;
	ball: Ball;
  }
  
 export  interface Match {
	game: Game;
	interval: NodeJS.Timer;
  }