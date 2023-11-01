import axios from "axios";

const instance = axios.create({
  baseURL: "https://stock-whisperer-api.onrender.com/",
  withCredentials: true,
});

export default instance;

// KnXjfxqCEUxbnRja
