import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

export const me: () => Promise<any> = async () => {
  try {
    const response = await axios.get('/me');
    return response.data;
  } catch (error) {
    return null;
  }
}