import { NextFunction, Response } from "express";
import { timelyService } from "../services";
import { IRequest } from "../interfaces";

export const timelyMiddlewares = {
  createProject: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.body.project.name) {
        throw new Error("Project name not found");
      }
      if (!req.clientId) {
        throw new Error("Client id not found");
      }
      if (!req.userId) {
        throw new Error(`User id not found`);
      }
      if (!req.accountId) {
        throw new Error(`Account id not found`);
      }
      const dataForCreate = {
        project: {
          name: req.body.project.name,
          rate_type: "project",
          color: "67a3bc",
          client_id: +req.clientId,
          users: [{ user_id: +req.userId }],
        },
      };
      await timelyService.createProject(req.accountId, dataForCreate);
      next();
    } catch (e) {
      next(e);
    }
  },

  getAccount: async (req: IRequest, res: Response, next: NextFunction) => {
    console.log("Working");
    try {
      const { data } = await timelyService.getAccounts();
      req.accountId = data[0].id;
      next();
    } catch (e) {
      next(e);
    }
  },

  generateHoursData: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const accountId = req.accountId;
      if (!accountId) {
        throw new Error("Missing accountId");
      }
      const path = req.body.payload.entity_path;
      const { data: createdHours } = await timelyService.getCreatedHours(path, accountId);
      if (!createdHours) {
        throw new Error("Created hours not found");
      }
      const userEmail = createdHours.user.email;
      const date = createdHours.day;
      const description = createdHours.note;
      const hours = createdHours.duration.hours;
      const minutes = createdHours.duration.minutes;
      const projectName = createdHours.project.name;

      const hoursDate = {
        userEmail,
        date,
        description,
        hours,
        minutes,
        projectName,
      };
      req.hours = hoursDate;
      next();
    } catch (e) {
      next(e);
    }
  },

  getTimelyProjectByName: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.accountId) {
        throw new Error("Account id not foind");
      }
      if (!req.projectName) {
        throw new Error("Project name not found");
      }
      const { data } = await timelyService.getProjects(req.accountId);
      const { id: projectId } = data.projects.find((project: { name: string; id: number }) => project.name === req.projectName);
      req.projectId = projectId;
      next();
    } catch (e) {
      next(e);
    }
  },

  setProjectBudget: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.accountId) {
        throw new Error("Account id not found");
      }
      if (!req.projectId) {
        throw new Error("Project id not found");
      }
      const body = {
        budget: 0,
        budget_type: "",
      };
      if (req.body.budget.type === "TIME") {
        body.budget_type = "H";
        body.budget = req.body.budget.capacity / 60;
      } else {
        body.budget_type = "M";
        body.budget = req.body.budget.capacity / 100;
      }
      await timelyService.setProjectBudget(req.accountId, req.projectId, body);
      next();
    } catch (e) {
      next(e);
    }
  },

  getClient: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.accountId) {
        throw new Error("Account id not found");
      }
      const { data } = await timelyService.getClients(req.accountId);
      const clientId = data[0].id;
      req.clientId = clientId;
      next();
    } catch (e) {
      next(e);
    }
  },

  getCurrentUser: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.accountId) {
        throw new Error("Account Id not found");
      }
      const { data } = await timelyService.getCurrentUser(req.accountId);
      req.userId = data.id;
      next();
    } catch (e) {
      next(e);
    }
  },
};
