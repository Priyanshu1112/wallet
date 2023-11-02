import axios from "axios";

const instance = axios.create({
  baseURL: "https://stock-whisperer-api.onrender.com/",
  // baseURL: "http://localhost:3000",
  // withCredentials: true,
  // headers: {
    // Add default headers here
    // 'Content-Type': 'application/json', // Example content type
  // },
});

export default instance;
