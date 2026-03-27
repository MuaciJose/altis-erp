import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../modules/auth/services/authService";
import { saveToken } from "../../modules/auth/store/authStorage";

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("admin@altis.com");
    const [password, setPassword] = useState("123456");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await login({ email, password });
            saveToken(response.accessToken);
            navigate("/dashboard");
        } catch (err) {
            setError("E-mail ou senha inválidos");
        } finally {
            setLoading(false);
        }
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-2xl px-4 py-3"
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-2xl px-4 py-3"
                    />

                    {error && (
                        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold disabled:opacity-60"
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </form>
            </div>
        </div>
    );
}