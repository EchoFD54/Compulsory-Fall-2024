import { atom } from 'jotai';

export interface CartEntry {
    productId: number;
    quantity: number;
  }
  
  export const cartAtom = atom<CartEntry[]>([]);
