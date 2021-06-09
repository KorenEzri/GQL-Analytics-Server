import axios from 'axios';
const baseURL = 'http://localhost:8080/api/v1';
export const network = axios.create({ baseURL });
export const routes = {
  ThreatenMeDB: `${baseURL}/database/pastes/?checked=`,
};
