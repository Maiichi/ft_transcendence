// socketUtils.ts
import { io, Socket } from 'socket.io-client';

let socketInstance: Socket | null = null;

export const initializeSocket = (token: string): Socket => {
  const SOCKET_URL = `${process.env.REACT_APP_BACKEND_URL}/game`;

  if (!socketInstance) {
    socketInstance = io(SOCKET_URL, {
      reconnectionDelayMax: 10000,
      extraHeaders: {
        authorization: token,
      },
    });
  }

  return socketInstance;
};

export const getSocketInstance = (): Socket | null => {
  return socketInstance;
};

export const disconnectSocket = (): void => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};
