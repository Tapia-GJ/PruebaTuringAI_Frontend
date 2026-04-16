import type { Author, AuthorPayload } from "../types/author.types";

const API_BASE = import.meta.env.VITE_API_BASE || "";
const AUTHORS_BASE = `${API_BASE}/api/authors`;

export async function getAuthors(): Promise<Author[]> {
  const res = await fetch(AUTHORS_BASE, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error al cargar los autores");
  return res.json();
}

export async function getAuthorById(id: number): Promise<Author> {
  const res = await fetch(`${AUTHORS_BASE}/${id}`, {
    credentials: "include",
  });
  if (!res.ok) {
    if (res.status === 404) throw new Error("Autor no encontrado");
    throw new Error("Error al cargar el autor");
  }
  return res.json();
}

export async function createAuthor(payload: AuthorPayload): Promise<Author> {
  const res = await fetch(AUTHORS_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al crear el autor");
  return res.json();
}

export async function updateAuthor(
  id: number,
  payload: AuthorPayload,
): Promise<Author> {
  const res = await fetch(`${AUTHORS_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al actualizar el autor");
  return res.json();
}

export async function deleteAuthor(id: number): Promise<void> {
  const res = await fetch(`${AUTHORS_BASE}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error al eliminar el autor");
}
