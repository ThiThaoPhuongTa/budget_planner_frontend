import axios from "axios";

export const request = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  headers: {
    post: { 'Content-Type': 'application/json' },
  }
});