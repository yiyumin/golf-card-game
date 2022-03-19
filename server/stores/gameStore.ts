import GolfGame from '../lib/golfGame';
import { randomGameId } from '../utils';

interface GameStoreInterface {
  findGame(id: string): GolfGame;
  createGame(): string;
  doesGameExist(id: string): boolean;
  deleteGame(id: string): void;
}

class InMemoryGameStore implements GameStoreInterface {
  games: Map<string, GolfGame>;

  constructor() {
    this.games = new Map();
  }

  findGame(id: string): GolfGame {
    return this.games.get(id);
  }

  createGame(): string {
    let gameId: string;

    do {
      gameId = randomGameId();
    } while (this.doesGameExist(gameId));

    this.games.set(gameId, new GolfGame());

    return gameId;
  }

  doesGameExist(id: string): boolean {
    return this.games.has(id);
  }

  deleteGame(id: string): void {
    this.games.delete(id);
  }
}

export { GameStoreInterface, InMemoryGameStore };
