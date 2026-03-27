import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import AppLayout from "../layouts/AppLayout";
import AuthGuard from "../components/guards/AuthGuard";
import CustomersPage from "../pages/customers/CustomersPage";

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
            {
                path: "clientes",
                element: <CustomersPage />,
            }
        ],
    },
]);