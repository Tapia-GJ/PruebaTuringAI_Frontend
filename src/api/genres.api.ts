import type { Genre, GenrePayload } from '../types/genre.types';

const API_BASE = import.meta.env.VITE_API_BASE || '';
const GENRES_BASE = `${API_BASE}/api/genres`;

export async function getGenres(): Promise<Genre[]> {
  const res = await fetch(GENRES_BASE, { credentials: 'include' });
  if (!res.ok) throw new Error('Error al cargar los géneros');
  return res.json();
}

export async function getGenreById(id: number): Promise<Genre> {
  const res = await fetch(`${GENRES_BASE}/${id}`, { credentials: 'include' });
  if (!res.ok) {
    if (res.status === 404) throw new Error('Género no encontrado');
    throw new Error('Error al cargar el género');
  }
  return res.json();
}

export async function createGenre(payload: GenrePayload): Promise<Genre> {
  const res = await fetch(GENRES_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Error al crear el género');
  return res.json();
}

export async function updateGenre(id: number, payload: GenrePayload): Promise<Genre> {
  const res = await fetch(`${GENRES_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Error al actualizar el género');
  return res.json();
}

export async function deleteGenre(id: number): Promise<void> {
  const res = await fetch(`${GENRES_BASE}/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error al eliminar el género');
}
