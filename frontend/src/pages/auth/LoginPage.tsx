import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        navigate("/dashboard");
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center">Altis ERP</h1>
                <p className="text-slate-500 text-center mt-2">Gestão em alto nível</p>

                <form onSubmit={handleLogin} className="mt-6 space-y-4">
                    <input
                        type="email"
                        placeholder="E-mail"
                        className="w-full border rounded-2xl px-4 py-3"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        className="w-full border rounded-2xl px-4 py-3"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}