import { randomSessionId, randomUserId } from '../utils';
import { SessionStoreInterface } from '../stores/sessionStore';
import { GolfServer } from '../types';

const registerSessionMiddleware = (
  io: GolfServer,
  sessionStore: SessionStoreInterface
) => {
  io.use((socket, next) => {
    const sessionId = socket.handshake.auth.sessionId;
    if (sessionId) {
      const session = sessionStore.findSession(sessionId);
      if (session) {
        socket.data.sessionId = sessionId;
        socket.data.userId = session.userId;
        return next();
      }
    }

    // create new session
    socket.data.sessionId = randomSessionId();
    socket.data.userId = randomUserId();
    next();
  });

  io.use((socket, next) => {
    sessionStore.saveSession(socket.data.sessionId, {
      userId: socket.data.userId,
    });

    socket.emit('session-created', {
      sessionId: socket.data.sessionId,
      userId: socket.data.userId,
    });

    socket.join(socket.data.userId);
    next();
  });
};

export default registerSessionMiddleware;
