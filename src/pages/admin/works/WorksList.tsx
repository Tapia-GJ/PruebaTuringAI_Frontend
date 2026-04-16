import { Table, type Column } from "../../../components/ui/Table";
import { Button } from "../../../components/common/Button";
import { LoadingSpinner } from "../../../components/common/LoadingSpinner";
import { useEffect, useState } from 'react';
import { getWorks, deleteWork } from "../../../api/works.api";
import type { Work } from "../../../types/work.types";
import { AddWorkModal } from "./modals/AddWorkModal";
import { EditWorkModal } from "./modals/EditWorkModal";

export const WorksList = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const fetchWorks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getWorks();
      setWorks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar las obras');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  const handleEditClick = (work: Work) => {
    setSelectedWork(work);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (work: Work) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar la obra "${work.title}"?`)) {
      return;
    }

    try {
      await deleteWork(work.id);
      fetchWorks();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar la obra');
    }
  };

  const columns: Column<Work>[] = [
    { key: 'id', header: 'ID' },
    {
      key: 'coverUrl',
      header: 'Portada',
      render: (work) => (
        work.coverUrl ? (
          <img
            src={work.coverUrl}
            alt={`Portada de ${work.title}`}
            className="w-12 h-16 object-cover rounded-md shadow-sm"
          />
        ) : (
          <div className="w-12 h-16 bg-slate-800 rounded-md flex items-center justify-center text-xs text-slate-500 text-center p-1">
            Sin portada
          </div>
        )
      )
    },
    {
      key: 'title',
      header: 'Título',
      render: (work) => (
        <div className="max-w-50 truncate font-medium text-slate-200" title={work.title}>
          {work.title}
        </div>
      )
    },
    { key: 'author.name', header: 'Autor', render: (work) => work.author.name, },
    { key: 'publishYear', header: 'Año' },
    {
      key: 'generos',
      header: 'Géneros',
      render: (work) => (
        <div className="max-w-50 flex flex-wrap gap-1">
          {work.workGenres.slice(0, 3).map(wg => (
            <span key={wg.genreId} className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-xs rounded-full border border-cyan-500/20">
              {wg.genre.name}
            </span>
          ))}
          {work.workGenres.length > 3 && (
            <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-xs rounded-full">
              +{work.workGenres.length - 3}
            </span>
          )}
        </div>
      )
    }
  ];

  if (isLoading && works.length === 0) {
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
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Gestión de Obras</h1>
          <p className="text-slate-400">Administra el catálogo de obras de cómics</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          + Agregar Obra
        </Button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-4 rounded-md">
          {error}
        </div>
      )}

      <div className="bg-slate-950 border border-slate-800/50 rounded-lg">
        {works.length === 0 && !isLoading && !error ? (
          <div className="p-8 text-center text-slate-500 text-lg">
            No hay obras registradas en el sistema.
          </div>
        ) : (
          <Table<Work>
            data={works}
            columns={columns}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        )}
      </div>

      <AddWorkModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchWorks}
      />

      <EditWorkModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedWork(null);
        }}
        onSuccess={fetchWorks}
        work={selectedWork}
      />
    </div>
  );
};
