const CommandStop = (bot) => {
  bot.command('stop', ctx => ctx.answerCallbackQuery('🎉', undefined, true).then(() => {
    ctx.editMessageText(`🎉 ${ctx.session.value} 🎉`);
  }));
};

export default CommandStop;
