import { atom } from "jotai";

export interface Order {
    id: number;
    orderDate: string;
    status: string;
    totalAmount: number;
    deliveryDate : string;
    orderEntries: OrderEntry[];
  }

  interface OrderEntry {
    id: number;
    quantity: number;
    productId: number; 
    productName: string; 
    productPrice: number;
  }
  
  export const customerAtom = atom<Order | null>(null);