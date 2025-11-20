
"use client";

import { useEffect, useState } from "react";
import { Order } from "@/models/order.interface";
import { Loader2 } from "lucide-react";
import BackButton from "@/components/back-button";
import { formatCurrency } from "@/lib/utils";
import { getFinalizedOrders } from "@/services/cart.service";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      const fetchedOrders = await getFinalizedOrders();
      if (fetchedOrders) {
        setOrders(fetchedOrders);
      }
      setIsLoading(false);
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center h-[50vh]">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        <p className="text-xl font-medium">Carregando Pedidos...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <BackButton />
        <h1 className="text-3xl font-bold">Meus Pedidos</h1>
      </div>

      {orders.length === 0 ? (
        <p className="text-lg text-center mt-10">Você ainda não tem pedidos.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 border-4 border-black shadow-[5px_5px_0_0_#000] bg-white"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Pedido #{order.id}</h2>
                <p className="text-lg font-semibold">
                  {formatCurrency(order.total)}
                </p>
              </div>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <div>
                <p>Status: {order.status}</p>
                <p>Pagamento: {order.paymentMethod}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
