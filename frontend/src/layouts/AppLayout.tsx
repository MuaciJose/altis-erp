import { Outlet, useNavigate } from "react-router-dom";

export default function AppLayout() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex bg-slate-100">
            {/* Sidebar */}
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

                <div className="mt-auto text-sm text-slate-400">
                    Altis Tecnologia
                </div>
            </aside>

            {/* Conteúdo */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-16 bg-white border-b flex items-center px-6 justify-between">
                    <span className="font-semibold">Sistema ERP</span>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-500">Admin</span>
                        <div className="h-8 w-8 bg-slate-300 rounded-full" />
                    </div>
                </header>

                {/* Página */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}