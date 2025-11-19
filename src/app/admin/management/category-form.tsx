"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCategory } from "@/services/category.service";
import { useState } from "react";

export function CategoryForm() {
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await createCategory(categoryName);
      setCategoryName("");
    } catch (error) {
      setError("Erro ao criar categoria. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Nome da categoria"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        disabled={isLoading}
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Adicionando..." : "Adicionar Categoria"}
      </Button>
    </form>
  );
}
