import express from "express";
import { envsConfig } from "./configs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(envsConfig.port, async () => {
  console.log(`Port listen: ${envsConfig.port}`);
});
