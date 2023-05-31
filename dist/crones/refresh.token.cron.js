"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenCrone = void 0;
const cron_1 = require("cron");
const services_1 = require("../services");
const connection_1 = require("../database/connection");
const tokens_moldel_1 = __importDefault(require("../database/models/tokens.moldel"));
// import { promises as fs } from "fs";
// import { TokensDb } from "../models/tokens.moldel";
exports.refreshTokenCrone = new cron_1.CronJob("0 0 1,15 * * *", async () => {
    try {
        const tokens = await (0, services_1.getTokens)();
        const { data } = await services_1.timelyService.refreshToken(tokens.refresh_token);
        await connection_1.dataSourse.manager.update(tokens_moldel_1.default, { refresh_token: tokens.refresh_token }, { access_token: data.access_token, refresh_token: data.refresh_token });
        console.log("Tokens changed");
    }
    catch (e) {
        console.log(e.message);
    }
});
//# sourceMappingURL=refresh.token.cron.js.map