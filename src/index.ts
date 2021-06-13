import express from 'express';
import cors from 'cors';
import { config, IConfig } from './config/environment.dev';
import axios from 'axios';
import dotenv from 'dotenv';
import { sendEmail } from './contact';
import asyncHandler from 'express-async-handler';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
const env: IConfig = config;
dotenv.config();

app.listen(env.serverPort, () => console.log(`server is running on port ${env.serverPort}`));

app.get('/instagram', async (req, res) => {
  const result: any = await axios.get(
    `https://graph.instagram.com/17841445240374833/media?fields=id,caption,permalink,thumbnail_url,media_url&access_token=${process.env.INSTAGRAM_TOKEN}`
  );
  res.send(result.data);
});

app.post('/contact', asyncHandler(sendEmail));
