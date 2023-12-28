import { Socket } from "socket.io-client";
import { WIDTH, HEIGHT, PADDLE_HEIGHT, PADDLE_WIDTH } from "./constants";
import { GameMode } from "./types";

export const handleKeyDown = (
    e: KeyboardEvent,
    emitEvent: (event: string, data?: any) => void,
    socket: Socket | null
) => {
    if (socket && e.code === "ArrowUp") {
        emitEvent("up_paddle", "down");
    } else if (socket && e.code === "ArrowDown") {
        emitEvent("down_paddle", "down");
    }
};
export const handleKeyUp = (
    e: KeyboardEvent,
    emitEvent: (event: string, data?: any) => void,
    socket: Socket | null
) => {
    if (socket && e.code === "ArrowUp") {
        emitEvent("up_paddle", "up");
    } else if (socket && e.code === "ArrowDown") {
        emitEvent("down_paddle", "up");
    }
};

export const drawJungleBackground = (
    ctx: CanvasRenderingContext2D | null | undefined
) => {
    if (ctx) {
        ctx.fillStyle = "#0B3D0B";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        draw_separator(ctx);
    }
};

export const clear_init = (
    ctx: CanvasRenderingContext2D | null | undefined,
    gameMode: GameMode
) => {
    if (ctx) {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.beginPath();
        ctx.fillStyle = gameMode === "triple" ? "#0B3D0B" : "#1B1B1B";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        draw_separator(ctx);
    }
};

export const draw_ball = (
    ctx: CanvasRenderingContext2D | null | undefined,
    color: string,
    x: number,
    y: number,
    radius: number,
    gameMode: GameMode
) => {
    if (ctx) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        // Change ball color for Jungle mode
        ctx.fillStyle = gameMode === "triple" ? "#FFD700" : color;
        ctx.fill();
    }
};

export const draw_paddle = (
    ctx: CanvasRenderingContext2D | null | undefined,
    color: string,
    x: number,
    y: number,
    gameMode: GameMode
) => {
    if (ctx) {
        // Change paddle color for Jungle mode
        ctx.fillStyle = gameMode === "triple" ? "#964B00" : color; // Brown color for jungle mode
        ctx.fillRect(x, y, PADDLE_WIDTH, PADDLE_HEIGHT);
        draw_ball(
            ctx,
            ctx.fillStyle,
            x + PADDLE_WIDTH / 2,
            y,
            PADDLE_WIDTH / 2,
            gameMode
        );
        draw_ball(
            ctx,
            ctx.fillStyle,
            x + PADDLE_WIDTH / 2,
            y + PADDLE_HEIGHT,
            PADDLE_WIDTH / 2,
            gameMode
        );
    }
};

export const draw_text = (
    ctx: CanvasRenderingContext2D | null | undefined,
    text: string,
    color: string,
    font: string,
    x: number,
    y: number,
    gameMode: GameMode
) => {
    if (ctx) {
        // Change text color for Jungle mode
        ctx.fillStyle = gameMode === "triple" ? "#3CB371" : color; // Jungle green for text in jungle mode
        ctx.font = font;
        ctx.fillText(text, x, y);
    }
};

export const draw_separator = (
    ctx: CanvasRenderingContext2D | null | undefined
) => {
    if (ctx) {
        ctx.strokeStyle = "#FFFFFF";
        ctx.setLineDash([10, 15]);
        ctx.beginPath();
        ctx.moveTo(WIDTH / 2, 0);
        ctx.lineTo(WIDTH / 2, HEIGHT);
        ctx.stroke();
    }
};
