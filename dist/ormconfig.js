"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configs_1 = require("./configs");
const tokens_moldel_1 = __importDefault(require("./database/models/tokens.moldel"));
exports.default = {
    type: "postgres",
    host: configs_1.envsConfig.postgresHost,
    port: Number(configs_1.envsConfig.postgresPort),
    username: configs_1.envsConfig.postgresUser,
    password: configs_1.envsConfig.postgresPassword,
    database: configs_1.envsConfig.postgresDatabase,
    entities: [tokens_moldel_1.default],
    synchronize: true,
    logging: false,
};
//# sourceMappingURL=ormconfig.js.map