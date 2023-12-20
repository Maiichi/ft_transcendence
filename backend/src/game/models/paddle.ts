import Constants from '../static/constants';
import Ball from './ball';
class Paddle {
  private _y: number;
  private _x: number;
  private _yMvAmount: number;

  constructor(
    x: number,
    y: number = Constants.PADDLE_INIT_Y,
    yMvAmount: number = Constants.PADDLE_MV_AMOUNT_INIT,
  ) {
    this._y = y;
    this._x = x;
    this._yMvAmount = yMvAmount;
  }

  public move(): void {
    if (this._yMvAmount === 0) return;
    this._y += this._yMvAmount;
    if (
      this._y + Constants.PADDLE_HEIGHT + Constants.PADDLE_BORDER_RADIUS >
      Constants.MAP_HEIGHT
    ) {
      this._y =
        Constants.MAP_HEIGHT -
        Constants.PADDLE_HEIGHT -
        Constants.PADDLE_BORDER_RADIUS;
      this._yMvAmount = 0;
      return;
    }
    if (this._y < Constants.PADDLE_BORDER_RADIUS) {
      this._y = Constants.PADDLE_BORDER_RADIUS;
      this._yMvAmount = 0;
      return;
    }
  }

  public autoMove(): void {
    this._y += this._yMvAmount;
    if (
      this._y + Constants.PADDLE_HEIGHT + Constants.PADDLE_BORDER_RADIUS >
      Constants.MAP_HEIGHT
    ) {
      this._y =
        Constants.MAP_HEIGHT -
        Constants.PADDLE_HEIGHT -
        Constants.PADDLE_BORDER_RADIUS;
      this._yMvAmount *= -1;
      return;
    }
    if (this._y < Constants.PADDLE_BORDER_RADIUS) {
      this._y = Constants.PADDLE_BORDER_RADIUS;
      this._yMvAmount *= -1;
      return;
    }
  }

  public reset(y: number = Constants.MIDDLE_PADDLE_INIT_Y): void {
    this._y = y;
  }

  public up(keydown: boolean): void {
    if (keydown) {
      this._yMvAmount = -Constants.PADDLE_MV_AMOUNT;
    } else {
      this._yMvAmount = 0;
    }
  }

  public down(keydown: boolean): void {
    if (keydown) {
      this._yMvAmount = Constants.PADDLE_MV_AMOUNT;
    } else {
      this._yMvAmount = 0;
    }
  }

  public getY(): number {
    return this._y;
  }

  public getX(): number {
    return this._x;
  }

  public isRightSide(): boolean {
    return this._x + Constants.PADDLE_WIDTH >= Constants.MAP_WIDTH;
  }

  public isVerticallyAlignedWithY(y: number): boolean {
    return (
      this._y + Constants.PADDLE_HEIGHT + Math.abs(this._yMvAmount) * 2 >=
        y - (Constants.BALL_RADIUS * 2) &&
      this._y - Math.abs(this._yMvAmount) * 2 <= y + (Constants.BALL_RADIUS * 2)
    );
  }

}

export default Paddle;
