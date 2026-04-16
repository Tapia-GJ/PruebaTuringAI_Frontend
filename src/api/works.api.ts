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

export async function getLatestWorks(): Promise<Work[]> {
  const res = await fetch(`${WORKS_BASE}/latest`, {
    credentials: 'include'
  });
  if (!res.ok) {
    throw new Error('Error al cargar los últimos cómics');
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

export async function createWork(payload: { title: string; description: string; coverUrl?: string; publishYear?: number; authorId: number; genreIds?: number[] }): Promise<Work> {
  const res = await fetch(WORKS_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Error al crear el cómic');
  return res.json();
}

export async function updateWork(id: number, payload: Partial<{ title: string; description: string; coverUrl?: string; publishYear?: number; authorId: number; genreIds?: number[] }>): Promise<Work> {
  const res = await fetch(`${WORKS_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Error al actualizar el cómic');
  return res.json();
}

export async function deleteWork(id: number): Promise<void> {
  const res = await fetch(`${WORKS_BASE}/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error al eliminar el cómic');
}