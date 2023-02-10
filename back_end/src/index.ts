import env from 'dotenv';
import express, { Express } from 'express';
import accessCodeRouter from './router/access_code';
import githubRouter from './router/github';
const cors = require('cors');

env.config();
const app: Express = express();
app.use(cors());
const port = process.env.PORT;

app.use(express.json());
app.use('/accessCode', accessCodeRouter);
app.use('/github', githubRouter);

app.listen(port, () => {
  console.log(`Express running → ${port}`);
});
