import { HOST_URL } from "@/config";
import Cookies from "js-cookie";

export const login = async (username, password) => {
  try {
    const response = await fetch(`${HOST_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const { data, message } = await response.json();
    if (response.status === 400 || !data) {
      throw message
    } else {
      Cookies.set('token', data);
      return true
    }
  } catch (e) {
    throw e
  }
}