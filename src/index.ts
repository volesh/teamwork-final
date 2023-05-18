import express, { Response, NextFunction } from "express";
import { envsConfig } from "./configs";
import { apiRouter } from "./routes/api.router";
import { IRequest } from "./interfaces";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

// eslint-disable-next-line no-unused-vars
app.use((err: any, req: IRequest, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    errorMessage: err.message || "Unknown error",
    statusCode: err.status || 500,
  });
});

app.listen(envsConfig.port, async () => {
  console.log(`Port listen: ${envsConfig.port}`);
});
