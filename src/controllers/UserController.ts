import express, { Router } from "express";
import { GameRepository } from "../data/interfaces/GameRepository";
import { UserRepository } from "../data/interfaces/UserRepository";
import { Game } from "../entities/Game";
import { Controller } from "./Controller";

interface GetUserResponse {
  id: number;
  name: string;
}

interface CreateUserRequest {
  name: string;
}

interface CreateUserResponse {
  id: number;
}

interface UpdateUserRequest {
  name: string;
}

interface GetUserGameRecordsResponse {
  games: { game: Game; playTimeInMinutes: number }[];
}

interface CreateUserGameRecordRequest {
  gameId: number;
}

interface AddPlayTimeToUserGameRecordRequest {
  playTimeInMinutes: number;
}

export class UserController implements Controller {
  private router: Router = express.Router();

  constructor(gameRepository: GameRepository, userRepository: UserRepository) {
    this.router.use(express.json());

    this.router.get("/users/:id", function (request, response) {
      const id = parseInt(request.params.id);
      const user = userRepository.get(id);
      if (user) {
        response.json({ id: user?.id, name: user?.name } as GetUserResponse);
      } else {
        response.status(404);
        response.send();
      }
    });

    this.router.post("/users", function (request, response) {
      let data: CreateUserRequest = request.body;
      const user = userRepository.create({ id: 0, name: data.name, gameRecords: [] });
      response.json({ id: user.id } as CreateUserResponse);
    });

    this.router.put("/users/:id", function (request, response) {
      const id = parseInt(request.params.id);
      const data: UpdateUserRequest = request.body;
      const user = userRepository.get(id);
      if (user) {
        userRepository.update({ ...user, id: id, name: data.name });
      }
      response.send();
    });

    this.router.delete("/users/:id", function (request, response) {
      const id = parseInt(request.params.id);
      userRepository.delete(id);
      response.send();
    });

    this.router.get("users/:id/games", function (request, response) {
      const id = parseInt(request.params.id);
      const user = userRepository.get(id);
      if (user) {
        response.json({
          games: user.gameRecords
            .filter((gameRecord) => !gameRecord.hidden)
            .map((gameRecord) => ({ game: gameRepository.get(gameRecord.gameId), playTimeInMinutes: gameRecord.playTimeInMinutes })),
        } as GetUserGameRecordsResponse);
      } else {
        response.status(404);
        response.send();
      }
    });

    this.router.post("users/:id/games", function (request, response) {
      const id = parseInt(request.params.id);
      const data: CreateUserGameRecordRequest = request.body;
      const user = userRepository.get(id);
      if (user) {
        const gameRecord = user.gameRecords.find((gameRecord) => gameRecord.gameId == data.gameId);
        if (gameRecord) {
          gameRecord.hidden = false;
        } else {
          user.gameRecords = [...user.gameRecords, { ...data, playTimeInMinutes: 0, hidden: false }];
        }
        userRepository.update(user);
      } else {
        response.status(404);
        response.send();
      }
    });

    this.router.post("users/:id/games/:gameId", function (request, response) {
      const id = parseInt(request.params.id);
      const gameId = parseInt(request.params.gameId);
      const data: AddPlayTimeToUserGameRecordRequest = request.body;
      const user = userRepository.get(id);
      if (user) {
        user.gameRecords = user.gameRecords.map((gameRecord) =>
          gameRecord.gameId == gameId ? { ...gameRecord, playTimeInMinutes: gameRecord.playTimeInMinutes + data.playTimeInMinutes } : gameRecord
        );
        userRepository.update(user);
      } else {
        response.status(404);
        response.send();
      }
    });

    this.router.delete("users/:id/games/:gameId", function (request, response) {
      const id = parseInt(request.params.id);
      const gameId = parseInt(request.params.gameId);
      const user = userRepository.get(id);
      if (user) {
        user.gameRecords = user.gameRecords.map((gameRecord) => (gameRecord.gameId == gameId ? { ...gameRecord, hidden: true } : gameRecord));
        userRepository.update(user);
      } else {
        response.status(404);
        response.send();
      }
    });
  }

  getRouter = () => {
    return this.router;
  };
}
