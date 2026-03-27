import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { getCurrentUser } from "../services/currentUserService";
import { getCurrentTenant } from "../services/currentTenantService";
import { getToken, removeToken } from "./authStorage";
import type { CurrentUser } from "../types/currentUser";

type AuthContextType = {
    user: CurrentUser | null;
    tenantId: number | null;
    loading: boolean;
    isAuthenticated: boolean;
    reloadUser: () => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<CurrentUser | null>(null);
    const [tenantId, setTenantId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    const logout = useCallback(() => {
        removeToken();
        setUser(null);
        setTenantId(null);
    }, []);

    const reloadUser = useCallback(async () => {
        const token = getToken();

        if (!token) {
            setUser(null);
            setTenantId(null);
            setLoading(false);
            return;
        }

        try {
            const [currentUser, currentTenant] = await Promise.all([
                getCurrentUser(),
                getCurrentTenant(),
            ]);

            setUser(currentUser);
            setTenantId(currentTenant.tenantId);
        } catch {
            removeToken();
            setUser(null);
            setTenantId(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        reloadUser();
    }, [reloadUser]);

    const value = useMemo(
        () => ({
            user,
            tenantId,
            loading,
            isAuthenticated: !!user,
            reloadUser,
            logout,
        }),
        [user, tenantId, loading, reloadUser, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }

    return context;
}