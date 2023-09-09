import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeSocket, disconnectSocket } from './socketManager'; // Import your socket functions
import { Socket } from 'socket.io-client';
import { useAppSelector } from '../redux';

interface SocketContextProps {
  children: React.ReactNode;
}

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: React.FC<SocketContextProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  
  const token: string | null = useAppSelector((state) => state.auth.token);
  const serverUrl: string = 'http://localhost:5001';
  // console.log("(front) token ====", token);
  // Initialize socket when the component mounts
  useEffect(() => {
    // console.log("(inside useEffect) token || ", token);
    if (token)
    {
      const newSocket = initializeSocket(serverUrl, token);
      setSocket(newSocket);
      // Clean up the socket when the component unmounts
      return () => {
        if (newSocket) {
          disconnectSocket(newSocket);
        }
      };
    }

  }, [token]);

  return (
    <SocketContext.Provider value={socket}> {children} </SocketContext.Provider>
  );
};

export const useSocket = (): Socket | null => {
  return useContext(SocketContext);
};