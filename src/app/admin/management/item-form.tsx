"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Category } from "@/models/category.interface";
import { createItem, getCategories } from "@/services/item.service";
import { useEffect, useState } from "react";

export function ItemForm() {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories: Category[] = await getCategories();
        setCategories(
          Array.isArray(fetchedCategories) ? fetchedCategories : []
        );
      } catch (error) {
        setError("Erro ao buscar categorias.");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log(itemName, price, categoryId);
      await createItem({
        description: itemName,
        unitPrice: parseFloat(price),
        categoryId: parseInt(categoryId),
      });
      setItemName("");
      setPrice("");
      setCategoryId("");
    } catch (error) {
      setError("Erro ao criar item. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Nome do item"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        disabled={isLoading}
      />
      <Input
        type="number"
        placeholder="Preço"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        disabled={isLoading}
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="w-full p-2 border-2 border-black rounded-md bg-white"
        disabled={isLoading}
      >
        <option value="">Selecione uma categoria</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.description}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Adicionando..." : "Adicionar Item"}
      </Button>
    </form>
  );
}
