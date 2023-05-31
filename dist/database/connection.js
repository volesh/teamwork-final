"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourse = void 0;
const typeorm_1 = require("typeorm");
const configs_1 = require("../configs");
const tokens_moldel_1 = __importDefault(require("./models/tokens.moldel"));
exports.dataSourse = new typeorm_1.DataSource({
    type: "postgres",
    host: configs_1.envsConfig.postgresHost,
    port: Number(configs_1.envsConfig.postgresPort),
    username: configs_1.envsConfig.postgresUser,
    password: configs_1.envsConfig.postgresPassword,
    database: configs_1.envsConfig.postgresDatabase,
    entities: [tokens_moldel_1.default],
    synchronize: true,
    logging: false,
});
//# sourceMappingURL=connection.js.map