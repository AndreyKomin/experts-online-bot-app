import Telegraf from 'telegraf';
import config from 'config';

import { log, Console } from '../debug';

import CommandStart from './commands/start';
import CommandStop from './commands/stop';
import CommandName from './commands/name';
import CommandRename from './commands/rename';
import CommandRegistration from './commands/registration';
import CommandAuth from './commands/auth';

const TOKEN = config.get('token');
const webHookUrl = `${config.get('url')}/${TOKEN}`;
const bot = new Telegraf(TOKEN);

bot.use(Telegraf.log());

bot.telegram.setWebhook(webHookUrl);
bot.use(Telegraf.session());

bot.startWebhook(`/${TOKEN}`, null, config.get('bot-port'));

log && Console.log('Business Helper is started');

CommandStart(bot, Telegraf);
CommandStop(bot);
CommandName(bot);
CommandRename(bot);
CommandRegistration(bot);
CommandAuth(bot);

bot.hears(/lesson (.+)/, ({ match, from, reply }) => {
  const command = match[1];
  if (command === 'start') {
    reply('Начало урока');
  } else if (command === 'stop') {
    reply('Остановка урока');
  }
  return from;
});

bot.on('text', (ctx) => { ctx.reply(`Хватит мне такое говорить. Придумай, что-нибудь новенькое ${ctx.from.username}!`); });

export default bot;
