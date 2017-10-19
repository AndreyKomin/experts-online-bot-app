import UserRename from '../rename';
import { log, Console } from '../../debug';

const CommandName = (bot) => {
  bot.hears(/\/rename (.+)/, ({ match, from, reply }) => {
    const userName = match[1];
    log && Console.log(from.username);
    return UserRename(from.id, from.username, userName, reply);
  });
};

export default CommandName;
