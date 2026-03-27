import { http } from "../../../services/http";
import type { LoginRequest, LoginResponse } from "../types/auth";

export async function login(request: LoginRequest): Promise<LoginResponse> {
    return http<LoginResponse>("/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify(request),
    });
}