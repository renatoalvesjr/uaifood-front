import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-red-600 mb-6">
        Área Administrativa (Acesso Restrito)
      </h1>
      <p className="text-lg">
        Bem-vindo, Administrador! Aqui você pode gerenciar itens, pedidos e
        usuários.
      </p>
      <div className="mt-8">
        <Link href="/admin/management" className="text-blue-500 hover:underline">
          Gerenciar Itens e Categorias
        </Link>
      </div>
    </div>
  );
}
