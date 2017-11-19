import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';

import { log, Console } from './debug';

import Bot from './bot';

const app = express();

const port = config.get('http-port');

app.use(bodyParser.json({ type: 'application/*+json' }));

app.listen(port, () => {
  log && Console.log(`We are live on ${port}`);
});


const jsonParser = bodyParser.json();

app.post('/auth', jsonParser, (req, res) => {
  log && Console.log(req.body);
  // db.getChatId(req.params.user).then((item) => {
  Bot.telegram.sendMessage(req.body.chatId, 'Do you want to accept an authorization?', {
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
  res.send(`auth call for: ${req.query.chatId}`);
  // }).catch(() => {
  //   res.send('There is no user!');
  // });
});


app.get('/authRequestToLaravel', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ success: true }));
});
