import config from 'config';
import mongo from 'mongodb';

import { log, Console } from './debug';

const mongoClient = mongo.MongoClient;
const db = config.get('db');
const collection = 'users';

class DB {
  constructor() {
    mongoClient.connect(db.get('url')).then((database) => {
      this.mongodb = database;
      this.mongodb.createCollection(collection);
      return log && Console.info('MongoDB is started');
    }).catch(() => {
      log && Console.error('Mongo error');
      return false;
    });
  }
  checkUserIfExist(tId) {
    const details = { tId };
    return this.mongodb.collection(collection).findOne(details);
  }
  insertUser(note) {
    return this.mongodb.collection(collection).insertOne(note);
  }
  updateUser(tId, note) {
    const details = { tId };
    return this.mongodb.collection(collection).updateOne(details, note);
  }
}

export default new DB();
