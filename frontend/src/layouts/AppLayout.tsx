import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../modules/auth/store/AuthContext";

export default function AppLayout() {
    const navigate = useNavigate();
    const { user, tenantId, logout } = useAuth();

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <div className="min-h-screen flex bg-slate-100">
            <aside className="w-64 bg-slate-900 text-white p-5 flex flex-col">
                <div className="text-2xl font-bold mb-8">Altis ERP</div>

                <nav className="space-y-2">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10"
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={() => navigate("/clientes")}
                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10"
                    >
                        Clientes
                    </button>

                    <button
                        onClick={() => navigate("/produtos")}
                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10"
                    >
                        Produtos
                    </button>

                    <button
                        onClick={() => navigate("/financeiro")}
                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10"
                    >
                        Financeiro
                    </button>
                </nav>

                <div className="mt-auto space-y-3 border-t border-white/10 pt-4">
                    <div className="text-sm text-slate-300">
                        {user?.name ?? "Usuário"}
                    </div>

                    <div className="text-xs text-slate-500">
                        {user?.email ?? ""}
                    </div>

                    <div className="text-xs text-slate-500">
                        Tenant: {tenantId ?? "-"}
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20"
                    >
                        Sair
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="h-16 bg-white border-b flex items-center px-6 justify-between">
                    <span className="font-semibold">Sistema ERP</span>

                    <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">
              {user?.name ?? "Admin"}
            </span>
                        <div className="h-8 w-8 bg-slate-300 rounded-full" />
                    </div>
                </header>

                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}