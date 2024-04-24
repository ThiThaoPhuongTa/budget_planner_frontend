import { User } from "../domain/user";
import { request } from "./request";

export const me: () => Promise<User> = async () => {
  try {
    const response = await request.get('/me');
    return response.data;
  } catch (error) {
    return null;
  }
};

export const logout = async () => {
  try {
    await request.get('/logout');
  } catch (error) {
    console.error(error);
  }
};