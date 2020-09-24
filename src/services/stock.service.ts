import axios from 'axios';

const apiUrl= process.env.REACT_APP_API_URL;

export const getNotifications=(type:string,offSet?:string,limit:number=10)=> {
  return axios.get(`${apiUrl}/notifications?type=${type}${offSet ? `&limit=${limit}&offSet=${offSet}` : ""}`).then(x=>x.data);
}

