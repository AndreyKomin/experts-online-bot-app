import checkUser from '../checkUser';

const checkRegistration = (ctx, Telegraf) => {
  checkUser(ctx.message.from.id).then((item) => {
    ctx.reply(`Hello, ${item.tUserName}!`, Telegraf.Extra
      .markdown()
      .markup(m => m.inlineKeyboard([
        m.callbackButton('Hi!', 'yesCallback'),
      ])));
  }).catch(() => {
    ctx.reply('You are not registered!', Telegraf.Extra
      .markdown()
      .markup(m => m.inlineKeyboard([
        m.callbackButton('Registration', 'registrationCallback'),
      ])));
  });
};

const CommandStart = (bot, Telegraf) => {
  bot.command('start', (ctx) => {
    checkRegistration(ctx, Telegraf);
  });
  bot.action('yesCallback', ({ answerCallbackQuery, reply }) => {
    reply('So, let\'s continue. What do you want to do?', Telegraf.Extra
      .markup(m => m.keyboard([[
        m.callbackButton('lesson start', 'lessonStart'),
        m.callbackButton('lesson stop', 'lessonStop'),
      ]]))).then(() => answerCallbackQuery('That\'s great!'));
  });
};

export default CommandStart;
