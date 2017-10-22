import UserRegistration from '../registration';

const CommandName = (bot) => {
  bot.hears(/Registration/, ({ from, reply }) => {
    UserRegistration(from.id, from.username, from.username)
      .then(item => reply(item))
      .catch(error => reply(error));
  });
};

export default CommandName;
