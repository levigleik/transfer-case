import axios, { type AxiosInstance } from "axios";
import { env } from "@/lib/env";

const api: AxiosInstance = axios.create({
	baseURL: env.NEXT_PUBLIC_API_URL,
});

export default api;
