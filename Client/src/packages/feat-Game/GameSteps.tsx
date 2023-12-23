import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../core";
import { Game } from "./Game";
import { InviteFriend } from "./components/InviteFriend";
import { MapSelection } from "./components/MapSelection";
import {
    inviteUserToGameFromChat,
    resetGame,
    setCountdown,
    setGameStep,
    setInviteAccepted,
} from "./redux/GameSlice";
import { STEPS } from "./utils/constants";
import { Socket, io } from "socket.io-client";
import { MatchLoading } from "./components/MatchLoading";
import { setOpenSnackbar, setServerMessage } from "../../core/CoreSlice";
import { GameState } from "./utils/types";
import { ContactPageSharp } from "@mui/icons-material";

export const GameSteps: React.FC = () => {
    const currentStep = useAppSelector((state) => state.gameState.currentStep);
    const dispatch = useAppDispatch();

    const token = useAppSelector((state) => state.auth.token);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [socketReady, setSocketReady] = useState<boolean>(false);

    useEffect(() => {
        // Establish the socket connection when the component mounts
        const SOCKET_URL = `${process.env.REACT_APP_BACKEND_URL}/game`;

        const newSocket = io(SOCKET_URL, {
            extraHeaders: {
                authorization: `${token}`,
            },
        });

        newSocket.on("connect", () => {
            setSocketReady(true);
        });
        // Set the socket in the state
        setSocket(newSocket);

        // Clean up the socket connection when the component unmounts
        return () => {
            newSocket.disconnect();
        };
    }, [token]); //

    socket?.on("joinQueueError", (data) => {
        dispatch(setServerMessage(data));
        dispatch(setOpenSnackbar(true));
    });

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

    onEvent("countdown", (count) => {
        // Update state with countdown value
        console.log("countdown");
        dispatch(setCountdown(count));
    });

    onEvent("state", (newFrame: GameState) => {
        if (newFrame.state === "WAITING")
            dispatch(setGameStep(STEPS.WAITING_QUEUE));
        else if (newFrame.state === "PLAYING")
            dispatch(setGameStep(STEPS.GAME_START));
    });

    // invite Game modal
    const isInviteAccepted = useAppSelector(
        (state) => state.gameState.inviteAccepted
    );
    // const isInviteDeclined = useAppSelector((state) => state.gameState.inviteDeclined);
    useEffect(() => {
        console.log("is this is shown at the inviter (invite) ");
        if (isInviteAccepted && socketReady) {
            console.log("invited joins the queue !!!!");
            console.log(" == socket == ", socket);
            // socket?.emit('join_queue_match_invitaion', "dual");
            emitEvent("join_queue_match_invitaion", "dual");
            dispatch(setGameStep(STEPS.WAITING_QUEUE));
            dispatch(setInviteAccepted(false));
        }
    }, [isInviteAccepted, socketReady]);

    const isChatInvite = useAppSelector((state) => state.gameState.chatInvite);
    console.log("isChatInvite === ", isChatInvite);
    const isOpponentAcceptInvite = useAppSelector(
        (state) => state.gameState.acceptOpponentInvite
    );
    console.log("isOpponentAcceptInvite === ", isOpponentAcceptInvite);
    useEffect(() => {
        console.log("is this is shown at the inviter (invite) ");
        if (isChatInvite && socketReady && isOpponentAcceptInvite) {
            console.log("inviter joins the queue !!!!");
            console.log(" == socket == ", socket);
            // socket?.emit('join_queue_match_invitaion', "dual");
            emitEvent("join_queue_match_invitaion", "dual");
            dispatch(setGameStep(STEPS.WAITING_QUEUE));
            dispatch(inviteUserToGameFromChat(false));
        }
    }, [isChatInvite, socketReady, isOpponentAcceptInvite]);

    useEffect(() => {
        console.log("is this is shown at the inviter (invite) ");
        if (socketReady && isOpponentAcceptInvite && !isChatInvite) {
            console.log("inviter joins the queue !!!!");
            console.log(" == socket == ", socket);
            // socket?.emit('join_queue_match_invitaion', "dual");
            emitEvent("join_queue_match_invitaion", "dual");
            dispatch(setGameStep(STEPS.WAITING_QUEUE));
            // dispatch(inviteUserToGameFromChat(false));
        }
    }, [socketReady, isOpponentAcceptInvite]);

    // Conditional rendering based on the current step
    const renderStep = () => {
        switch (currentStep) {
            case STEPS.SELECT_MAP:
                return <MapSelection socket={socket} onReset={handleReset} />;
            case STEPS.INVITE_FRIEND:
                return <InviteFriend socket={socket} onReset={handleReset} />;
            case STEPS.WAITING_QUEUE:
                return <MatchLoading socket={socket} onReset={handleReset} />;
            case STEPS.GAME_START:
                return <Game socket={socket} />;
            default:
                return <MapSelection socket={socket} onReset={handleReset} />;
        }
    };

    const handleReset = () => {
        dispatch(resetGame());
    };

    if (!socketReady) {
        return <div>Loading...</div>;
    }

    return <div>{renderStep()}</div>;
};
