import express from 'express';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import cors from 'cors';
import { config, IConfig } from './config/environment.dev';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
const env: IConfig = config;

app.listen(env.serverPort, () => console.log(`server is running on port ${env.serverPort}`));

// on définit la fonction connectToDb qu'on appelle immédiatement
(async () => {
  await mongoose.connect(env.db, env.options);
  console.log(`MonboDB is running, using the connection ${env.db}`);
})();
