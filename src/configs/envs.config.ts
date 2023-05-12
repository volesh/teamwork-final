import { config } from "dotenv";
config();

export const envsConfig = {
  port: Number(process.env.PORT),
  redirectUrl: process.env.TEAMWORK_REDIRECT_URL,
  teamworkClientId: process.env.TEAMWORK_CLIENT_ID,
  teamworkClientSecret: process.env.TEAMWORK_CLIENT_SECRET,
  teamworkLogin: process.env.TEAMWORK_LOGIN,
  teamworkBaseUrl: process.env.TEAMWORK_BASE_URL,
};
