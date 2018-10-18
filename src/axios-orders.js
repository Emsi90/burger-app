import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-app-e8c0b.firebaseio.com/'
});

export default instance;