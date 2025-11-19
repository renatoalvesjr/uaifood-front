import { CategoryForm } from "./category-form";
import { ItemForm } from "./item-form";

export default function ManagementPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-red-600 mb-6">
        Gerenciamento de Itens e Categorias
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Adicionar Nova Categoria</h2>
          <CategoryForm />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Adicionar Novo Item</h2>
          <ItemForm />
        </div>
      </div>
    </div>
  );
}
