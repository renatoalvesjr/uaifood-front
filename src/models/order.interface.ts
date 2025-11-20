
import { Address } from "./address.interface";
import { CartItem } from "./cart.interface";
import { OrderStatus, PaymentMethod } from "./enums";
import { User } from "./user.interface";

export interface Order {
    id: number;
    user: User;
    address: Address;
    items: CartItem[];
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    total: number;
    createdAt: Date;
    updatedAt: Date;
}
