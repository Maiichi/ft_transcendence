import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { GameService } from './game.service';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import Game from './models/game';
import Player from './models/player';

@WebSocketGateway({
  namespace: "game",
  cors: {
    origin: `${process.env.FRONTEND_URL}/game`,
    credentials: true,
  }
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit{
  constructor(private readonly gameService: GameService) {}

  @WebSocketServer()
  server: Server;
  
  private logger: Logger = new Logger('MatchGateway');

  private unique: Set<Socket> = new Set();
  private normalGameQueue: Socket[] = [];
  private tripleGameQueue: Socket[] = [];
  private games: Game[] = [];

  handleConnection(client: Socket, ...args: any[]) {
    // this.logger.log(`Client connected: ${client.id}`);
    console.log(`--------Gamer connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    // this.logger.log(`Client disconnected: ${client.id}`);
    console.log(`--------Gamer disconnected: ${client.id}`);
    const game = this.games.find((gm) => gm.hasSocket(client));
    if (game) {
      game.handlePlayerDisconnect(client);
      game.stop();
    }
  }

  afterInit(server: any) {
    this.logger.log('Initialized');
  }

  @SubscribeMessage('up_paddle')
  handleUpPaddle(client: Socket, payload: any): void {
    let game = this.games.find((gm) => gm.hasSocket(client));
    if (game) {
      let player = game.getPlayerBySocket(client);
      if (payload === 'down') {
        console.log('up_paddle down')
        player.getPaddle().up(true);
      } else if (payload === 'up') {
        console.log('up_paddle up')
        player.getPaddle().up(false);
      }
    }
  }

  @SubscribeMessage('down_paddle')
  handleDownPaddle(client: Socket, payload: any): void {
    let game = this.games.find((gm) => gm.hasSocket(client));
    if (game) {
      let player = game.getPlayerBySocket(client);
      if (payload === 'down') {
        console.log('down_paddle down')
        player.getPaddle().down(true);
      } else if (payload === 'up') {
        console.log('down_paddle up')
        player.getPaddle().down(false);
      }
    }
  }

  private _removeOverGame(game: Game): void {
    const sockets = game.getSockets();
    this.unique.delete(sockets[0]);
    this.unique.delete(sockets[1]);
    this.games.splice(this.games.indexOf(game), 1);
    console.log('removeOverGame : ' + game.getId());
    // this.logger.log(`number of current games: ${this.games.length}`);
    console.log(`number of current games: ${this.games.length}`);
  }

  private _startNewGame(socketsArr: Socket[], payload: any): void {
    console.log('startNewGame');
    this.games.push(
      new Game(
        new Player(socketsArr[0], false),
        new Player(socketsArr[1], true),
        this._removeOverGame.bind(this),
        payload === 'triple',
      ),
    );
    // console.log("game :" ,this.games.at(0));
  }

  @SubscribeMessage('join_queue_match')
  joinQueue(client: Socket, payload: any) {
    if (this.unique.has(client)) {
      console.log('unique ==', this.unique);
      console.log('it goes here');
      return;
    }
    // this.logger.log(`Client ${client.id} joined queue`);
    console.log(`Client ${client.id} joined queue`);
    this.unique.add(client);
    console.log("norrmalQueue Before :\n",this.normalGameQueue.length);
    if (payload === 'dual') {
      if (this.normalGameQueue.push(client) > 1)
        this._startNewGame([this.normalGameQueue.shift(), this.normalGameQueue.shift()], 'dual');
    }
    else if (payload === 'triple') {
      if (this.tripleGameQueue.push(client) > 1)
      this._startNewGame([this.tripleGameQueue.shift(), this.tripleGameQueue.shift()], 'triple');
    }
    // console.log("norrmalQueue after: \n",this.normalGameQueue.length);
  }
  // private   matchmakingQueue: string[] = [];
  // private logger: Logger = new Logger('Game Gateway');

  // afterInit(server : Server) {
  //   this.logger.log('Game Server Initialized!');
  // }

  // handleConnection(client: Socket, ...args: any[]) {
  //   console.log('---------Gamer connected', client.id);
  //   // this.logger.log(`Client connected: ${client.id}`);
  // }

  // handleDisconnect(client: Socket) {
  //   console.log('---------Gamer disconnected', client.id);
  //   // this.logger.log(`Client disconnected: ${client.id}`);
  // }

  // @SubscribeMessage('joinQueue')
  // async handleGameConnect(client: Socket)
  // {
  //   this.matchmakingQueue.push(client.id);
  //   console.log(this.matchmakingQueue);
  // }
  
  // @SubscribeMessage('leaveQueue')
  // async handleGameDisconnect(client: Socket)
  // {
  //   const index = this.matchmakingQueue.indexOf(client.id);
  //   if (index !== -1) {
  //     this.matchmakingQueue.splice(index, 1);
  //   }
  // }






}
