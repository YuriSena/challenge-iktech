import axios from 'axios';


export const api = axios.create({
  baseURL: "https://vessels-mock.herokuapp.com",
})