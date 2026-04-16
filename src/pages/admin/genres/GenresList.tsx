import { Table, type Column } from "../../../components/ui/Table";
import { Button } from "../../../components/common/Button";
import { LoadingSpinner } from "../../../components/common/LoadingSpinner";
import { useEffect, useState } from 'react';
import { getGenres, deleteGenre } from "../../../api/genres.api";
import type { Genre } from "../../../types/genre.types";
import { AddGenreModal } from "./modals/AddGenreModal";
import { EditGenreModal } from "./modals/EditGenreModal";

export const GenresList = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para modales
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  const fetchGenres = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getGenres();
      setGenres(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los géneros');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleEditClick = (genre: Genre) => {
    setSelectedGenre(genre);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (genre: Genre) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar el género "${genre.name}"?`)) {
      return;
    }

    try {
      await deleteGenre(genre.id);
      fetchGenres();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar el género');
    }
  };

  const columns: Column<Genre>[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nombre del Género' }
  ];

  if (isLoading && genres.length === 0) {
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
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Gestión de Géneros</h1>
          <p className="text-slate-400">Administra los géneros disponibles</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          + Agregar Género
        </Button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-4 rounded-md">
          {error}
        </div>
      )}

      <Table<Genre>
        data={genres}
        columns={columns}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />

      <AddGenreModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchGenres}
      />

      <EditGenreModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedGenre(null);
        }}
        onSuccess={fetchGenres}
        genre={selectedGenre}
      />
    </div>
  );
};
