import UserRegistration from '../registration';

const CommandRegistration = (bot) => {
  bot.action('registrationCallback', ({ answerCallbackQuery, from, reply }) => {
    UserRegistration(from.id, from.username, from.username)
      .then((item) => {
        console.log(item);
        answerCallbackQuery(item);
      })
      .catch((error) => {
        answerCallbackQuery('error');
        reply(error);
      });
  });
};

export default CommandRegistration;
