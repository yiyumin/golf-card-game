type StatusType = 'default' | 'success' | 'warning' | 'error';

type Status = {
  message: string;
  statusType: StatusType;
};

type CardType = 'shared' | 'player' | 'main-player';

export type { StatusType, Status, CardType };
