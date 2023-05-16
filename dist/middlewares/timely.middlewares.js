"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timelyMiddlewares = void 0;
const services_1 = require("../services");
exports.timelyMiddlewares = {
    createProject: async (req, res, next) => {
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
            await services_1.timelyService.createProject(req.accountId, dataForCreate);
            next();
        }
        catch (e) {
            next(e);
        }
    },
    getAccount: async (req, res, next) => {
        console.log("Working");
        try {
            const { data } = await services_1.timelyService.getAccounts();
            req.accountId = data[0].id;
            next();
        }
        catch (e) {
            next(e);
        }
    },
    generateHoursData: async (req, res, next) => {
        try {
            const accountId = req.accountId;
            if (!accountId) {
                throw new Error("Missing accountId");
            }
            const path = req.body.payload.entity_path;
            console.log(1);
            const { data: createdHours } = await services_1.timelyService.getCreatedHours(path, accountId);
            console.log(createdHours);
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
        }
        catch (e) {
            next(e);
        }
    },
    getTimelyProjectByName: async (req, res, next) => {
        try {
            if (!req.accountId) {
                throw new Error("Account id not foind");
            }
            if (!req.projectName) {
                throw new Error("Project name not found");
            }
            const { data } = await services_1.timelyService.getProjects(req.accountId);
            console.log("Projects", data);
            const { id: projectId } = data.find((project) => project.name === req.projectName);
            req.projectId = projectId;
            next();
        }
        catch (e) {
            next(e);
        }
    },
    setProjectBudget: async (req, res, next) => {
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
            }
            else {
                body.budget_type = "M";
                body.budget = req.body.budget.capacity / 100;
            }
            await services_1.timelyService.setProjectBudget(req.accountId, req.projectId, body);
            next();
        }
        catch (e) {
            next(e);
        }
    },
    getClient: async (req, res, next) => {
        try {
            if (!req.accountId) {
                throw new Error("Account id not found");
            }
            const { data } = await services_1.timelyService.getClients(req.accountId);
            const clientId = data[0].id;
            req.clientId = clientId;
            next();
        }
        catch (e) {
            next(e);
        }
    },
    getCurrentUser: async (req, res, next) => {
        try {
            if (!req.accountId) {
                throw new Error("Account Id not found");
            }
            const { data } = await services_1.timelyService.getCurrentUser(req.accountId);
            req.userId = data.id;
            next();
        }
        catch (e) {
            next(e);
        }
    },
};
//# sourceMappingURL=timely.middlewares.js.map