import * as express from "express";
import { teamworkController } from "../controllers";
import { teamworkMiddlewares, timelyMiddlewares } from "../middlewares";

const teamworkRouter = express.Router();

teamworkRouter.post(
  "/create-project",
  timelyMiddlewares.getAccount,
  timelyMiddlewares.getClient,
  timelyMiddlewares.getCurrentUser,
  timelyMiddlewares.createProject,
  teamworkController.createProject
);

teamworkRouter.post(
  "/create-budget",
  teamworkMiddlewares.getProjectName,
  timelyMiddlewares.getAccount,
  timelyMiddlewares.getTimelyProjectByName,
  timelyMiddlewares.setProjectBudget,
  teamworkController.createBudget
);

teamworkRouter.patch(
  "/update-budget",
  teamworkMiddlewares.getProjectName,
  timelyMiddlewares.getAccount,
  timelyMiddlewares.getTimelyProjectByName,
  timelyMiddlewares.updateProjectBudget,
  teamworkController.updateBudget
);

export { teamworkRouter };
