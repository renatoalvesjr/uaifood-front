"use client";

import {
  // Assumindo que os componentes de Dialog estão disponíveis em src/components/ui/
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; 
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  isLoading?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  isLoading = false,
}: ConfirmationModalProps) {
  return (
    // O onOpenChange garante que o modal pode ser fechado clicando fora ou com ESC
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-green-600 font-bold">{title}</DialogTitle>
          {/* Usando DialogDescription para a mensagem principal */}
          <DialogDescription className="text-md pt-2 text-gray-700">
            {message}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 flex flex-col sm:flex-row sm:justify-end sm:space-x-2">
          {/* Botão de Fechar/Cancelar */}
          <Button 
            onClick={onClose} 
            variant="outline" 
            disabled={isLoading}
            className="w-full sm:w-auto mb-2 sm:mb-0"
          >
            Fechar
          </Button>

          {/* Botão de Confirmação/Ação */}
          <Button 
            onClick={onConfirm} 
            disabled={isLoading} 
            className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              confirmText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}