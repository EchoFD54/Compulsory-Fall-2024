import { atom } from 'jotai';

export interface Customer {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}

export const customerAtom = atom<Customer | null>(null);
