import Constants from '../static/constants';
import Paddle from './paddle';

class Ball {
  private _x: number;
  private _y: number;
  private _xdirection: number;
  private _ydirection: number;
  private _mvAmount: number;
  private _isScoring: boolean;
  private _hits: number;

  constructor() {
    this._x = Constants.MAP_WIDTH / 2;
    this._y = Constants.MAP_HEIGHT / 2;
    this._xdirection = 1;
    this._ydirection = 1;
    this._mvAmount = Constants.BALL_INIT_MV_AMOUNT;
    this._isScoring = false;
    this._hits = 0;
  }

  public reset(): void {
    this._x = Constants.MAP_WIDTH / 2;
    this._y = Constants.MAP_HEIGHT / 2;
    this._mvAmount = Constants.BALL_INIT_MV_AMOUNT;
    this._isScoring = false;
    this._hits = 0;
  }

  public move(): void {
    this._x += this._xdirection * this._mvAmount;
    this._y += this._ydirection * this._mvAmount;

  }

  handleVCollision(yMin: number, yMax: number): void {
    if (
      this._y + Constants.BALL_RADIUS >= yMax ||
      this._y - Constants.BALL_RADIUS <= yMin
    ) {
      this._ydirection *= -1;
    }
  }

  public isHCollision(x: number, isRightSide: boolean): boolean {
    return isRightSide
      ? this._x + Constants.BALL_RADIUS >= x
      : this._x - Constants.BALL_RADIUS <= x;
  }

  public isScoring(): boolean {
    return this._isScoring;
  }

  public setScoring(): void {
    this._isScoring = true;
  }

  public hitPaddle(): void {
    if (this._isScoring) return;
    this._hits++;
    if (this._hits % Constants.MAX_HITS_BEFORE_INCREASE === 0) {
      this._mvAmount += Constants.BALL_MV_AMOUNT_INCREASE;
      if (this._mvAmount > Constants.BALL_MAX_MV_AMOUNT) {
        this._mvAmount = Constants.BALL_MAX_MV_AMOUNT;
      }
    }
    if (this._hits === Constants.MAX_HITS_BEFORE_INCREASE) {
      this._hits = 0;
    }
    this._xdirection *= -1;
  }

  public handleHCollision(paddle: Paddle): boolean {
    if (this.isHCollision(paddle.getX(), paddle.isRightSide())) {
      if (
        paddle.isRightSide() &&
        this.isHCollision(
          Constants.MAP_WIDTH + Constants.MAX_DISTANCE_FROM_MAP_EDGE,
          true,
        )
      ) {
        return true;
      } else if (
        !paddle.isRightSide() &&
        this.isHCollision(-Constants.MAX_DISTANCE_FROM_MAP_EDGE, false)
      ) {
        return true;
      } else if (!this._isScoring && paddle.isVerticallyAlignedWithY(this._y)) {
        this.hitPaddle();
        return false;
      } else {
        this.setScoring();
        return false;
      }
    }
  }

  public handleMiddlePaddleCollision(paddle: Paddle): boolean {
    if (
      // ball is on the left side && ball is in collision with the middle paddle
      ((this._x < Constants.MAP_WIDTH / 2 &&
        this._x + Constants.BALL_RADIUS > paddle.getX()) ||
        // ball is on the right side && ball is in collision with the middle paddle
        (this._x > Constants.MAP_WIDTH / 2 &&
          this._x - Constants.BALL_RADIUS < paddle.getX() + Constants.PADDLE_WIDTH)) &&
      // ball is aligned with the middle paddle
      this._y + Constants.BALL_RADIUS >= paddle.getY() &&
      this._y - Constants.BALL_RADIUS <=
        paddle.getY() + Constants.PADDLE_HEIGHT + Constants.PADDLE_BORDER_RADIUS
    ) {
      this._xdirection *= -1;
      return true;
    }
    return false;
  }

  public reverseAllAxis(): void {
    this._xdirection *= -1;
    this._ydirection *= -1;
  }

  public pause(): void {
    this._mvAmount = 0;
  }

  public resume(): void {
    this._mvAmount = Constants.BALL_INIT_MV_AMOUNT;
  }

  public isPaused(): boolean {
    return this._mvAmount === 0;
  }

  public getMvAmount(): number {
    return this._mvAmount;
  }

  public getX(): number {
    return this._x;
  }

  public getY(): number {
    return this._y;
  }

  public getHits(): number {
    return this._hits;
  }
}

export default Ball;
