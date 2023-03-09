import { DataType } from './types';

interface UserData {
  id: string;
  username: string;
  room: string;
}

interface MoveData {
  clientsId: string;
  moves: number[];
}

interface SocketRawData {
  type: DataType;
  users: UserData[];
  moves: number[];
  opponentId: string;
}

export type { UserData, MoveData, SocketRawData };
