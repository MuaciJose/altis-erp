import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import AppLayout from "../layouts/AppLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "dashboard",
                element: <DashboardPage />,
            },
        ],
    },
]);