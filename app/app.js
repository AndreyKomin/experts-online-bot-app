import express from 'express';
import config from 'config';

import { log, Console } from './debug';

import Bot from './bot';

const app = express();

const port = config.get('http-port');

app.listen(port, () => {
  log && Console.log(`We are live on ${port}`);
});

app.get('/request', (req, res) => {
  Console.log(`Get query: ${req.query}`);
  const chatId = 375161649;
  Bot.telegram.sendMessage(chatId, `Message from website: ${req.query.message}`);
  res.send('Hello');
});
