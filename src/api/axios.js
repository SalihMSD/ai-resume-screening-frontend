import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-resume-screener-czfd.onrender.com/api",
});

export default api;