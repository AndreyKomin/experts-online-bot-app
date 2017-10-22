import UserRegistration from '../registration';

const CommandName = (bot) => {
  bot.action('registrationCallback', ({ answerCallbackQuery, from, reply }) => {
    UserRegistration(from.id, from.username, from.username)
      .then(item => answerCallbackQuery(item))
      .catch((error) => {
        answerCallbackQuery('error');
        reply(error);
      });
  });
};

export default CommandName;
