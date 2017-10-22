import message from '../messages.json';
import UserRegistration from './registration';

const CommandStart = (bot, Telegraf) => {
  bot.command('start', (ctx) => {
    ctx.reply(message.start.english, Telegraf.Extra
      .markdown()
      .markup(m => m.inlineKeyboard([
        m.callbackButton('Yes', 'yesCallback'),
        m.callbackButton('Registration', 'registrationCallback'),
      ])));
  });

  UserRegistration(bot);

  bot.action('yesCallback', ({ answerCallbackQuery, reply }) => {
    reply('Спасибо что вы с нами', Telegraf.Extra
      .markup(m => m.keyboard([[
        m.callbackButton('lesson start', 'lessonStart'),
        m.callbackButton('lesson stop', 'lessonStop'),
      ]]))).then(() => answerCallbackQuery('Ну и отлично'));
  });
};

export default CommandStart;
