import io, { Socket } from 'socket.io-client';

let socket: Socket;

export const initializeSocket = (serverUrl: string): Socket => {
  socket = io(serverUrl);
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const sendSocketEvent = (eventName: string, data: any) => {
  if (socket) {
    socket.emit(eventName, data);
  }
};

export const listenForSocketEvent = (eventName: string, callback: (data: any) => void) => {
  if (socket) {
    socket.on(eventName, callback);
  }
};

export const removeSocketListener = (eventName: string, callback: (data: any) => void) => {
  if (socket) {
    socket.off(eventName, callback);
  }
};
