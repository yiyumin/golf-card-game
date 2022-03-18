import { nanoid, customAlphabet } from 'nanoid';

const randomSessionId = nanoid;

const randomUserId = nanoid;

const randomGameId = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 5);

export { randomSessionId, randomUserId, randomGameId };
