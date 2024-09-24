import { atom } from 'jotai';
import { Paper } from '../types/paper';

export const papersAtom = atom<Paper[]>([]);
