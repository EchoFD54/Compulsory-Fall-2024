import { atom } from 'jotai';
import { Paper } from '../types/paper';


export const customerIdAtom = atom<number | null>(null);

export const orderEntriesAtom = atom<{ productId: number; quantity: number }[]>([]);


export const productsAtom = atom<Paper[]>([]);