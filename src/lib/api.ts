import axios from "axios";
import { cookies } from "next/headers";

const api = axios.create({
  baseURL: process.env.BACKEND_API_URL,
});

api.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
