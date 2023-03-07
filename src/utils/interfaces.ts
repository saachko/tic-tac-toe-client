import { DataType } from './types';

interface UserData {
  id: string;
  username: string;
  room: string;
}

interface UserSocketData extends UserData {
  clientId: string;
}

interface MoveData {
  clientsId: string;
  moves: number[];
}

interface SocketRawData {
  type: DataType;
  users: UserSocketData[];
  opponentClientId: string;
  moves: number[];
}

export type { UserData, UserSocketData, MoveData, SocketRawData };
