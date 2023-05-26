"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronRunner = void 0;
const refresh_token_cron_1 = require("./refresh.token.cron");
const cronRunner = () => {
    refresh_token_cron_1.refreshTokenCrone.start();
};
exports.cronRunner = cronRunner;
//# sourceMappingURL=index.js.map