"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamworkRouter = void 0;
const express = __importStar(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const teamworkRouter = express.Router();
exports.teamworkRouter = teamworkRouter;
teamworkRouter.post("/create-project", middlewares_1.timelyMiddlewares.getAccount, middlewares_1.timelyMiddlewares.getClient, middlewares_1.timelyMiddlewares.getCurrentUser, middlewares_1.timelyMiddlewares.createProject, controllers_1.teamworkController.createProject);
teamworkRouter.post("/create-budget", middlewares_1.teamworkMiddlewares.getProjectName, middlewares_1.timelyMiddlewares.getAccount, middlewares_1.timelyMiddlewares.getTimelyProjectByName, middlewares_1.timelyMiddlewares.setProjectBudget, controllers_1.teamworkController.createBudget);
teamworkRouter.post("/update-budget", middlewares_1.teamworkMiddlewares.getProjectName, middlewares_1.timelyMiddlewares.getAccount, middlewares_1.timelyMiddlewares.getTimelyProjectByName, middlewares_1.timelyMiddlewares.updateProjectBudget, controllers_1.teamworkController.updateBudget);
//# sourceMappingURL=teamwork.router.js.map