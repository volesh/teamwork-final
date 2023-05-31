import { DataSource } from "typeorm";
import { envsConfig } from "../configs";

export const dataSourse = new DataSource({
  type: "postgres",
  host: envsConfig.postgresHost,
  port: Number(envsConfig.postgresPort),
  username: envsConfig.postgresUser,
  password: envsConfig.postgresPassword,
  database: envsConfig.postgresDatabase,
  entities: [__dirname + "/models/**/*.{js,ts}"],
  synchronize: true,
  logging: false,
});
