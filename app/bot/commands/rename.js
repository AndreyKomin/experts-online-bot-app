import UserRename from '../rename';
import { log, Console } from '../../debug';

const CommandName = (bot) => {
  bot.hears(/\/rename (.+)/, ({ match, from, reply }) => {
    const userName = match[1];
    log && Console.log(from.username);
    UserRename(from.id, from.username, userName)
      .then(item => reply(`Ok, ${item.name}`))
      .catch(error => reply(error));
  });
};

export default CommandName;
