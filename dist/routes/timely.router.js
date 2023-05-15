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
exports.timelyRouter = void 0;
const express = __importStar(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const timelyRouter = express.Router();
exports.timelyRouter = timelyRouter;
timelyRouter.post("/hours", middlewares_1.timelyMiddlewares.getAccount, middlewares_1.timelyMiddlewares.generateHoursData, middlewares_1.teamworkMiddlewares.getPersonByEmail, middlewares_1.teamworkMiddlewares.getProjectByName, middlewares_1.teamworkMiddlewares.createHours, controllers_1.timelyController.addHours);
timelyRouter.get("Get tokens", controllers_1.timelyController.getTokens);
//# sourceMappingURL=timely.router.js.map