import { GameLogEntry as Entry } from '../hooks/useGame';

type GameLogEntryProps = {
  gameLogEntry: Entry;
  playerNames: { [key: string]: string };
};

const GameLogEntry = ({
  gameLogEntry: { playerIds, message },
  playerNames,
}: GameLogEntryProps) => {
  return (
    <div>
      <span className='text-sky-blue-400'>
        {playerIds &&
          (Array.isArray(playerIds)
            ? playerIds.map((playerId) => playerNames[playerId]).join(', ')
            : playerNames[playerIds])}
      </span>
      {message}
    </div>
  );
};

export default GameLogEntry;
