import { Socket } from 'socket.io';
import { GameStateEnum } from '../static/enums';
import Constants from '../static/constants';
import Ball from './ball';
import Player from './player';
import Paddle from './paddle';

interface BroadcastObject {
  ball: {
    x: number;
    y: number;
  };
  paddles: {
    ly: number;
    ry: number;
    my?: number;
  };
  score: {
    p1: number;
    p2: number;
  };
  state: GameStateEnum;
  hasMiddlePaddle: boolean;
}

class Game {
  private _id: string;
  private _player1: Player;
  private _player2: Player;
  private _middlePaddle?: Paddle;
  private _hasMiddlePaddle: boolean;
  private _ball: Ball;
  private _interval: NodeJS.Timer;
  private _endCallback: Function;

  constructor(
    player1: Player,
    player2: Player,
    endCallback: Function,
    hasMiddlePaddle: boolean = false,
  ) {
    this._id = this._generateId();
    this._player1 = player1;
    this._player2 = player2;
    this._ball = new Ball();
    this._interval = setInterval(() => this.play(), Constants.FPS);
    this._endCallback = endCallback;
    this._hasMiddlePaddle = hasMiddlePaddle;
    if (hasMiddlePaddle) {
      this._middlePaddle = new Paddle(
        Constants.MIDDLE_PADDLE_X,
        Constants.MIDDLE_PADDLE_INIT_Y,
        Constants.MIDDLE_PADDLE_MV_AMOUNT,
      );
    }
  }

  public restart(): void {
    if (this.isOver()) {
      this._id = this._generateId();
      this._ball.reset();
      this._player1.reset();
      this._player2.reset();
      this._interval = setInterval(() => this.play(), Constants.FPS);
    }
  }

  private _generateId(): string {
    let id: string = '';
    let characters: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength: number = characters.length;
    for (let i: number = 0; i < 25; i++) {
      id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return id;
  }

  public getId(): string {
    return this._id;
  }

  public getGameState(): GameStateEnum {
    if (
      this._player1.getScore() === Constants.MAX_SCORE ||
      this._player2.getScore() === Constants.MAX_SCORE
    ) {
      return GameStateEnum.OVER;
    } else if (this._ball.isPaused()) {
      return GameStateEnum.PAUSED;
    }
    return GameStateEnum.PLAYING;
  }

  public buildGameStateObject(): BroadcastObject {
    return {
      ball: {
        x: this._ball.getX(),
        y: this._ball.getY(),
      },
      paddles: {
        ly: this._player1.getPaddle().getY(),
        ry: this._player2.getPaddle().getY(),
        my: this._middlePaddle?.getY(),
      },
      score: {
        p1: this._player1.getScore(),
        p2: this._player2.getScore(),
      },
      state: this.getGameState(),
      hasMiddlePaddle: this._hasMiddlePaddle,
    };
  }

  private broadcastState(): void {
    const currentState = this.buildGameStateObject();
    this._player1
      .getSocket()
      .emit('state', { ...currentState, hasWon: this._player1.hasWon() });
    this._player2
      .getSocket()
      .emit('state', { ...currentState, hasWon: this._player2.hasWon() });
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public hasSockets(socket1: Socket, socket2: Socket): boolean {
    return (
      this._player1.getSocket() === socket1 &&
      this._player2.getSocket() === socket2
    );
  }

  private async awardAndPause(player: Player): Promise<void> {
    player.award();
    this._ball.reset();
    this.broadcastState();
    this._ball.pause();
    await this.delay(1500);
    this._ball.resume();
  }

  public play(): void {
    if (this._ball.handleHCollision(this._player1.getPaddle())) {
        this.awardAndPause(this._player2);
        this._middlePaddle?.reset();
    }
    if (this._ball.handleHCollision(this._player2.getPaddle())) {
        this.awardAndPause(this._player1);
        this._middlePaddle?.reset();
    }
    if (this._hasMiddlePaddle && !this._ball.isPaused()) {
      this._middlePaddle.autoMove();
      this._ball.handleMiddlePaddleCollision(this._middlePaddle);
    }
    this._ball.handleVCollision(0, Constants.MAP_HEIGHT);
    this._ball.move();
    this.broadcastState();
    if (this.getGameState() === GameStateEnum.OVER) {
      this.stop();
    }
  }

  public hasSocket(socket: Socket): boolean {
    return (
      this._player1.getSocket() === socket ||
      this._player2.getSocket() === socket
    );
  }

  public getPlayerBySocket(socket: Socket): Player {
    if (this._player1.getSocket() === socket) {
      return this._player1;
    } else if (this._player2.getSocket() === socket) {
      return this._player2;
    }
    return null;
  }

  public getSockets(): Socket[] {
    return [this._player1.getSocket(), this._player2.getSocket()];
  }

  public getGameType() : string {
    return this._hasMiddlePaddle ? "triple" : "dual";
  }

  public getPlayer() {
    return [this._player1, this._player2];
  }

  public handlePlayerDisconnect(socket: Socket): void {
    if (socket.id === this._player1.getSocket().id) {
      this._player1.penalize();
      this._player2.award(Constants.MAX_SCORE);
    } else if (socket.id === this._player2.getSocket().id) {
      this._player2.penalize();
      this._player1.award(Constants.MAX_SCORE);
    }
    this.broadcastState();
    this.stop();
  }

  public stop(): void {
    clearInterval(this._interval);
    this._player1.disconnect();
    this._player2.disconnect();
    this._endCallback(this);
  }

  public isOver(): boolean {
    return this.getGameState() === GameStateEnum.OVER;
  }

  public pause(): void {
    this._ball.pause();
  }
}

export default Game;
