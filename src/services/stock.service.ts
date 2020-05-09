import axios from 'axios';

const apiUrl= process.env.REACT_APP_API_URL;

export const getNotifications=()=> {
  return axios.get(`${apiUrl}/notifications`).then(x=>x.data);
}

