import { Table, type Column } from "../../../components/ui/Table";
import { Button } from "../../../components/common/Button";
import { LoadingSpinner } from "../../../components/common/LoadingSpinner";
import { useEffect, useState } from 'react';
import { getAuthors, deleteAuthor } from "../../../api/authors.api";
import type { Author } from "../../../types/author.types";
import { AddAuthorModal } from "./modals/AddAuthorModal";
import { EditAuthorModal } from "./modals/EditAuthorModal";

export const AuthorsList = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para modales
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  const fetchAuthors = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAuthors();
      setAuthors(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los autores');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleEditClick = (author: Author) => {
    setSelectedAuthor(author);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (author: Author) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar a ${author.name}?`)) {
      return;
    }

    try {
      await deleteAuthor(author.id);
      fetchAuthors();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar el autor');
    }
  };

  const columns: Column<Author>[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nombre del Autor' }
  ];

  if (isLoading && authors.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Gestión de Autores</h1>
          <p className="text-slate-400">Administra los autores del catálogo</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          + Agregar Autor
        </Button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-4 rounded-md">
          {error}
        </div>
      )}

      <Table<Author>
        data={authors}
        columns={columns}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />

      <AddAuthorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchAuthors}
      />

      <EditAuthorModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedAuthor(null); // Limpiamos el autor seleccionado al cerrar
        }}
        onSuccess={fetchAuthors}
        author={selectedAuthor}
      />
    </div>
  );
};
