import db from '../db';
import { log, Console } from '../debug';

const UserRegistration = (tId, tUserName, name) => new Promise((request, reject) => {
  if (name.length > 0) {
    const note = {
      tId,
      tUserName,
      name,
    };
    db.checkUserIfExist(tId).then((item) => {
      if (item === null) {
        db.insertUser(note)
          .then(() => request(`Registration complete, ${name}`))
          .catch((err) => {
            log && Console.log(err);
            reject(new Error('Registration error, sorry =)'));
          });
      } else {
        request(`You are already registered, ${name}`);
      }
    }).catch((err) => {
      log && Console.log(err);
      reject(new Error('Registration error, sorry =)'));
    });
  }
});

export default UserRegistration;
