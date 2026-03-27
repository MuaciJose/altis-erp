import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import AppLayout from "../layouts/AppLayout";
import AuthGuard from "../components/guards/AuthGuard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/",
        element: (
            <AuthGuard>
                <AppLayout />
            </AuthGuard>
        ),
        children: [
            {
                path: "dashboard",
                element: <DashboardPage />,
            },
        ],
    },
]);