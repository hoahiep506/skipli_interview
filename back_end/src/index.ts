import express, { Express, Request, Response } from "express";
import env from "dotenv";
import accessCodeRouter from './router/access_code';
import githubRouter from './router/github';

env.config();
const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/accessCode", accessCodeRouter)
app.use("/github", githubRouter)

app.listen(port, () => {
  console.log(`Express running → ${port}`);
});
