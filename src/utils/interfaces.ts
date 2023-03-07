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

export type { UserData, UserSocketData, MoveData };
