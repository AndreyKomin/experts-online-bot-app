import Telegraf from 'telegraf';
import config from 'config';
import express from 'express';

import DB from './db';

const app = express();

const log = process.env.NODE_ENV !== 'production';
const Console = console;

const TOKEN = config.get('token');
const webHookUrl = `${config.get('url')}/${TOKEN}`;
const bot = new Telegraf(TOKEN);

DB.initConnect();

const registrationUser = (telegramId, telegramUserName, name, reply) => {
  if (name.length > 0) {
    const note = {
      telegramId,
      telegramUserName,
      name,
    };
    DB.checkUserIfExist(telegramId).then((item) => {
      if (item === null) {
        DB.insertUser(note)
          .then(() => reply(`Registration complete, ${name}`))
          .catch(() => reply('Registration error, sorry =)'));
      }
      return reply(`You are already registered, ${item.name}`);
    }).catch(() => {
      log && Console.log({ error: 'An error has occurred' });
    });
  }
};

const renameUser = (telegramId, telegramUserName, name, reply) => {
  if (name.length > 0) {
    const note = {
      telegramId,
      telegramUserName,
      name,
    };
    DB.updateUser(telegramId, note)
      .then(item => reply(`Ok, ${item.name}`))
      .catch(() => {
        log && Console.log({ error: 'An error has occurred' });
        return false;
      });
  }
};

bot.telegram.setWebhook(webHookUrl);
bot.use(Telegraf.memorySession());

bot.startWebhook(`/${TOKEN}`, null, 3000);

log && Console.log('Business Helper is started');

bot.command('stop', (ctx) => {
  log && Console.log(ctx);
  return ctx.answerCallbackQuery(ctx.callback_query_id, 'ok');
});

bot.command('start', ({ reply }) => reply(`Отлично друг. Давай начнём.
  Скажи мне и нашим пользователям, как бы ты хотел, что бы к тебе обращались? 
  (Пример: /name Инванов Иван Иванович)`));

bot.catch((err) => {
  log && Console.log('Ooops', err);
});

bot.hears(/\/name (.+)/, ({ match, from, reply }) => {
  const userName = match[1];
  Console.log(from);
  return registrationUser(from.id, from.username, userName, reply);
});

bot.hears(/\/rename (.+)/, ({ match, from, reply }) => {
  const userName = match[1];
  log && Console.log(from.username);
  return renameUser(from.id, from.username, userName, reply);
});

bot.hears(/lesson (.+)/, ({ match, from, reply }) => {
  const command = match[1];
  if (command === 'start') {
    reply('Начало урока');
  } else if (command === 'stop') {
    reply('Остановка урока');
  }
  return from;
});

bot.on('text', ctx => ctx.reply(`Хватит мне такое говорить. Придумай, что-нибудь новенькое ${ctx.from.username}!`));


const port = 8080;

app.listen(port, () => {
  Console.log(`We are live on ${port}`);
});

app.get('/request', (req, res) => {
  Console.log(`Get query: ${req.query}`);
  const chatId = 375161649;
  bot.telegram.sendMessage(chatId, `Message from website: ${req.query.message}`);
  res.send('Hello');
});
