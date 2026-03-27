export default function App() {
  return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="grid lg:grid-cols-2 max-w-6xl w-full bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 text-white p-10 flex flex-col justify-between">
            <div>
              <div className="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl font-bold">
                A
              </div>
              <h1 className="text-4xl font-bold mt-6">Altis ERP</h1>
              <p className="text-slate-300 mt-4 text-lg">
                Plataforma de gestão empresarial criada para centralizar operações,
                elevar o controle e acelerar resultados.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <div className="text-slate-400">Multiempresa</div>
                <div className="font-semibold mt-1">Controle por tenant</div>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <div className="text-slate-400">Segurança</div>
                <div className="font-semibold mt-1">Auditoria e permissões</div>
              </div>
            </div>
          </div>

          <div className="p-8 lg:p-10 flex items-center justify-center bg-slate-50">
            <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
              <div className="text-center mb-8">
                <div className="mx-auto h-14 w-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-2xl font-bold">
                  A
                </div>
                <h2 className="text-2xl font-bold mt-4">Entrar na plataforma</h2>
                <p className="text-slate-500 mt-2">Gestão em alto nível</p>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium">E-mail</label>
                  <input
                      type="email"
                      placeholder="seuemail@empresa.com"
                      className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Senha</label>
                  <input
                      type="password"
                      placeholder="••••••••"
                      className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-2xl bg-blue-600 py-3 font-semibold text-white hover:opacity-95"
                >
                  Acessar Altis ERP
                </button>
              </form>

              <div className="text-center text-sm text-slate-500 mt-4">
                Ambiente seguro · Auditoria ativa · LGPD
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}