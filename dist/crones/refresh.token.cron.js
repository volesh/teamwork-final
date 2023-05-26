"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenCrone = void 0;
const cron_1 = require("cron");
const services_1 = require("../services");
const fs_1 = require("fs");
const tokens_moldel_1 = require("../models/tokens.moldel");
exports.refreshTokenCrone = new cron_1.CronJob("0 0 1,15 * * *", async () => {
    try {
        const tokens = await (0, services_1.getTokens)();
        const { data } = await services_1.timelyService.refreshToken(tokens.refresh_token);
        await tokens_moldel_1.TokensDb.updateOne({ refresh_token: tokens.refresh_token }, { access_token: tokens.access_token, refresh_tokens: tokens.refresh_token });
        await fs_1.promises.writeFile("./src/tokens.json", JSON.stringify(data));
        console.log("Tokens changed");
    }
    catch (e) {
        console.log(e.message);
    }
});
//# sourceMappingURL=refresh.token.cron.js.map