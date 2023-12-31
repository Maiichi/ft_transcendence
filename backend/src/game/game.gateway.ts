import { OnGatewayConnection, 
          OnGatewayDisconnect, 
          OnGatewayInit, 
          SubscribeMessage, 
          WebSocketGateway, 
          WebSocketServer,
          WsException
      } from '@nestjs/websockets';
import { GameService } from './game.service';
import { JwtService } from '@nestjs/jwt';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import Game from './models/game';
import Player from './models/player';
import { UserService } from 'src/user/user.service';
import { BlacklistService } from 'src/user/blacklist/blacklist.service';

@WebSocketGateway({
  namespace: "game",
  cors: {
    origin: `${process.env.FRONTEND_URL}/game`,
    credentials: true,
  }
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit{
  constructor(
    private readonly gameService: GameService,
    private userService: UserService,
    private blacklistService: BlacklistService,
    private jwtService: JwtService,
    ) {}

  @WebSocketServer()
  server: Server;
  
  private logger: Logger = new Logger('MatchGateway');

  private unique: Set<Socket> = new Set();
  private playerSockets = new Map<number, string[]>();
  private normalGameQueue: Socket[] = [];
  private separateNormalGameQueue: Socket[] = [];
  private tripleGameQueue: Socket[] = [];
  private separateTripleGameQueue: Socket[] = [];
  private invitationGameQueue : Socket[] = [];
  private games: Game[] = [];

  private getUserIdFromSocketId(socketId: string): number | null {
    for (const [userId, sockets] of this.playerSockets.entries()) {
      if (sockets.includes(socketId)) {
        return userId;
      }
    }
    return null;
  }


  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization;
    try {
      const decodedToken =
        await this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET,
        });
      const user = await this.userService.getUser(decodedToken.sub);
      if (!user) {
        throw new WsException('User not found.');
      }
      if (!this.playerSockets.has(user.intraId)) {
        this.playerSockets.set(user.intraId, []);
      }
      this.playerSockets.get(user.intraId).push(client.id);
    } catch (error) {
      client.disconnect();
      const response = {
        success: false,
        message: error.message,
      };
      return response;
    }
  }

  handleDisconnect(client: Socket) {
    const intraId = this.getUserIdFromSocketId(client.id);
    if (intraId)
    {
      const game = this.games.find((_game) => _game.hasSocket(client));
      if (game) {
        this.gameService.updateUserStatusInGame(intraId, false);
        game.handlePlayerDisconnect(client);
        // game.stop();
      }
      const socketsOfPlayer = this.playerSockets.get(intraId) || [];
      const updatedSockets = socketsOfPlayer.filter(
        (socketId) => socketId !== client.id
      );
      
      if (updatedSockets.length === 0)
      {
        this.gameService.updateUserStatusInGame(intraId, false);
        this.playerSockets.delete(intraId);
      }
      else
        this.playerSockets.set(intraId, updatedSockets);
     
      client.disconnect();
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
        player.getPaddle().up(true);
      } else if (payload === 'up') {
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
        player.getPaddle().down(true);
      } else if (payload === 'up') {
        player.getPaddle().down(false);
      }
    }
  }

  async _storeGame(game : Game)
  {
    let winnerSocket;
    const players = game.getPlayer();

    if (players[1].getScore() > players[0].getScore())
      winnerSocket = players[1].getSocket();
    else if (players[1].getScore() < players[0].getScore())
      winnerSocket = players[0].getSocket();
    const winnerId = this.getUserIdFromSocketId(winnerSocket.id);

    // Filter out null values from playersIds array
    const playersIds: number[] = [players[0], players[1]].map(
      player => this.getUserIdFromSocketId(player.getSocket().id)).filter(id => id !== null);
    // Call the saveGame method in GameService
    await this.gameService.saveGame({
      gameMode: game.getGameType(),
      score1: players[0].getScore(),
      score2: players[1].getScore(),
      winnerId: winnerId,
      players: playersIds,
    });
    // save the achievement
    await this.gameService.saveAchievement(playersIds[0], game.getGameType());
    await this.gameService.saveAchievement(playersIds[1], game.getGameType());
  }

  private async _removeOverGame(game: Game) {
    const sockets = game.getSockets();
    sockets.forEach((socket) => {
      if (this.getUserIdFromSocketId(socket.id))
      {
        this.gameService.updateUserStatusInGame(
          this.getUserIdFromSocketId(socket.id), 
          false);
      }
        this.server.to(socket.id).emit('gameEnds');
    });
    this.unique.delete(sockets[0]);
    this.unique.delete(sockets[1]);
    await this._storeGame(game);
    this.games.splice(this.games.indexOf(game), 1);
  }

  
  private async _startNewGame(socketsArr: Socket[], payload: any) {
    let countdown = 5; // 5 seconds countdown
      let interval = setInterval(() => {
        socketsArr.forEach((socket) => {
          this.server
          .to(socket.id)
          .emit('countdown', countdown);
        });
        
        countdown--;

        if (countdown < 0) {
          clearInterval(interval);
          socketsArr.forEach((socket) => {
            this.gameService.updateUserStatusInGame(
              this.getUserIdFromSocketId(socket.id), true);
          });
          this.games.push(
            new Game(
              new Player(socketsArr[0], false),
              new Player(socketsArr[1], true),
              this._removeOverGame.bind(this),
              payload === 'triple',
            ),
          );
        }
      }, 1000);
    
  }

  @SubscribeMessage('join_queue_match')
  async joinQueue(client: Socket, payload: any) {
    // get the user and check if he's already in game
    const userId = this.getUserIdFromSocketId(client.id);
    const user = await this.userService.getUserInfos(userId);
    if (user && user.inGame)
    {
      this.server.to(client.id).emit('joinQueueError', `You cannot join. You're currently playing a game`);
      return;
    }
    if (this.unique.has(client)) {
      const message = `You cannot join again. You're already in the matchmaking queue`;
      this.server.to(client.id).emit('joinQueueError', message);
      return;
    }
    this.unique.add(client);

    const blacklist = await this.blacklistService.getBlacklistUsers(this.getUserIdFromSocketId(client.id));
   
    // check if the user is another queue;
    const isInQueue = 
      this.normalGameQueue.some(player => this.getUserIdFromSocketId(player.id) === userId) ||
      this.tripleGameQueue.some(player => this.getUserIdFromSocketId(player.id) === userId) ||
      this.invitationGameQueue.some(player => this.getUserIdFromSocketId(player.id) === userId);

    if (isInQueue) {
      const message = `You're already in a queue. Cannot join again.`;
      this.server.to(client.id).emit('joinQueueError', message);
      return;
    }
    if (payload === 'dual') {
      if (this.normalGameQueue.length === 0) {
        this.normalGameQueue.push(client);
      } else if (this.normalGameQueue.length === 1) {
        const existingUser = this.normalGameQueue[0];
        const existingUserId = this.getUserIdFromSocketId(existingUser.id);
    
        // Check if the existing user is not in the blacklist of the joining user
        if (!blacklist.includes(existingUserId)) {
          this.normalGameQueue.push(client);
          await this._startNewGame([this.normalGameQueue.shift(), this.normalGameQueue.shift()], 'dual');
        } else {
          // Join the new user in the separate queue
          if (this.separateNormalGameQueue.push(client) > 1)
            await this._startNewGame([this.separateNormalGameQueue.shift(), this.separateNormalGameQueue.shift()], 'dual');
        }
      }
    }
    else if (payload === 'triple') {
      if (this.tripleGameQueue.length === 0) {
        this.tripleGameQueue.push(client);
      } else if (this.tripleGameQueue.length === 1) {
        const existingUser = this.tripleGameQueue[0];
        const existingUserId = this.getUserIdFromSocketId(existingUser.id);
        // Check if the existing user is not in the blacklist of the joining user
        if (!blacklist.includes(existingUserId)) {
          this.tripleGameQueue.push(client);
          await this._startNewGame([this.tripleGameQueue.shift(), this.tripleGameQueue.shift()], 'triple');
        } else {
          // Join the new user in the separate queue
          if (this.separateTripleGameQueue.push(client) > 1)
            await this._startNewGame([this.separateTripleGameQueue.shift(), this.separateTripleGameQueue.shift()], 'triple');
        }
      }
    }
  }
  
	@SubscribeMessage('join_queue_match_invitaion')
  async joinQueueInvitation(client: Socket, payload: any) {
    try {
      // get the user and check if he's already in game
      const userId = this.getUserIdFromSocketId(client.id);
      const user = await this.userService.getUserInfos(userId);
      if (user && user.inGame)
      {
        this.server.to(client.id).emit('joinQueueError', `You cannot join. You're currently playing a game`);
        return;
      }
     
      if (this.unique.has(client)) {
        const message = `You cannot join again.`;
        // need to emit an event to tell the user that he's already in the queue.
        this.server.to(client.id).emit('joinQueueError', message);
        return;
      }
      this.unique.add(client);
      const isInQueue = 
        this.normalGameQueue.some(player => this.getUserIdFromSocketId(player.id) === userId) ||
        this.tripleGameQueue.some(player => this.getUserIdFromSocketId(player.id) === userId) || 
        this.invitationGameQueue.some(player => this.getUserIdFromSocketId(player.id) === userId);

      if (isInQueue) {
        const message = `You're already in a queue. Cannot join again.`;
        this.server.to(client.id).emit('joinQueueError', message);
        return;
      }
      if (payload === 'dual') {
        if (this.invitationGameQueue.push(client) > 1)
          this._startNewGame([this.invitationGameQueue.shift(), this.invitationGameQueue.shift()], 'dual');
      }
      if (payload === 'triple') {
        if (this.invitationGameQueue.push(client) > 1)
          this._startNewGame([this.invitationGameQueue.shift(), this.invitationGameQueue.shift()], 'triple');
      }
    } catch (error) {
      client.emit('joinQueueError' , error);
    }
  }

  private removeFromQueue(client: Socket, queue: Socket[]): void {
    const index = queue.indexOf(client);
    if (index !== -1) {
      queue.splice(index, 1);
    }
  }

  @SubscribeMessage('cancelGame')
  async cancelGame(client: Socket) {
    // Remove the user from all queues
    this.removeFromQueue(client, this.normalGameQueue);
    this.removeFromQueue(client, this.tripleGameQueue);
    this.removeFromQueue(client, this.invitationGameQueue);
    this.removeFromQueue(client, this.separateNormalGameQueue);
    this.removeFromQueue(client, this.separateTripleGameQueue);
    // this.removeFromQueue(client, this.unique);
    if (this.unique.has(client)) {
      this.unique.delete(client);
    }
  }
}
