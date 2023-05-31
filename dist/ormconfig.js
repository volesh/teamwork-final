"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configs_1 = require("./configs");
exports.default = {
    type: "postgres",
    host: configs_1.envsConfig.postgresHost,
    port: Number(configs_1.envsConfig.postgresPort),
    username: configs_1.envsConfig.postgresUser,
    password: configs_1.envsConfig.postgresPassword,
    database: configs_1.envsConfig.postgresDatabase,
    entities: [__dirname + "/database/models/**/*.{js,ts}"],
    synchronize: true,
    logging: false,
};
//# sourceMappingURL=ormconfig.js.map