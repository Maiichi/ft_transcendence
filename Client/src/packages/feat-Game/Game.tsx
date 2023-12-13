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
import { I_User } from "../feat-Chat/components/types";
import styled from "styled-components";
import { InviteUserToGame } from "./components/InviteGame";
import { initializeSocket } from "./socketUtils";
import { inviteUserToGameFromChat, setInviteAccepted, setInviteDeclined } from "./redux/GameSlice";



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
    const [socketReady, setSocketReady] = useState<boolean>(false);

    useEffect(() => {
        // Establish the socket connection when the component mounts
        const SOCKET_URL = `${process.env.REACT_APP_BACKEND_URL}/game`;

        const newSocket = io(SOCKET_URL, {
            extraHeaders: {
                authorization: `${token}`,
            },
        });

        newSocket.on('connect', () => {
          setSocketReady(true);
        });
        // Set the socket in the state
        setSocket(newSocket);

        // Clean up the socket connection when the component unmounts
        return () => {
            newSocket.disconnect();
        };
    }, [token]); //

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

    // invite Game modal
    const isInviteAccepted = useAppSelector((state) => state.gameState.inviteAccepted);
    // const isInviteDeclined = useAppSelector((state) => state.gameState.inviteDeclined);
    useEffect(() => {
        console.log('is this is shown at the inviter (invite) ')
        if (isInviteAccepted && socketReady)
        {
          console.log('invited joins the queue !!!!')
          console.log(' == socket == ', socket );
          // socket?.emit('join_queue_match_invitaion', "dual");
          emitEvent("join_queue_match_invitaion", "dual");
          dispatch(setInviteAccepted(false));
        } 
    }, [isInviteAccepted, socketReady]);

    const isChatInvite = useAppSelector((state) => state.gameState.chatInvite);
    const isOpponentAcceptInvite = useAppSelector((state) => state.gameState.acceptOpponentInvite);
    useEffect(() => {
      console.log('is this is shown at the inviter (invite) ')
      if (isChatInvite && socketReady && isOpponentAcceptInvite)
      {
        console.log('inviter joins the queue !!!!')
        console.log(' == socket == ', socket );
        // socket?.emit('join_queue_match_invitaion', "dual");
        emitEvent("join_queue_match_invitaion", "dual");
        dispatch(inviteUserToGameFromChat(false));
      } 
    }, [isChatInvite, socketReady, isOpponentAcceptInvite]);

    useEffect(() => {
      console.log('is this is shown at the inviter (invite) ')
      if (socketReady && isOpponentAcceptInvite)
      {
        console.log('inviter joins the queue !!!!')
        console.log(' == socket == ', socket );
        // socket?.emit('join_queue_match_invitaion', "dual");
        emitEvent("join_queue_match_invitaion", "dual");
        dispatch(inviteUserToGameFromChat(false));
      } 
    }, [socketReady, isOpponentAcceptInvite]);

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
      setCloseType(closeType);
      setOpen(true);
      setChildModal(childModal);
    };
    const handleClose = () => {
      setOpen(false);
    };

    // Wait until the socket is ready before rendering the game component
  if (!socketReady) {
    return <div>Loading...</div>;
  }

    return (
        <div>
            <ModalComponent
                open={open}
                ChildComponent={ChildModal}
                handleClose={handleClose}
                closeType={closeType}
            />
            <h1>Pong Game</h1>
            <button
                id="invite_user_to_game"
                onClick={() => {
                   socket && handleClickModal(<InviteUserToGame selectedUser={null} socket={socket} handleClose={handleClose} />)
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


const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalBody = styled.div`
  align-items: center;
  height: 100%;
`;

const ModalFooter = styled.div`
  margin: 25px 0px 0px 0px;
  display: flex;
  justify-content: space-evenly;
`;

const SearchBar = styled.div`
  display: flex;
`;

const MessageInput = styled.textarea`
  width: 300px;
  height: 100px;
  resize: none;
`;

const CreateButton = styled.button`
  height: 40px;
  width: 100px;
  border: 10px;
  border-radius: 10px;
  cursor: pointer;
  background-color: rgb(178, 163, 201);
`;

const CancelButton = styled.button`
  height: 40px;
  width: 100px;
  border: 10px;
  border-radius: 10px;
  cursor: pointer;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  margin: 10px;
  &:hover {
    cursor: pointer;
    background-color: #f5f6f7;
  }
`;

const UserListOverlay = styled.div`
  position: absolute;
  z-index: 1;
  background-color: white;
  border: 1px solid #ccc;
  margin-top: -10px; /* Adjust this value to fit your design */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const UserHolder = styled.div`
  display: flex;
`;
