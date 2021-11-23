import { AgeRating } from "../entities/AgeRating";
import { Game } from "../entities/Game";
import { GameRepository } from "./interfaces/GameRepository";

let nextGameId: number = 5;
let gameList: Game[] = [
  {
    id: 1,
    title: "Mirror's Edge",
    description:
      "In a city where information is heavily monitored, couriers called Runners transport sensitive data. In this seemingly utopian paradise, a crime has been committed, & you are being hunted. You are a Runner called Faith and this innovative first-person action-adventure is your story.",
    ageRating: AgeRating.Teen,
    imagePaths: [
      "f05953dc-61e5-47ad-98e0-93d6b31b2964.png",
      "26b4d132-46d4-455b-a678-dc2c1d485499.png",
      "58fb8a42-efe2-47ea-a04a-ec25c938767f.png",
      "cb8ac438-5602-4a7b-bc3f-7c3686663b37.png",
      "15b3c31d-02b6-4be3-b574-6003f6f389ed.png",
    ],
  },
  {
    id: 2,
    title: "Deus Ex: Game of the Year Edition",
    description:
      "The year is 2052 and the world is a dangerous and chaotic place. Terrorists operate openly - killing thousands; drugs, disease and pollution kill even more. The world's economies are close to collapse and the gap between the insanely wealthy and the desperately poor grows ever wider.",
    ageRating: AgeRating.Mature,
    imagePaths: [
      "589fe5be-4ec4-4c89-93bd-56529c9ec6ef.png",
      "43df609d-aafd-4113-b5c3-d597e4753d11.png",
      "0ca56d4e-6351-4579-975a-9fc04dc0247e.png",
      "ff4ead58-d786-44db-9c48-f1695ba86164.png",
    ],
  },
  {
    id: 3,
    title: "Titanfall 2",
    description:
      "Respawn Entertainment gives you the most advanced titan technology in its new, single player campaign & multiplayer experience. Combine & conquer with new titans & pilots, deadlier weapons, & customization and progression systems that help you and your titan flow as one unstoppable killing force.",
    ageRating: AgeRating.Mature,
    imagePaths: [
      "2cde24bd-5c65-4fb7-a444-9cb75aed7566.png",
      "4d08ad82-7525-4b86-ba7f-e27373c8a5ed.png",
      "9ea75112-d537-4a3a-a921-c8252d04c051.png",
      "c10e64a5-4b3d-430e-a396-a9f51d1ac866.png",
    ],
  },
  {
    id: 4,
    title: "FINAL FANTASY XIV Online",
    description: "Take part in an epic and ever-changing FINAL FANTASY as you adventure and explore with friends from around the world.",
    ageRating: AgeRating.Teen,
    imagePaths: [
      "9b65af60-abd0-437b-b883-d206f91715e9.png",
      "8acd70fd-c9fd-40b5-a014-ee79662f1d0d.png",
      "393a876c-d9a6-48ae-b02b-c5550522550a.png",
      "ff247932-5b30-4c9b-8e9b-3f67dab3f77b.png",
    ],
  },
];

export class InMemoryGameRepository implements GameRepository {
  getAll = () => {
    return gameList;
  };

  get = (id: number) => {
    const game = gameList.find((game) => game.id == id);
    return game ?? null;
  };

  create = (game: Game) => {
    game.id = nextGameId++;
    gameList = [...gameList, game];
    return game;
  };

  update = (game: Game) => {
    const id = game.id;
    gameList = [...gameList.filter((game) => game.id != id), game];
  };

  delete = (id: number) => {
    gameList = gameList.filter((game) => game.id != id);
  };
}
