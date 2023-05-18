"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamworkMiddlewares = void 0;
const services_1 = require("../services");
exports.teamworkMiddlewares = {
    getPersonByEmail: async (req, res, next) => {
        try {
            const { data } = await services_1.teamworkService.getPeople();
            const people = data.people;
            if (!req.hours) {
                throw new Error("Hours data not generated");
            }
            const { id } = people.find((person) => person["email-address"] === req.hours?.userEmail);
            req.userId = +id;
            next();
        }
        catch (e) {
            next(e);
        }
    },
    getPeopleEmailsByProject: async (req, res, next) => {
        try {
            const { data } = await services_1.teamworkService.getPeopleByProject(+req.body.project.id);
            console.log("People", data);
            const people = data.map((person) => {
                return person["email-address"];
            });
            console.log(people);
            req.people = people;
            next();
        }
        catch (e) {
            next(e);
        }
    },
    getProjectByName: async (req, res, next) => {
        try {
            const { data } = await services_1.teamworkService.getProjects();
            const { id: projectId } = data.projects.find((project) => project.name === req.hours?.projectName);
            req.projectId = projectId;
            next();
        }
        catch (e) {
            next(e);
        }
    },
    getProjectName: async (req, res, next) => {
        try {
            const { data } = await services_1.teamworkService.getProjectById(req.body.budget.projectId);
            req.projectName = data.project.name;
            next();
        }
        catch (e) {
            next(e);
        }
    },
    createHours: async (req, res, next) => {
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
            await services_1.teamworkService.createHours(dataForCreate, req.projectId);
            next();
        }
        catch (e) {
            next(e);
        }
    },
};
//# sourceMappingURL=teamwork.middlewares.js.map