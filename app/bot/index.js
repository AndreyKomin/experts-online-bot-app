import Telegraf from 'telegraf';
import config from 'config';

import { log, Console } from '../debug';

import CommandName from './commands/name';
import CommandRename from './commands/rename';

const TOKEN = config.get('token');
const webHookUrl = `${config.get('url')}/${TOKEN}`;
const bot = new Telegraf(TOKEN);


bot.telegram.setWebhook(webHookUrl);
bot.use(Telegraf.memorySession());

bot.startWebhook(`/${TOKEN}`, null, 3000);

log && Console.log('Business Helper is started');


CommandName(bot);
CommandRename(bot);

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

export default bot;
