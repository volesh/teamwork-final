"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const configs_1 = require("./configs");
const api_router_1 = require("./routes/api.router");
const crones_1 = require("./crones");
// import mongoose from "mongoose";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(api_router_1.apiRouter);
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.log(err.message || "Unknown error");
    res.status(err.status || 500).json({
        errorMessage: err.message || "Unknown error",
        statusCode: err.status || 500,
    });
});
app.listen(configs_1.envsConfig.port, async () => {
    // await mongoose.connect(envsConfig.mongoUrl as string);
    console.log(`Port listen: ${configs_1.envsConfig.port}`);
    (0, crones_1.cronRunner)();
});
//# sourceMappingURL=index.js.map