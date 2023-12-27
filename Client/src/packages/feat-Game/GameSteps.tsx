import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../core";
import { Game } from "./Game";
import { InviteFriend } from "./components/InviteFriend";
import { MapSelection } from "./components/MapSelection";
import { STEPS } from "./utils/constants";
import { Socket, io } from "socket.io-client";
import { MatchLoading } from "./components/MatchLoading";
import { setOpenSnackbar, setServerMessage } from "../../core/CoreSlice";
import { GameState } from "./utils/types";
import { resetGame, resetGameState, setCountdown, setGameStep } from "./redux/GameSlice";

export const GameSteps: React.FC = () => {
    const currentStep = useAppSelector((state) => state.game.currentStep);
    console.log("current Step == ", currentStep);
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
        handleReset();
        dispatch(setServerMessage(data));
        dispatch(setOpenSnackbar(true));
    });

    const isCurrentTab = useAppSelector((state) => state.game.currentTab);

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

    

    onEvent("state", (newFrame: GameState) => {
        if (newFrame.state === "WAITING" && isCurrentTab)
            dispatch(setGameStep(STEPS.WAITING_QUEUE));
        else if (newFrame.state === "PLAYING" && isCurrentTab)
            dispatch(setGameStep(STEPS.GAME_START));
    });

    onEvent("countdown", (count) => {
        // Update state with countdown value
        console.log("countdown");
        dispatch(setCountdown(count));
    });

    
    const isInviteAccepted = useAppSelector((state) => state.game.inviteAccepted);
    const invited = useAppSelector((state) => state.game.invited);

    // those event for the invited {from gameComponent}
    useEffect(() => {
        console.log("sender invite");
        if (isCurrentTab && isInviteAccepted && invited && socketReady)
        {
            console.log("sender joins the queue invite");
            dispatch(setGameStep(STEPS.WAITING_QUEUE));
            emitEvent("join_queue_match_invitaion", "dual");
        }
    }, [isCurrentTab, isInviteAccepted, invited, socketReady]);

    const inviter = useAppSelector((state) => state.game.inviter);
    const isInviteReceived = useAppSelector((state) => state.game.inviteReceived);
    // those event for the invited
    useEffect(() => {
        if (isCurrentTab && isInviteReceived && inviter && socketReady)
        {
            console.log("receiver joins the queue invite");
            dispatch(setGameStep(STEPS.WAITING_QUEUE));
            emitEvent("join_queue_match_invitaion", "dual");
        }
    }, [isCurrentTab, isInviteReceived, inviter, socketReady]);

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
