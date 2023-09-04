import { useEffect } from 'react';
import {
  initializeSocket,
  disconnectSocket,
  sendSocketEvent,
  listenForSocketEvent,
  removeSocketListener,
} from './socketManager';

const useSocket = (serverUrl: string) => {
  useEffect(() => {
    const socket = initializeSocket(serverUrl);

    return () => {
      disconnectSocket();
    };
  }, [serverUrl]);

  const emitEvent = (eventName: string, data: any) => {
    sendSocketEvent(eventName, data);
  };

  const onEvent = (eventName: string, callback: (data: any) => void) => {
    listenForSocketEvent(eventName, callback);
  };

  const offEvent = (eventName: string, callback: (data: any) => void) => {
    removeSocketListener(eventName, callback);
  };

  return { emitEvent, onEvent, offEvent };
};

export default useSocket;
