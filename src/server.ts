import express from "express";
import { GameController } from "./controllers/GameController";
import { StaticFileController } from "./controllers/StaticFileController";
import { UserController } from "./controllers/UserController";
import { InMemoryGameRepository } from "./data/InMemoryGameRepository";
import { InMemoryUserRepository } from "./data/InMemoryUserRepository";

const app = express();

const gameRepository = new InMemoryGameRepository();
const userRepository = new InMemoryUserRepository();

const gameController = new GameController(gameRepository, userRepository);
const userController = new UserController(gameRepository, userRepository);
const staticFileController = new StaticFileController();

app.use(gameController.getRouter());
app.use(userController.getRouter());
app.use(staticFileController.getRouter());

app.listen(3000, () => {
  console.log("Express application started on port 3000.");
});
