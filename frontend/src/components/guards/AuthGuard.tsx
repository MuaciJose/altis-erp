import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../modules/auth/store/authStorage";

type AuthGuardProps = {
    children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
    if (!isAuthenticated()) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}