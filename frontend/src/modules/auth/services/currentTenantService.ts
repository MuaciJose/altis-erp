import { http } from "../../../services/http";
import type { CurrentTenant } from "../../../types/currentTenant";

export async function getCurrentTenant(): Promise<CurrentTenant> {
    return http<CurrentTenant>("/api/v1/tenant/current");
}