import styled from "styled-components";
import React, {  useState } from "react";
import {  GameState, GameStepComponentProps } from "./utils/types";
import {
  WIDTH,
  HEIGHT,
  PADDLE_INIT_Y,
  MIDDLE_PADDLE_INIT_Y,
} from "./utils/constants";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import { GameCanvas } from "./components/GameCanvas";

import {
  ButtonComponent,
  useAppDispatch,
  useAppSelector,
  useSize,
} from "../../core";
import { useNavigate } from "react-router-dom";
import { resetGameState } from "./redux/GameSlice";
import { Instructions } from "./components/Instructions";

const Title = styled.h1`
  font-size: 2rem; // Tailwind's text-4xl
  font-weight: bold; // Tailwind's font-bold
  text-align: center;
  flex-grow: 1; // Title takes up maximum space
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: center; // Center the contents
  align-items: center;
  width: 100%;
  margin-bottom: 1rem; // Space below the title container
`;

export const Game: React.FC<GameStepComponentProps> = ({ socket }) => {
  const { isTab } = useSize();
  const dispatch = useAppDispatch();

  const initialState: GameState = {
    ball: {
      x: WIDTH / 2,
      y: HEIGHT / 2,
    },
    paddles: {
      ly: PADDLE_INIT_Y,
      ry: PADDLE_INIT_Y,
      my: MIDDLE_PADDLE_INIT_Y,
    },
    score: {
      p1: 0,
      p2: 0,
    },
    state: "WAITING",
    hasMiddlePaddle: false,
    hasWon: false,
  };

  const [frame, setFrame] = useState<GameState>(initialState);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const gameMode = useAppSelector((state) => state.game.gameMode);
  const navigate = useNavigate();

  // Define emitEvent function
  const emitEvent = (event: string, data?: any) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  // Define onEvent function
  const onEvent = (event: string, handler: (data: any) => void) => {
    if (socket) {
      socket.on(event, handler);
    }
  };

  useKeyboardControls(emitEvent, socket);

  onEvent("state", (newFrame: GameState) => {
    setFrame(newFrame);
  });

  const handleResetGameState = () => {
    dispatch(resetGameState());
  };
  onEvent("gameEnds", () => {
    setIsEnd(true);
  });

  return (
    <div>
      <TitleContainer>
        <Instructions currentStep="game" />
        <Title>Show off your skills !</Title>
      </TitleContainer>
      <GameCanvas frame={frame} gameMode={gameMode} />
      {isEnd && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: `${isTab ? "column" : "row"}`,
            justifyContent: "center",
            alignItems: 'center',
            gap: "10px",
            marginTop: "1rem",
          }}
        >
          <ButtonComponent
            onClick={() => navigate("/gamesHistory")}
            title="Match history"
          />
          <ButtonComponent onClick={handleResetGameState} title="Restart" />
        </div>
      )}
    </div>
  );
};
