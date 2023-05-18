import { NextFunction, Response } from "express";
import { teamworkService } from "../services";
import { IRequest } from "../interfaces";

export const teamworkMiddlewares = {
  getPersonByEmail: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const { data } = await teamworkService.getPeople();

      const people = data.people;
      if (!req.hours) {
        throw new Error("Hours data not generated");
      }
      const { id } = people.find(
        (person: { "email-address": String; id: number }) => person["email-address"] === req.hours?.userEmail
      );
      req.userId = +id;
      next();
    } catch (e) {
      next(e);
    }
  },

  getPeopleEmailsByProject: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const { data } = await teamworkService.getPeopleByProject(+req.body.project.id);

      const people = data.people.map((person: { ["email-address"]: string }) => {
        return person["email-address"];
      });

      req.people = people;
      next();
    } catch (e) {
      next(e);
    }
  },

  getProjectByName: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const { data } = await teamworkService.getProjects();

      const { id: projectId } = data.projects.find(
        (project: { name: string; id: number }) => project.name === req.hours?.projectName
      );
      req.projectId = projectId;
      next();
    } catch (e) {
      next(e);
    }
  },

  getProjectName: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const { data } = await teamworkService.getProjectById(req.body.budget.projectId);

      req.projectName = data.project.name;
      next();
    } catch (e) {
      next(e);
    }
  },

  createHours: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.hours) {
        throw new Error(" Hours not generated");
      }
      if (!req.userId) {
        throw new Error("User id not found");
      }
      if (!req.projectId) {
        throw new Error("Project Id not found");
      }
      const dataForCreate = {
        timelog: {
          isBillable: true,
          date: req.hours.date,
          description: req.hours.description,
          hours: req.hours.hours,
          minutes: req.hours.minutes,
          userId: req.userId,
        },
      };

      await teamworkService.createHours(dataForCreate, req.projectId);
      next();
    } catch (e) {
      next(e);
    }
  },
};
