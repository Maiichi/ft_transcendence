export type Ball = {
    x: number;
    y: number;
};

export type Paddles = {
    ly: number;
    ry: number;
    my: number;
};

export type Score = {
    p1: number;
    p2: number;
};

export type GameState = {
    ball: Ball;
    paddles: Paddles;
    score: Score;
    state: "WAITING" | "PLAYING" | "PAUSED" | "OVER";
    hasMiddlePaddle: boolean;
    hasWon: boolean;
};

export type GameMode = "dual" | "triple";

import { Socket } from "socket.io-client";
export type GameStepComponentProps = {
    socket: Socket | null;
    onNextStep?: () => void;
    onReset?: () => void;
};
