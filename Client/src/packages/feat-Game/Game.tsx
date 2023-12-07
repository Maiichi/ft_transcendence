import React, { useEffect, useRef, useState } from "react";
import { GameMode, GameState } from "./utils/types";
import {
    WIDTH,
    HEIGHT,
    PADDLE_INIT_Y,
    MIDDLE_PADDLE_INIT_Y,
} from "./utils/constants";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import { GameCanvas } from "./components/GameCanvas";
import { Socket, io } from "socket.io-client";
import { ModalComponent, useAppDispatch, useAppSelector } from "../../core";
import { setOpenErrorSnackbar, setServerError } from "../../core/CoreSlice";
import { InviteUserToGame } from "./components/InviteGame";

export const Game: React.FC = () => {
    const ref = useRef<HTMLCanvasElement>(null);
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
    const [gameMode, setGameMode] = useState<GameMode>("Dual");
    const token = useAppSelector((state) => state.auth.token);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        // Establish the socket connection when the component mounts
        const SOCKET_URL = `${process.env.REACT_APP_BACKEND_URL}/game`;

        const newSocket = io(SOCKET_URL, {
            reconnectionDelayMax: 10000,
            extraHeaders: {
                authorization: `${token}`,
            },
        });

        // Set the socket in the state
        setSocket(newSocket);

        // Clean up the socket connection when the component unmounts
        return () => {
            newSocket.disconnect();
        };
    }, []); //

    socket?.on('joinQueueError', (data) => {
        dispatch(setServerError(data));
        dispatch(setOpenErrorSnackbar(true));
    })

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

    // console.log('socket outside ==', socket);
    useKeyboardControls(emitEvent, socket);

    onEvent("state", (newFrame: GameState) => {
        setFrame(newFrame);
    });

    // properties for modal
    const [open, setOpen] = useState(false);
    const [closeType, setCloseType] = useState<"auto" | "click" | undefined>(
      undefined
    );
    const [ChildModal, setChildModal] = useState<JSX.Element>(<></>);
    const handleClickModal = (
      childModal: JSX.Element,
      closeType?: "auto" | "click"
    ) => {
      console.log("handleClickModal called !!");
      setCloseType(closeType);
      setOpen(true);
      setChildModal(childModal);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <div>
            <ModalComponent
                open={open}
                ChildComponent={ChildModal}
                handleClose={handleClose}
                closeType={closeType}
            />
            <h1>Join a game</h1>
            <button
                id="btn_join_dual"
                onClick={() => {
                    handleClickModal(<InviteUserToGame selectedUser={null} handleClose={handleClose} />)
                }}
            >
                Invite player to game
            </button>
            <button
                id="btn_join_dual"
                onClick={() => {
                    setGameMode("Dual");
                    emitEvent("join_queue_match", "dual");
                }}
            >
                Dual Pong
            </button>
            <button
                id="btn_join_triple"
                onClick={() => {
                    setGameMode("Messy Jungle");
                    emitEvent("join_queue_match", "triple");
                }}
            >
                Messy Jungle
            </button>
            <br />
            <GameCanvas frame={frame} gameMode={gameMode} />
        </div>
    );
};
