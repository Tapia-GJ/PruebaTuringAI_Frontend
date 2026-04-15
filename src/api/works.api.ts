import type { Work } from '../types/work.types';

const API_BASE = import.meta.env.VITE_API_BASE || '';
const WORKS_BASE = `${API_BASE}/api/works`;

export async function getWorks(): Promise<Work[]> {
  const res = await fetch(WORKS_BASE, {
    credentials: 'include'
  });
  if (!res.ok) {
    throw new Error('Error al cargar el catálogo');
  }
  return res.json();
}

export async function getWorkById(id: number): Promise<Work> {
  const res = await fetch(`${WORKS_BASE}/${id}`, {
    credentials: 'include'
  });
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('Cómic no encontrado');
    }
    throw new Error('Error al cargar los detalles del cómic');
  }
  return res.json();
}