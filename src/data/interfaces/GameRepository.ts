import { Game } from "../../entities/Game";

export interface GameRepository {
  getAll: () => Game[];
  get: (id: number) => Game | null;
  create: (game: Game) => Game;
  update: (game: Game) => void;
  delete: (id: number) => void;
}
