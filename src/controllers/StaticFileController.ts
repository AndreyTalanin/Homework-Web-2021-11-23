import express, { Router } from "express";
import { createReadStream, existsSync } from "fs";
import { join } from "path";
import { Controller } from "./Controller";

export class StaticFileController implements Controller {
  private router: Router = express.Router();

  constructor() {
    this.router.get("/static/text/:fileName", function (request, response) {
      const fileName = request.params.fileName;
      const fullPath = join(__dirname, `../../static_files/${fileName}`);
      if (existsSync(fullPath)) {
        createReadStream(fullPath).pipe(response);
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
