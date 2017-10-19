import DB from '../db';
import { log, Console } from '../debug';

const UserRegistration = (tId, tUserName, name, reply) => {
  if (name.length > 0) {
    const note = {
      tId,
      tUserName,
      name,
    };
    DB.checkUserIfExist(tId).then((item) => {
      if (item === null) {
        DB.insertUser(note)
          .then(() => reply(`Registration complete, ${name}`))
          .catch(() => reply('Registration error, sorry =)'));
      }
      log && Console.log(item);
      return reply(`You are already registered, ${item.name}`);
    }).catch((err) => {
      log && Console.log(err);
    });
  }
};

export default UserRegistration;