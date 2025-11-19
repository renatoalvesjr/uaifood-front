import { Address } from "./address.interface";
import { UserType } from "./enums";

export interface User {
  name: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  type: UserType;
  email: string;
  phone: string | null;
  addressId: number | null;
  address: Address;
}
