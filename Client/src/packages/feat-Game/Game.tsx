import React, { useEffect, useRef, useState } from "react";
import { GameMode, GameState, GameStepComponentProps } from "./utils/types";
import {
    WIDTH,
    HEIGHT,
    PADDLE_INIT_Y,
    MIDDLE_PADDLE_INIT_Y,
    STEPS,
} from "./utils/constants";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import { GameCanvas } from "./components/GameCanvas";

import { ModalComponent, useAppDispatch, useAppSelector } from "../../core";
import { useNavigate } from "react-router-dom";
import { resetGameState, setCountdown, setGameStep } from "./redux/GameSlice";

export const Game: React.FC<GameStepComponentProps> = ({ socket }) => {
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
    const navigate = useNavigate();
    // const token = useAppSelector((state) => state.auth.token);
    // const [socket, setSocket] = useState<Socket | null>(null);
    // const [socketReady, setSocketReady] = useState<boolean>(false);

    // useEffect(() => {
    //     // Establish the socket connection when the component mounts
    //     const SOCKET_URL = `${process.env.REACT_APP_BACKEND_URL}/game`;

    //     const newSocket = io(SOCKET_URL, {
    //         extraHeaders: {
    //             authorization: `${token}`,
    //         },
    //     });

    //     newSocket.on("connect", () => {
    //         setSocketReady(true);
    //     });
    //     // Set the socket in the state
    //     setSocket(newSocket);

    //     // Clean up the socket connection when the component unmounts
    //     return () => {
    //         newSocket.disconnect();
    //     };
    // }, [token]); //

    // socket?.on("joinQueueError", (data) => {
    //     dispatch(setServerError(data));
    //     dispatch(setOpenErrorSnackbar(true));
    // });

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


    // // console.log('socket outside ==', socket);
    useKeyboardControls(emitEvent, socket);

    onEvent("state", (newFrame: GameState) => {
        setFrame(newFrame);
    });

   

    // onEvent("state", (newFrame: GameState) => {
    //     if (newFrame.state === "WAITING")
    //         dispatch(setGameStep(STEPS.WAITING_QUEUE));
    //     else if (newFrame.state === "PLAYING")
    //     {
    //         console.log("here *****")
    //         dispatch(setGameStep(STEPS.GAME_START));
    //     }
    // });


    const handleResetGameState = () => {
        dispatch(resetGameState());
    };

    onEvent("gameEnds", () => {
        setTimeout(() => {
            navigate('/gamesHistory');
            handleResetGameState();
        }, 1000);
    })

    // // invite Game modal
    // const isInviteAccepted = useAppSelector(
    //     (state) => state.gameState.inviteAccepted
    // );
    // // const isInviteDeclined = useAppSelector((state) => state.gameState.inviteDeclined);
    // useEffect(() => {
    //     console.log("is this is shown at the inviter (invite) ");
    //     if (isInviteAccepted && socketReady) {
    //         console.log("invited joins the queue !!!!");
    //         console.log(" == socket == ", socket);
    //         // socket?.emit('join_queue_match_invitaion', "dual");
    //         emitEvent("join_queue_match_invitaion", "dual");
    //         dispatch(setInviteAccepted(false));
    //     }
    // }, [isInviteAccepted, socketReady]);

    // const isChatInvite = useAppSelector((state) => state.gameState.chatInvite);
    // const isOpponentAcceptInvite = useAppSelector(
    //     (state) => state.gameState.acceptOpponentInvite
    // );
    // useEffect(() => {
    //     console.log("is this is shown at the inviter (invite) ");
    //     if (isChatInvite && socketReady && isOpponentAcceptInvite) {
    //         console.log("inviter joins the queue !!!!");
    //         console.log(" == socket == ", socket);
    //         // socket?.emit('join_queue_match_invitaion', "dual");
    //         emitEvent("join_queue_match_invitaion", "dual");
    //         dispatch(inviteUserToGameFromChat(false));
    //     }
    // }, [isChatInvite, socketReady, isOpponentAcceptInvite]);

    // useEffect(() => {
    //     console.log("is this is shown at the inviter (invite) ");
    //     if (socketReady && isOpponentAcceptInvite) {
    //         console.log("inviter joins the queue !!!!");
    //         console.log(" == socket == ", socket);
    //         // socket?.emit('join_queue_match_invitaion', "dual");
    //         emitEvent("join_queue_match_invitaion", "dual");
    //         dispatch(inviteUserToGameFromChat(false));
    //     }
    // }, [socketReady, isOpponentAcceptInvite]);

    // properties for modal
    // const [open, setOpen] = useState(false);
    // const [closeType, setCloseType] = useState<"auto" | "click" | undefined>(
    //     undefined
    // );
    // const [ChildModal, setChildModal] = useState<JSX.Element>(<></>);
    // const handleClickModal = (
    //     childModal: JSX.Element,
    //     closeType?: "auto" | "click"
    // ) => {
    //     setCloseType(closeType);
    //     setOpen(true);
    //     setChildModal(childModal);
    // };
    // const handleClose = () => {
    //     setOpen(false);
    // };

    // Wait until the socket is ready before rendering the game component
    // if (!socketReady) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
            {/* <ModalComponent
                open={open}
                ChildComponent={ChildModal}
                handleClose={handleClose}
                closeType={closeType}
            />
            <h1>Pong Game</h1>
            <button
                id="invite_user_to_game"
                onClick={() => {
                    socket &&
                        handleClickModal(
                            <InviteUserToGame
                                selectedUser={null}
                                socket={socket}
                                handleClose={handleClose}
                            />
                        );
                }}
            >
                Invite player to game
            </button> */}
            {/* <button
                id="btn_join_dual"
                onClick={() => {
                    setGameMode("Dual");
                    emitEvent("join_queue_match", "dual");
                }}
            >
                Dual Pong
            </button> */}
            {/* <button
                id="btn_join_triple"
                onClick={() => {
                    setGameMode("Messy Jungle");
                    emitEvent("join_queue_match", "triple");
                }}
            >
                Messy Jungle
            </button> */}
            <br />
            <GameCanvas frame={frame} gameMode={gameMode} />
        </div>
    );
};

