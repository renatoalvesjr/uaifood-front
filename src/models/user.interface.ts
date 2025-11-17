export interface User {
  name: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  email: string;
  phone: string | null;
  addressId: number | null;
}
