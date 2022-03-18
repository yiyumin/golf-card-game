type Session = {
  userId: string;
};

interface SessionStoreInterface {
  findSession(id: string): Session;
  saveSession(id: string, session: Session): void;
}

class InMemorySessionStore implements SessionStoreInterface {
  sessions: Map<string, Session>;

  constructor() {
    this.sessions = new Map();
  }

  findSession(id: string): Session {
    return this.sessions.get(id);
  }

  saveSession(id: string, session: Session): void {
    this.sessions.set(id, session);
  }
}

export { SessionStoreInterface, InMemorySessionStore };
