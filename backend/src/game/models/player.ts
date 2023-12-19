import { Socket } from 'socket.io';
import Constants from '../static/constants';
import Paddle from './paddle';
class Player {
  private _socket: Socket;
  private _score: number;
  private _paddle: Paddle;
  private _interval: NodeJS.Timer;
  private _isRightSide: boolean;

  constructor(socket: Socket, isRightSide: boolean) {
    this._socket = socket;
    this._isRightSide = isRightSide;
    this._score = 0;
    if (isRightSide) {
      this._paddle = new Paddle(Constants.RIGHT_PADDLE_X);
    } else {
      this._paddle = new Paddle(Constants.LEFT_PADDLE_X);
    }
    this._interval = setInterval(
      () => this._paddle.move(),
      Constants.PADDLE_MV_FREQ,
    );
  }
  

  // increment score by 1 if it is less than MAX_SCORE,
  // and return true if the new score is MAX_SCORE,
  // otherwise return false
  public incrementScore(): boolean {
    if (this._score < Constants.MAX_SCORE) this._score++;
    return this._score == Constants.MAX_SCORE;
  }

  public getScore(): number {
    return this._score;
  }

  public isRightSide(): boolean {
    return this._isRightSide;
  }

  public getPaddle(): Paddle {
    return this._paddle;
  }

  public getSocket(): Socket {
    return this._socket;
  }

  // return true if the score is Constants.MAX_SCORE,
  // otherwise return false
  public hasWon(): boolean {
    return this._score === Constants.MAX_SCORE;
  }

  public disconnect(): void {
    clearInterval(this._interval);
    // this._socket.disconnect();
  }

  public penalize(): void {
    this._score = 0;
  }

  public reset(): void {
    this._score = 0;
    this._interval = setInterval(() => this._paddle.move(), Constants.PADDLE_MV_FREQ);
  }

  public award(scoreIncrement: number = 1): void {
    this._score += scoreIncrement;
    if (this._score > Constants.MAX_SCORE) this._score = Constants.MAX_SCORE;
  }
}

export default Player;
