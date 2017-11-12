import db from '../db';

const checkUser = chatId => db.checkUserIfExist(chatId);

export default checkUser;
