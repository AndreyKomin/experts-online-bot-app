import UserRegistration from '../registration';

const CommandName = (bot) => {
  bot.hears(/\/name (.+)/, ({ match, from, reply }) => {
    const userName = match[1];
    return UserRegistration(from.id, from.username, userName, reply);
  });
};

export default CommandName;
