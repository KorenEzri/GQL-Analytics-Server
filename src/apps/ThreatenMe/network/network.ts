import axios from 'axios';
const baseURL = 'http://localhost:8080/api/v1';
export const network = axios.create({ withCredentials: true, baseURL });
export const routes = {
  ThreatenMeDB: {
    stronghold: `${baseURL}/database/stronghold`,
    deeppaste: `${baseURL}/database/deeppaste`,
  },
};
