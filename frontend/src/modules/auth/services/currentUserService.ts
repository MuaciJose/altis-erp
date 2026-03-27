import { http } from "../../../services/http";
import type { CurrentUser } from "../types/currentUser";

export async function getCurrentUser(): Promise<CurrentUser> {
    return http<CurrentUser>("/api/v1/users/me");
}