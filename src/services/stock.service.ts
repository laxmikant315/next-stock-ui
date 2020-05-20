import axios from 'axios';

const apiUrl= process.env.REACT_APP_API_URL;

export const getNotifications=(type:string,offSet:number)=> {
  return axios.get(`${apiUrl}/notifications?type=${type}&limit=10&offSet=${offSet}`).then(x=>x.data);
}

