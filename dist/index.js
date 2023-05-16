"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const configs_1 = require("./configs");
const api_router_1 = require("./routes/api.router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(api_router_1.apiRouter);
app.listen(configs_1.envsConfig.port, async () => {
    console.log(`Port listen: ${configs_1.envsConfig.port}`);
});
//# sourceMappingURL=index.js.map