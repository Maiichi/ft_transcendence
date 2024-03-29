import React, { useRef, useEffect } from "react";
import { GameMode, GameState } from "../utils/types";
import {
    drawJungleBackground,
    clear_init,
    draw_ball,
    draw_paddle,
    draw_text,
} from "../utils/drawing";
import {
    WIDTH,
    HEIGHT,
    L_PADDLE_X,
    R_PADDLE_X,
    M_PADDLE_X,
    BALL_RADIUS,
} from "../utils/constants";
import styled from "styled-components";

type CanvasProps = {
    frame: GameState;
    gameMode: GameMode;
};

const CanvasContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: ${WIDTH}px; // Maximum width
    max-height: ${HEIGHT}px; // Maximum height
    background: red;
    margin: auto; // Center the container
    box-sizing: border-box; // Include padding in the container's dimensions
`;

// Styled canvas with responsive width and height
const StyledCanvas = styled.canvas`
    max-width: 100%;
    max-height: 100%;
    display: block;
`;

export const GameCanvas: React.FC<CanvasProps> = ({ frame, gameMode }) => {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;

        const ctx = canvas?.getContext("2d");

        function draw() {
            if (gameMode === "triple") {
                drawJungleBackground(ctx);
            } else {
                clear_init(ctx, gameMode);
            }

            draw_text(
                ctx,
                frame.score.p1.toString(),
                "#FFFFFF",
                "50px gameFont",
                3 * (WIDTH / 8),
                HEIGHT / 12,
                gameMode
            );
            draw_text(
                ctx,
                frame.score.p2.toString(),
                "#FFFFFF",
                "50px gameFont",
                5 * (WIDTH / 8) - 5,
                HEIGHT / 12,
                gameMode
            );
            draw_ball(
                ctx,
                "#FFEE00",
                frame.ball.x,
                frame.ball.y,
                BALL_RADIUS,
                gameMode
            );

            draw_paddle(ctx, "#00D897", L_PADDLE_X, frame.paddles.ly, gameMode);
            if (frame.hasMiddlePaddle && gameMode === "triple") {
                draw_paddle(
                    ctx,
                    "#D6D6D6",
                    M_PADDLE_X,
                    frame.paddles.my,
                    gameMode
                );
            }
            draw_paddle(ctx, "#FF6B6B", R_PADDLE_X, frame.paddles.ry, gameMode);

            if (frame.state === "OVER") {
                draw_text(
                    ctx,
                    "Game Over",
                    "#FFFFFF",
                    "50px gameFont",
                    WIDTH / 2 - 115,
                    HEIGHT / 3,
                    gameMode
                );
                draw_text(
                    ctx,
                    frame.hasWon ? "You Won" : "You Lost",
                    frame.hasWon ? "#00FF15" : "#FF0000",
                    "80px gameFont",
                    WIDTH / 2 - 150,
                    2 * (HEIGHT / 3),
                    gameMode
                );
            }
        }

        draw();
    }, [frame, gameMode]);

    return (
        <CanvasContainer>
            <StyledCanvas width={WIDTH} height={HEIGHT} ref={ref} />
        </CanvasContainer>
    );
};
