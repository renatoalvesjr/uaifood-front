/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Item } from "@/models/item.interface";
import { Button } from "./ui/button";
import { useCart } from "@/contexts/cart.context";
import { useAuth } from "@/contexts/auth.context";
import { Loader2 } from "lucide-react";
import { getItems } from "@/services/item.service";
import Link from "next/link";

export function ItemList() {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      setError(false);

      getItems(1, 20)
        .then((data) => {
          setItems(data);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setItems([]);
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Carregando cardápio...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <p className="text-center text-lg mt-8">
        Faça <Link href="/login" className="font-bold cursor-pointer hover:underline">login</Link> para visualizar o cardápio e fazer
        seu pedido!
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-lg mt-8 text-red-500">
        Erro ao carregar os itens. Tente novamente mais tarde.
      </p>
    );
  }

  if (items.length === 0) {
    return (
      <p className="text-center text-lg mt-8">
        Nenhum item disponível no momento.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="border p-4 rounded-lg shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow"
        >
          <div>
            <h3 className="text-xl font-bold">{item.description}</h3>
            <p className="text-gray-600 mt-1">
              {item.category
                ? item.category.description
                : "Categoria não especificada"}
            </p>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-lg font-semibold text-green-600">
              R$ {item.unitPrice.toFixed(2).replace(".", ",")}
            </span>
            <Button
              size="sm"
              onClick={() => {
                addToCart(item, 1);
              }}
            >
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
