import React, { useContext, useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

import { ServerToClientEvents, ClientToServerEvents } from '../../../lib/types';

const socketUrl = process.env.REACT_APP_SOCKET_URL as string;

type SocketContextProps = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  userId: string;
};

const SocketContext = React.createContext<SocketContextProps | undefined>(
  undefined
);

const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }

  return context;
};

type SocketProviderProps = {
  children: React.ReactNode;
};

const SocketProvider = ({ children }: SocketProviderProps) => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>(
    io(socketUrl, {
      autoConnect: false,
    })
  );
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const { current: socket } = socketRef;
    const sessionId = window.localStorage.getItem('golf-card-game-session-id');

    if (sessionId) {
      socket.auth = { sessionId };
    }
    socket.connect();

    socket.on('session-created', ({ sessionId, userId }) => {
      window.localStorage.setItem('golf-card-game-session-id', sessionId);
      setUserId(userId);
    });

    const closeSocket = () => {
      socket.close();
    };

    return closeSocket;
  }, []);

  const value = {
    socket: socketRef.current,
    userId,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export { useSocket, SocketProvider };
