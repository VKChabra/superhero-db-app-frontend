import axios from "axios";

export const baseURL = "http://localhost:3001";
const API = axios.create({
  baseURL,
  timeout: 10000,
});

export default API;
