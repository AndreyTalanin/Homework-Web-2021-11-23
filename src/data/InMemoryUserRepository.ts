import { User } from "../entities/User";
import { UserRepository } from "./interfaces/UserRepository";

let nextUserId: number = 3;
let userList: User[] = [
  {
    id: 1,
    name: "xXx_sephiroth1997_xXx",
    gameRecords: [
      {
        gameId: 1,
        playTimeInMinutes: 1200,
        hidden: false,
      },
      {
        gameId: 3,
        playTimeInMinutes: 600,
        hidden: false,
      },
      {
        gameId: 4,
        playTimeInMinutes: 24000,
        hidden: false,
      },
    ],
  },
  {
    id: 2,
    name: "Gregor",
    gameRecords: [
      {
        gameId: 2,
        playTimeInMinutes: 13800,
        hidden: false,
      },
      {
        gameId: 3,
        playTimeInMinutes: 10500,
        hidden: false,
      },
    ],
  },
];

export class InMemoryUserRepository implements UserRepository {
  getAll = () => {
    return userList.filter((user) => user.id);
  };

  get = (id: number) => {
    const user = userList.find((user) => user.id == id);
    return user ?? null;
  };

  create = (user: User) => {
    user.id = nextUserId++;
    userList = [...userList, user];
    return user;
  };

  update = (user: User) => {
    const id = user.id;
    userList = [...userList.filter((user) => user.id != id), user];
  };

  delete = (id: number) => {
    const user = userList.find((user) => user.id == id);
    if (user) {
      user.id = null;
      user.name = "DELETED USER";
    }
  };

  deleteRecordsForGame = (gameId: number) => {
    userList = userList.map((user) => {
      user.gameRecords = user.gameRecords.filter((gameRecord) => gameRecord.gameId != gameId);
      return user;
    });
  };
}
