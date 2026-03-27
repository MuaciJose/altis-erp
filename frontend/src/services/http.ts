import { getToken } from "../modules/auth/store/authStorage";

const API_BASE_URL = "http://localhost:8080";

export async function http<T>(
    path: string,
    options?: RequestInit
): Promise<T> {
    const token = getToken();

    const response = await fetch(`${API_BASE_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options?.headers ?? {}),
        },
        ...options,
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Erro na requisição");
    }

    return response.json() as Promise<T>;
}