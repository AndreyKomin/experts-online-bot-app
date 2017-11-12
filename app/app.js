import express from 'express';
import config from 'config';
import db from './db';

import { log, Console } from './debug';

import Bot from './bot';

const app = express();

const port = config.get('http-port');

app.listen(port, () => {
  log && Console.log(`We are live on ${port}`);
});


app.get('/auth', (req, res) => {
  db.getChatId(req.query.user).then((item) => {
    Bot.telegram.sendMessage(item.tId, 'Do you want to accept an authorization?', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Accept', callback_data: 'authAccept' },
            { text: 'Decline', callback_data: 'authDecline' },
          ],
        ],
      },
    }).catch((err) => {
      log && Console.log('Ooops', err);
    });
    res.send(`auth call for: ${item.tId}`);
  }).catch(() => {
    res.send('There is no user!');
  });
});


app.get('/authRequestToLaravel', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ success: true }));
});
