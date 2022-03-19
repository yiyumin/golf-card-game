import { Server } from 'socket.io';

import { InMemorySessionStore } from './stores/sessionStore';
import { InMemoryGameStore } from './stores/gameStore';

import { GolfServer, GolfSocket } from './types';

import registerSessionMiddleware from './middleware/registerSessionMiddleware';

import registerGameHandler from './events/registerGameHandler';
import registerErrorHandler from './events/registerErrorHandler';

const port = parseInt(process.env.PORT) || 3001;
const clientUrls = process.env.CLIENT_URLS.split(',');

const io = new Server(port, {
  cors: {
    origin: clientUrls,
  },
}) as GolfServer;

const sessionStore = new InMemorySessionStore();
const gameStore = new InMemoryGameStore();

registerSessionMiddleware(io, sessionStore);

const onConnection = (socket: GolfSocket) => {
  registerGameHandler(io, socket, gameStore);
  registerErrorHandler(socket);
};

io.on('connection', onConnection);
