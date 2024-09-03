import { API_URL } from '@/utils/config';
import axios from 'axios';

const Axios = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default Axios;
