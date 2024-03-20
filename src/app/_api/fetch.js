import { API_URL } from "@/config"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const UNAUTHORIZE_CODE = 403;
const UNAUTHENTICATE_CODE = 401;

export async function authFetch(url, method = 'get', headers={}, body) {
  const token = cookies().get('token')?.value
  if(!token) {
    redirect('/login')
  }
  try {
    const payload = {
      method,
      headers: {
        ...headers,
        'Authorization': `Bearer ${token}`,
      }
    }
    if(body) {
      payload.body = body
    }
    const response = await fetch(`${API_URL}${url}`, payload);
    if (response.status === UNAUTHENTICATE_CODE) {
      throw { error: response.status, message: "Unauthenticated" }
    }
    if (response.status === UNAUTHORIZE_CODE) {
      throw { error: response.status, message: "Unauthorized" }
    }
    return response;
  } catch (e) {
    throw e;
  }
}
