import db from '../db';
import { log, Console } from '../debug';

const UserRename = (tId, tUserName, name, reply) => {
  if (name.length > 0) {
    const note = {
      tId,
      tUserName,
      name,
    };
    db.updateUser(tId, note)
      .then(item => reply(`Ok, ${item.name}`))
      .catch(() => {
        log && Console.log({ error: 'An error has occurred' });
        return false;
      });
  }
};

export default UserRename;
