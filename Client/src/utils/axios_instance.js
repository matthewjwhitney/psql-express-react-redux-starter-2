import axios from 'axios';

//Override default global axios base url
const axiosInstance = axios.create({
  baseURL: "/"
})

export default axiosInstance;
