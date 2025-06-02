import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // replace with your API base URL
  timeout: 10000, // optional: request timeout in ms
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${yourToken}`  // optional: auth token
  }
});

export default axiosInstance;