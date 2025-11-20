
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart.context";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaymentMethod } from "@/models/enums";
import { Loader2 } from "lucide-react";
import BackButton from "@/components/back-button";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
  const { orderId, completeOrder, cancelOrder, isLoading } = useCart();
  const router = useRouter();

  const handleConfirmPayment = async () => {
    console.log(orderId, paymentMethod)
    if (!orderId || !paymentMethod) return;

    await completeOrder(orderId);
    router.push("/orders");
  };

  const handleCancelPayment = async () => {
    if (!orderId) return;

    await cancelOrder(orderId);
    router.push("/orders");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <BackButton />
        <h1 className="text-3xl font-bold">Pagamento</h1>
      </div>

      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <label
            htmlFor="payment-method"
            className="block text-lg font-medium mb-2"
          >
            Escolha a forma de pagamento:
          </label>
          <Select
            onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
          >
            <SelectTrigger id="payment-method">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              {Object.values(PaymentMethod).map((method) => (
                <SelectItem key={method} value={method}>
                  {method}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={handleCancelPayment}
            variant="destructive"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Cancelar Pedido"
            )}
          </Button>
          <Button
            onClick={handleConfirmPayment}
            className="bg-green-500 hover:bg-green-600"
            disabled={!paymentMethod || isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Confirmar Pagamento"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
