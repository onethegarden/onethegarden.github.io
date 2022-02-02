import axios from 'axios';

const host = process.env.GATSBY_API_URL;

const apiClient = axios.create({
  baseURL: host,
  timeout: 3000,
});

export default apiClient;
