import express, { Router } from "express";
import { GameRepository } from "../data/interfaces/GameRepository";
import { UserRepository } from "../data/interfaces/UserRepository";
import { Controller } from "./Controller";

interface CreateGameResponse {
  id: number;
}

export class GameController implements Controller {
  private router: Router = express.Router();

  constructor(gameRepository: GameRepository, userRepository: UserRepository) {
    this.router.use(express.json());

    this.router.get("/games", function (request, response) {
      response.json(gameRepository.getAll());
    });

    this.router.get("/games/:id", function (request, response) {
      const id = parseInt(request.params.id);
      const game = gameRepository.get(id);
      if (game) {
        response.json(game);
      } else {
        response.status(404);
        response.send();
      }
    });

    this.router.post("/games", function (request, response) {
      let game = request.body;
      game = gameRepository.create(game);
      response.json({ id: game.id } as CreateGameResponse);
    });

    this.router.put("/games/:id", function (request, response) {
      const id = parseInt(request.params.id);
      const game = request.body;
      gameRepository.update({ ...game, id: id });
      response.send();
    });

    this.router.delete("/games/:id", function (request, response) {
      const id = parseInt(request.params.id);
      gameRepository.delete(id);
      userRepository.deleteRecordsForGame(id);
      response.send();
    });
  }

  getRouter = () => {
    return this.router;
  };
}
