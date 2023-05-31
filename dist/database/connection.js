"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourse = void 0;
const typeorm_1 = require("typeorm");
const configs_1 = require("../configs");
exports.dataSourse = new typeorm_1.DataSource({
    type: "postgres",
    host: configs_1.envsConfig.postgresHost,
    port: Number(configs_1.envsConfig.postgresPort),
    username: configs_1.envsConfig.postgresUser,
    password: configs_1.envsConfig.postgresPassword,
    database: configs_1.envsConfig.postgresDatabase,
    entities: [__dirname + "/models/**/*.{js,ts}"],
    synchronize: true,
    logging: false,
});
//# sourceMappingURL=connection.js.map