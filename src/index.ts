import express from "express";
import { envsConfig } from "./configs";
import { apiRouter } from "./routes/api.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

app.listen(envsConfig.port, async () => {
  console.log(`Port listen: ${envsConfig.port}`);
});
