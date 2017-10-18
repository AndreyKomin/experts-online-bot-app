import config from 'config';
import mongo from 'mongodb';

const log = process.env.NODE_ENV !== 'production';
const Console = console;

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
  checkUserIfExist(telegramId) {
    const details = { telegramId };
    return mongodb.collection(dbName).findOne(details);
  },
  insertUser(note) {
    return mongodb.collection(dbName).insertOne(note);
  },
  updateUser(telegramId, note) {
    const details = { telegramId };
    return mongodb.collection(dbName).updateOne(details, note);
  },
};

export default DB;
