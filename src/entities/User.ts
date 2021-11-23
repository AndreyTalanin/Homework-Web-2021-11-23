import { UserGameRecord } from "./UserGameRecord";

export class User {
  id: number | null;
  name: string;
  gameRecords: UserGameRecord[];
}
