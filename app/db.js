import config from 'config';
import mongo from 'mongodb';

import { log, Console } from './debug';

const mongoClient = mongo.MongoClient;
const db = config.get('db');

class DB {
  constructor() {
    this.collection = 'users';

    mongoClient.connect(db.get('url')).then((database) => {
      this.mongodb = database;
      this.mongodb.createCollection(this.collection);
      return log && Console.info('MongoDB is started');
    }).catch(() => {
      log && Console.error('Mongo error');
      return false;
    });
  }
  checkUserIfExist(tId) {
    const details = { tId };
    return this.mongodb.collection(this.collection).findOne(details);
  }
  getChatId(tUserName) {
    const details = { tUserName };
    return this.mongodb.collection(this.collection).findOne(details);
  }
  insertUser(note) {
    return this.mongodb.collection(this.collection).insertOne(note);
  }
  updateUser(tId, note) {
    const details = { tId };
    return this.mongodb.collection(this.collection).updateOne(details, note);
  }
}

export default new DB();
