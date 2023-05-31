import { envsConfig } from "./configs";

export default {
  type: "postgres",
  host: envsConfig.postgresHost,
  port: Number(envsConfig.postgresPort),
  username: envsConfig.postgresUser,
  password: envsConfig.postgresPassword,
  database: envsConfig.postgresDatabase,
  entities: [__dirname + "/database/models/**/*.{js,ts}"],
  synchronize: true,
  logging: false,
};
