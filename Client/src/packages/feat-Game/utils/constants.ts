export const WIDTH = 1100;
export const HEIGHT = 600;
export const PADDLE_HEIGHT = HEIGHT / 6;
export const PADDLE_WIDTH = 20;
export const BALL_RADIUS = 9;
export const L_PADDLE_X = 0;
export const R_PADDLE_X = WIDTH - PADDLE_WIDTH;
export const M_PADDLE_X = WIDTH / 2 - PADDLE_WIDTH / 2;
export const PADDLE_INIT_Y = HEIGHT / 2 - PADDLE_HEIGHT / 2;
export const MIDDLE_PADDLE_INIT_Y = HEIGHT - PADDLE_HEIGHT - PADDLE_WIDTH / 2;

// Game steps
export const STEPS = {
    SELECT_MAP: "SELECT_MAP",
    INVITE_FRIEND: "INVITE_FRIEND",
    WAITING_QUEUE: "WAITING_QUEUE",
    GAME_START: "GAME_START",
};

export const MODES = {
    DUAL: "dual",
    TRIPLE: "triple",
};
