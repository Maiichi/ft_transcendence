import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../core";
import { Game } from "./Game";
import { InviteFriend } from "./components/InviteFriend";
import { MapSelection } from "./components/MapSelection";
import { STEPS } from "./utils/constants";
import { Socket, io } from "socket.io-client";
import { MatchLoading } from "./components/MatchLoading";
import {
  setOpenSnackbar,
  setServerMessage,
  setSeverity,
} from "../../core/CoreSlice";
import { GameState } from "./utils/types";
import {
  resetGame,
  resetGameState,
  setCountdown,
  setGameStep,
} from "./redux/GameSlice";

export const GameSteps: React.FC = () => {
    const dispatch = useAppDispatch();
    
    const token = useAppSelector((state) => state.auth.token);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [socketReady, setSocketReady] = useState<boolean>(false);
    
    
    const currentStep = useAppSelector((state) => state.game.currentStep);
    const gameMode = useAppSelector((state) => state.game.gameMode);


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
            newSocket.emit('cancelGame');
            newSocket.disconnect();
            dispatch(resetGameState());
        };
    }, []); //

    socket?.on("joinQueueError", (data) => {
        handleReset();
        dispatch(setServerMessage(data));
        dispatch(setOpenSnackbar(true));
        dispatch(setSeverity('error'));
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
    dispatch(setCountdown(count));
  });

  const isInviteAccepted = useAppSelector((state) => state.game.inviteAccepted);
  const invited = useAppSelector((state) => state.game.invited);
  const isChatInvite = useAppSelector((state) => state.game.chatInvite);

  // those event for the inviter {from gameComponent}
  useEffect(() => {
    if (
      isCurrentTab &&
      isInviteAccepted &&
      invited &&
      socketReady &&
      !isChatInvite
    ) {
      dispatch(setGameStep(STEPS.WAITING_QUEUE));
      emitEvent("join_queue_match_invitaion", gameMode);
    }
  }, [isCurrentTab, isInviteAccepted, invited, socketReady]);

  const inviter = useAppSelector((state) => state.game.inviter);
  const isInviteReceived = useAppSelector((state) => state.game.inviteReceived);
  // those event for the invited
  useEffect(() => {
    if (isCurrentTab && isInviteReceived && inviter && socketReady) {
      dispatch(setGameStep(STEPS.WAITING_QUEUE));
      emitEvent("join_queue_match_invitaion", gameMode);
    }
  }, [isCurrentTab, isInviteReceived, inviter,  socketReady]);

  // this event is for the inviter {from ChatComponent}

  useEffect(() => {
    if (
      isCurrentTab &&
      isChatInvite &&
      isInviteAccepted &&
      invited &&
      socketReady
    ) {
      dispatch(setGameStep(STEPS.WAITING_QUEUE));
      emitEvent("join_queue_match_invitaion", gameMode);
    }
  }, [isCurrentTab, isInviteAccepted, invited, socketReady, isChatInvite]);
  // Conditional rendering based on the current step
  const renderStep = () => {
    switch (currentStep) {
      case STEPS.SELECT_MAP:
        return <MapSelection socket={socket} onReset={handleReset} />;
      case STEPS.INVITE_FRIEND:
        return <InviteFriend socket={socket} onReset={handleReset} />;
      case STEPS.WAITING_QUEUE:
        return <MatchLoading socket={socket} />;
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
    return <div></div>;
  }

  return <div>{renderStep()}</div>;
};

export default GameSteps;
