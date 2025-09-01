import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // ajustá al puerto que usa tu backend
});

export default api;
