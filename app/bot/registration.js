import axios from 'axios';

const UserRegistration = (tId, tUserName) => {
  const data = {
    code: 'telegram',
    login: tUserName,
    chatId: tId,
  };

  return axios.post('https://ekbrand.tk/api/register', data);
};

export default UserRegistration;
