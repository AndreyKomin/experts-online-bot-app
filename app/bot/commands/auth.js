import axios from 'axios';

const CommandAuth = (bot) => {
  bot.action('authAccept', ({ answerCbQuery, from, reply }) => {
    axios.get('http://localhost:8000/authRequestToLaravel', {
      params: {
        ID: from.id,
      },
    }).then((response) => {
      answerCbQuery(response);
      reply('done');
    }).catch((error) => {
      answerCbQuery('error');
      reply(error);
    });
  });
};

export default CommandAuth;
