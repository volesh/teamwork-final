import * as express from "express";
import { timelyController } from "../controllers";
import { teamworkMiddlewares, timelyMiddlewares } from "../middlewares";

const timelyRouter = express.Router();

timelyRouter.post(
  "/hours",
  timelyMiddlewares.getAccount,
  timelyMiddlewares.generateHoursData,
  teamworkMiddlewares.getPersonByEmail,
  teamworkMiddlewares.getProjectByName,
  teamworkMiddlewares.createHours,
  timelyController.addHours
);

timelyRouter.get("Get tokens", timelyController.getTokens);

export { timelyRouter };
