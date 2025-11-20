// src/app/(user)/cart/page.tsx

"use client";

import { useCart } from "@/contexts/cart.context";
import { formatCurrency } from "@/lib/utils";
import BackButton from "@/components/back-button";
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import { Loader2 } from "lucide-react"; 
import { ConfirmationModal } from "@/components/confirmation-modal"; // 👈 Importa o novo Modal
import { useRouter } from "next/navigation"; // 👈 Importa o useRouter
import { useState } from "react"; // 👈 Importa o useState para gerenciar o estado do modal


export default function CartPage() {
  const { cart, orderId, isLoading, updateQuantity, clearCart, confirmPurchase, totalValue } = useCart(); 
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a abertura do modal
  const [lastOrderId, setLastOrderId] = useState<number | null>(null); // Armazena o ID do pedido confirmado

  const router = useRouter();
  const cartItems = Array.isArray(cart) ? cart : [];
  const totalCartValue = totalValue;

  const handleUpdateQuantity = (itemId: number, quantity: number) => {
    if (quantity < 1) {
      updateQuantity(itemId, 0);
    } else {
      updateQuantity(itemId, quantity);
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0 || !orderId || isLoading) return;
    setIsModalOpen(true);
    
  };

  const handleModalConfirm = async () => {
    const confirmedOrder = await confirmPurchase(orderId!); 

    if (confirmedOrder) {
      const finalOrderId = confirmedOrder.id || orderId; 
      setLastOrderId(finalOrderId);
      setIsModalOpen(true);
    }
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center h-[50vh]">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        <p className="text-xl font-medium">Carregando Carrinho...</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <BackButton /> 
          <h1 className="text-3xl font-bold">Seu Carrinho</h1>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-lg text-center mt-10">Seu carrinho está vazio. Adicione alguns itens!</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => ( 
              <div
                key={item.id}
                className="flex items-center p-4 border-4 border-black shadow-[5px_5px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] bg-white transition-shadow"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-lg truncate">{item.description}</p>
                  <p className="text-sm text-gray-500">{formatCurrency(item.unitPrice)}/un</p>
                </div>

                <div className="flex items-center mx-4 space-x-2">
                  <Button 
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    size="sm"
                    disabled={isLoading}
                    className="text-xl"
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 0)}
                    className="w-16 text-center rounded-none border-2 border-black shadow-[5px_5px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] "
                    min="0"
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    size="sm"
                    disabled={isLoading}
                  >
                    +
                  </Button>
                </div>

                <div className="font-bold text-lg w-24 text-right">
                  {formatCurrency(item.unitPrice * item.quantity)}
                </div>
              </div>
            ))}

            <div className="pt-4 border-t-2 border-dashed mt-6">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total do Pedido:</span>
                <span>{formatCurrency(totalCartValue)}</span>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-4">
              <Button
                onClick={clearCart}
                variant="destructive"
                disabled={isLoading}
              >
                Limpar Carrinho
              </Button>
              <Button
                onClick={handleCheckout}
                className="bg-green-500 hover:bg-green-600"
                disabled={isLoading || !orderId}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Finalizar Pedido"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
        title="Pedido Finalizado com Sucesso!"
        message={`Seu pedido #${lastOrderId} foi enviado para a cozinha! O valor total foi de ${formatCurrency(totalCartValue)}.`}
        confirmText="ok"
      />
    </>
  );
}