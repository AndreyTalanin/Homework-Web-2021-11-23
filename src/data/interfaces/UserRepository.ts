import { User } from "../../entities/User";

export interface UserRepository {
  getAll: () => User[];
  get: (id: number) => User | null;
  create: (user: User) => User;
  update: (user: User) => void;
  delete: (id: number) => void;
  deleteRecordsForGame: (gameId: number) => void;
}
