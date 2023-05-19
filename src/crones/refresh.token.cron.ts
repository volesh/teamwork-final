import { CronJob } from "cron";
import { getTokens, timelyService } from "../services";
import { promises as fs } from "fs";

export const refreshTokenCrone = new CronJob("0 0 1,15 * * *", async (): Promise<void> => {
  try {
    const tokens = await getTokens();

    const { data } = await timelyService.refreshToken(tokens.refresh_token || "KJrife0m18pO5JasObXF4lv_uv6jBMeRjoaKTfFf54I");
    console.log(data);

    await fs.writeFile("./src/tokens.json", JSON.stringify(data));
    console.log("finished");
  } catch (e: any) {
    console.log(e.message);
  }
});
