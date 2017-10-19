const CommandStart = (bot) => {
  bot.command('start', ({ reply }) => reply(`Отлично друг. Давай начнём.
  Скажи мне и нашим пользователям, как бы ты хотел, что бы к тебе обращались? 
  (Пример: /name Инванов Иван Иванович)`));
};

export default CommandStart;
