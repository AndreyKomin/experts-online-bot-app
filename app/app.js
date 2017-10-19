import express from 'express';

import { log, Console } from './debug';

import DB from './db';
import Bot from './bot';

const app = express();

DB.initConnect();

const port = 8080;

app.listen(port, () => {
  log && Console.log(`We are live on ${port}`);
});

app.get('/request', (req, res) => {
  Console.log(`Get query: ${req.query}`);
  const chatId = 375161649;
  Bot.telegram.sendMessage(chatId, `Message from website: ${req.query.message}`);
  res.send('Hello');
});
