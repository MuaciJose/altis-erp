import { useEffect, useState } from "react";
import { http } from "../../services/http";

type Customer = {
    id: number;
    type: string;
    status: string;
    name: string;
    tradeName?: string;
    document: string;
    email?: string;
    city?: string;
    state?: string;
};

type CepLookupResponse = {
    zipCode: string;
    street: string;
    complement: string;
    district: string;
    city: string;
    state: string;
};

type CnpjLookupResponse = {
    legalName: string;
    tradeName: string;
    document: string;
    zipCode: string;
    street: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    state: string;
};

type CustomerForm = {
    type: string;
    status: string;
    name: string;
    tradeName: string;
    document: string;
    secondaryDocument: string;
    birthOrFoundationDate: string;
    email: string;
    mobilePhone: string;
    landlinePhone: string;
    zipCode: string;
    street: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    state: string;
    profession: string;
    companyName: string;
    responsibleSeller: string;
    notes: string;
    tags: string;
};

const initialForm: CustomerForm = {
    type: "PF",
    status: "ACTIVE",
    name: "",
    tradeName: "",
    document: "",
    secondaryDocument: "",
    birthOrFoundationDate: "",
    email: "",
    mobilePhone: "",
    landlinePhone: "",
    zipCode: "",
    street: "",
    number: "",
    complement: "",
    district: "",
    city: "",
    state: "",
    profession: "",
    companyName: "",
    responsibleSeller: "",
    notes: "",
    tags: "",
};

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [form, setForm] = useState<CustomerForm>(initialForm);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [lookingCep, setLookingCep] = useState(false);
    const [lookingCnpj, setLookingCnpj] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function loadCustomers() {
        try {
            setLoading(true);
            const data = await http<Customer[]>("/api/v1/customers");
            setCustomers(data);
        } catch {
            setError("Erro ao carregar clientes");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCustomers();
    }, []);

    function updateField(field: keyof CustomerForm, value: string) {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    async function handleLookupCep() {
        try {
            setError("");
            setLookingCep(true);

            const cep = form.zipCode.replace(/\D/g, "");
            const data = await http<CepLookupResponse>(`/api/v1/registry/cep/${cep}`);

            setForm((prev) => ({
                ...prev,
                zipCode: data.zipCode ?? prev.zipCode,
                street: data.street ?? "",
                complement: prev.complement || data.complement || "",
                district: data.district ?? "",
                city: data.city ?? "",
                state: data.state ?? "",
            }));
        } catch {
            setError("Não foi possível localizar o CEP");
        } finally {
            setLookingCep(false);
        }
    }

    async function handleLookupCnpj() {
        try {
            setError("");
            setLookingCnpj(true);

            const cnpj = form.document.replace(/\D/g, "");
            const data = await http<CnpjLookupResponse>(`/api/v1/registry/cnpj/${cnpj}`);

            setForm((prev) => ({
                ...prev,
                type: "PJ",
                name: data.legalName ?? prev.name,
                tradeName: data.tradeName ?? "",
                document: data.document ?? prev.document,
                zipCode: data.zipCode ?? "",
                street: data.street ?? "",
                number: data.number ?? "",
                complement: data.complement ?? "",
                district: data.district ?? "",
                city: data.city ?? "",
                state: data.state ?? "",
            }));
        } catch {
            setError("Não foi possível localizar o CNPJ");
        } finally {
            setLookingCnpj(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!form.name.trim()) {
            setError("Nome/Razão social é obrigatório");
            return;
        }

        if (!form.document.trim()) {
            setError("CPF/CNPJ é obrigatório");
            return;
        }

        try {
            setSaving(true);

            await http<Customer>("/api/v1/customers", {
                method: "POST",
                body: JSON.stringify({
                    ...form,
                    zipCode: form.zipCode.replace(/\D/g, ""),
                    document: form.document.replace(/\D/g, ""),
                }),
            });

            setForm(initialForm);
            setSuccess("Cliente salvo com sucesso");
            await loadCustomers();
        } catch {
            setError("Erro ao salvar cliente");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Clientes</h1>
                <p className="text-slate-500 mt-1">
                    Cadastro completo de clientes PF e PJ
                </p>
            </div>

            <div className="grid xl:grid-cols-[520px_1fr] gap-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                    <h2 className="text-lg font-bold mb-4">Novo cliente</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">Tipo</label>
                                <select
                                    value={form.type}
                                    onChange={(e) => updateField("type", e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 bg-white"
                                >
                                    <option value="PF">Pessoa Física</option>
                                    <option value="PJ">Pessoa Jurídica</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Situação</label>
                                <select
                                    value={form.status}
                                    onChange={(e) => updateField("status", e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 bg-white"
                                >
                                    <option value="ACTIVE">Ativo</option>
                                    <option value="INACTIVE">Inativo</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                {form.type === "PF" ? "Nome completo" : "Razão social"}
                            </label>
                            <input
                                value={form.name}
                                onChange={(e) => updateField("name", e.target.value)}
                                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                            />
                        </div>

                        {form.type === "PJ" && (
                            <div>
                                <label className="text-sm font-medium">Nome fantasia</label>
                                <input
                                    value={form.tradeName}
                                    onChange={(e) => updateField("tradeName", e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-[1fr_auto] gap-3">
                            <div>
                                <label className="text-sm font-medium">
                                    {form.type === "PF" ? "CPF" : "CNPJ"}
                                </label>
                                <input
                                    value={form.document}
                                    onChange={(e) => updateField("document", e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                                />
                            </div>

                            {form.type === "PJ" && (
                                <button
                                    type="button"
                                    onClick={handleLookupCnpj}
                                    disabled={lookingCnpj}
                                    className="self-end rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white disabled:opacity-60"
                                >
                                    {lookingCnpj ? "Buscando..." : "Buscar CNPJ"}
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">
                                    {form.type === "PF" ? "RG" : "Inscrição Estadual"}
                                </label>
                                <input
                                    value={form.secondaryDocument}
                                    onChange={(e) => updateField("secondaryDocument", e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">
                                    {form.type === "PF" ? "Data de nascimento" : "Fundação"}
                                </label>
                                <input
                                    type="date"
                                    value={form.birthOrFoundationDate}
                                    onChange={(e) => updateField("birthOrFoundationDate", e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">Celular</label>
                                <input
                                    value={form.mobilePhone}
                                    onChange={(e) => updateField("mobilePhone", e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Fixo</label>
                                <input
                                    value={form.landlinePhone}
                                    onChange={(e) => updateField("landlinePhone", e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">E-mail</label>
                            <input
                                value={form.email}
                                onChange={(e) => updateField("email", e.target.value)}
                                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                            />
                        </div>

                        <div className="grid grid-cols-[1fr_auto] gap-3">
                            <div>
                                <label className="text-sm font-medium">CEP</label>
                                <input
                                    value={form.zipCode}
                                    onChange={(e) => updateField("zipCode", e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={handleLookupCep}
                                disabled={lookingCep}
                                className="self-end rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white disabled:opacity-60"
                            >
                                {lookingCep ? "Buscando..." : "Buscar CEP"}
                            </button>
                        </div>

                        <div>
                            <label className="text-sm font-medium">Logradouro</label>
                            <input
                                value={form.street}
                                onChange={(e) => updateField("street", e.target.value)}
                                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="text-sm font-medium">Número</label>
                                <input
                                    value={form.number}
                                    onChange={(e) => updateField("number", e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="text-sm font-medium">Complemento</label>
                                <input
                                    value={form.complement}
                                    onChange={(e) => updateField("complement", e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="text-sm font-medium">Bairro</label>
                                <input
                                    value={form.district}
                                    onChange={(e) => updateField("district", e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Cidade</label>
                                <input
                                    value={form.city}
                                    onChange={(e) => updateField("city", e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">UF</label>
                                <input
                                    value={form.state}
                                    onChange={(e) => updateField("state", e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">Profissão/Cargo</label>
                                <input
                                    value={form.profession}
                                    onChange={(e) => updateField("profession", e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Empresa onde trabalha</label>
                                <input
                                    value={form.companyName}
                                    onChange={(e) => updateField("companyName", e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">Vendedor responsável</label>
                            <input
                                value={form.responsibleSeller}
                                onChange={(e) => updateField("responsibleSeller", e.target.value)}
                                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Tags</label>
                            <input
                                value={form.tags}
                                onChange={(e) => updateField("tags", e.target.value)}
                                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                                placeholder="vip, recorrente, atacado"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Observações</label>
                            <textarea
                                value={form.notes}
                                onChange={(e) => updateField("notes", e.target.value)}
                                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 min-h-[100px]"
                            />
                        </div>

                        {error && (
                            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                                {success}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full rounded-2xl bg-blue-600 py-3 font-semibold text-white disabled:opacity-60"
                        >
                            {saving ? "Salvando..." : "Salvar cliente"}
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold">Lista de clientes</h2>
                        <span className="text-sm text-slate-500">
              {customers.length} registro(s)
            </span>
                    </div>

                    {loading ? (
                        <div className="text-slate-500">Carregando clientes...</div>
                    ) : customers.length === 0 ? (
                        <div className="text-slate-500">Nenhum cliente cadastrado</div>
                    ) : (
                        <div className="space-y-3">
                            {customers.map((customer) => (
                                <div
                                    key={customer.id}
                                    className="rounded-2xl border border-slate-200 p-4"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="font-semibold">{customer.name}</div>
                                            <div className="text-sm text-slate-500 mt-1">
                                                {customer.tradeName || customer.email || "Sem detalhe"}
                                            </div>
                                            <div className="text-sm text-slate-500">
                                                {customer.city || "-"} / {customer.state || "-"}
                                            </div>
                                        </div>

                                        <div className="text-right text-sm text-slate-500">
                                            <div>{customer.type}</div>
                                            <div>{customer.document}</div>
                                            <div>{customer.status}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}