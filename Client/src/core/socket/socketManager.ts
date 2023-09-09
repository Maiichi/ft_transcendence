import io, { Socket } from 'socket.io-client';

export const initializeSocket = (serverUrl: string, authToken: string): Socket => {
  console.log("(socketManager) token => ", authToken);
  const socket: Socket = io(serverUrl, {
    extraHeaders: {
      authorization: `${authToken}`,
    },
  });
  return socket;
};

export const disconnectSocket = (socket: any) => {
  if (socket) {
    socket.disconnect();
  }
};
export const sendSocketEvent = (socket: any, eventName: string, data: any) => {
  if (socket) {
    socket.emit(eventName, data);
  }
};
export const listenForSocketEvent = (socket: any, eventName: string, callback: (data: any) => void) => {
  if (socket) {
    socket.on(eventName, callback);
  }
};
export const removeSocketListener = (socket: any, eventName: string, callback: (data: any) => void) => {
  if (socket) {
    socket.off(eventName, callback);
  }
};
