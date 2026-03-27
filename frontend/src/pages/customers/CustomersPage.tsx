import { useEffect, useState } from "react";
import { http } from "../../services/http";

type Customer = {
    id: number;
    name: string;
    email: string;
};

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);

    async function load() {
        const data = await http<Customer[]>("/api/v1/customers");
        setCustomers(data);
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Clientes</h1>

            <div className="bg-white rounded-2xl border p-4">
                {customers.length === 0 ? (
                    <div className="text-slate-500">Nenhum cliente cadastrado</div>
                ) : (
                    customers.map((c) => (
                        <div key={c.id} className="border-b py-2">
                            <div className="font-semibold">{c.name}</div>
                            <div className="text-sm text-slate-500">{c.email}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}