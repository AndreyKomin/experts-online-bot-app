import config from 'config';
import mongo from 'mongodb';

import { log, Console } from './debug';

const mongoClient = mongo.MongoClient;
const db = config.get('db');
const dbName = 'customers';
let mongodb;


const DB = {
  initConnect() {
    mongoClient.connect(db.get('url')).then((database) => {
      mongodb = database;
      return log && Console.info('MongoDB is started');
    }).catch((err) => {
      log && Console.error('if ', err);
      return false;
    });
  },
  checkUserIfExist(tId) {
    const details = { tId };
    return mongodb.collection(dbName).findOne(details);
  },
  insertUser(note) {
    return mongodb.collection(dbName).insertOne(note);
  },
  updateUser(tId, note) {
    const details = { tId };
    return mongodb.collection(dbName).updateOne(details, note);
  },
};

export default DB;
