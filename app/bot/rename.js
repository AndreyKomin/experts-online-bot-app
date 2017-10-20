import db from '../db';
import { log, Console } from '../debug';

const UserRename = (tId, tUserName, name) => new Promise((request, reject) => {
  if (name.length > 0) {
    const note = {
      tId,
      tUserName,
      name,
    };
    db.updateUser(tId, note)
      .then(item => request(item))
      .catch(() => {
        log && Console.log({ error: 'An error has occurred' });
        reject(new Error('An error has occurred'));
      });
  } else {
    reject(new Error('Name is null'));
  }
});

export default UserRename;
