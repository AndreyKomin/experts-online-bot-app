import Telegraf from 'telegraf';
import config from 'config';
import mongo from 'mongodb';

const log = process.env.NODE_ENV !== 'production';
const Console = console;

const TOKEN = config.get('token');
const webHookUrl = `${config.get('url')}/${TOKEN}`;
const bot = new Telegraf(TOKEN);

const mongoClient = mongo.MongoClient;
const db = config.get('db');
const dbName = 'customers';
let mongodb;

mongoClient.connect(db.get('url'), (err, database) => {
  if (err) {
    log && Console.error('if ', err);
    return false;
  }
  mongodb = database;
  return log && Console.info('MongoDB is started');
});

const registrationUser = (telegramId, telegramUserName, name, reply) => {
  if (name.length > 0) {
    const note = {
      telegramId,
      telegramUserName,
      name,
    };

    const details = { telegramId };

    mongodb.collection(dbName).findOne(details, (err, item) => {
      if (err) {
        log && Console.log({ error: 'An error has occurred' });
        return false;
      } else if (item === null) {
        mongodb.collection(dbName).insertOne(note, (err2) => {
          if (err2) {
            return reply('Registration error, sorry =)');
          }
          return reply(`Registration complete, ${name}`);
        });
      }
      return reply(`You are already registered, ${item.name}`);
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



    const details = { telegramId };

    mongodb.collection(dbName).updateOne(details, note, (err, item) => {
      if (err) {
        log && Console.log({ error: 'An error has occurred' });
        return false;
      }
      return reply(`Ok, ${item.name}`);
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

bot.hears(/name (.+)/, ({ match, from, reply }) => {
  const userName = match[1];
  return registrationUser(from.id, from.username, userName, reply);
});

bot.hears(/rename (.+)/, ({ match, from, reply }) => {
  const userName = match[1];
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

