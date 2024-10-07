import { atom } from 'jotai';

export interface CartEntry {
    productName: string;
    productId: number;
    quantity: number;
    price: number;
  }
  
  export const cartAtom = atom<CartEntry[]>([]);
