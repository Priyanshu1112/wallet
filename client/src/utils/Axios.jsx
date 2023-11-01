import axios from "axios";

const instance = axios.create({
  baseURL: "https://stock-whisperer-api.onrender.com",
  // baseURL: "http://localhost:3000",
  withCredentials: true,
});

export default instance;
