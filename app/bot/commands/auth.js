import axios from 'axios';

const CommandAuth = (bot) => {
  bot.action('authAccept', ({ answerCbQuery, from, reply }) => {
    axios.post('https://ekbrand.tk/api/decision', {
      code: 'telegram',
      decision: true,
      chatId: from.id,
    }).then((response) => {
      console.log(response);
      answerCbQuery('acq: done');
      reply('done');
    }).catch((error) => {
      console.info(error);
      answerCbQuery('acq: error');
      reply('r: error');
    });
  });
};

export default CommandAuth;
