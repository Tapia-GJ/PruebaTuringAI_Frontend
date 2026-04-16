import React, { useState, useEffect } from 'react';
import { Modal } from '../../../../components/common/Modal';
import { Button } from '../../../../components/common/Button';
import { Input } from '../../../../components/common/Input';
import { MultiSelect } from '../../../../components/common/MultiSelect';
import { createWork } from '../../../../api/works.api';
import { getAuthors } from '../../../../api/authors.api';
import type { Author } from '../../../../types/author.types';
import type { Genre } from '../../../../types/genre.types';
import { getGenres } from '../../../../api/genres.api';

interface AddWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddWorkModal({ isOpen, onClose, onSuccess }: AddWorkModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [authorId, setAuthorId] = useState<string>('');

  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      getAuthors()
        .then(data => {
          setAuthors(data);
          if (data.length > 0) setAuthorId(data[0].id.toString());
        })
        .catch(err => console.error("Error cargando autores:", err));
      getGenres()
        .then(data => {
          setGenres(data);
        })
        .catch(err => console.error("Error cargando géneros:", err));
    }
  }, [isOpen]);

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setCoverUrl('');
    setPublishYear('');
    setAuthorId(authors.length > 0 ? authors[0].id.toString() : '');
    setSelectedGenreIds([]);
    setError(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !description.trim() || !authorId) {
      setError('El título, descripción y autor son obligatorios');
      return;
    }

    setIsLoading(true);
    try {
      await createWork({
        title: title.trim(),
        description: description.trim(),
        coverUrl: coverUrl.trim() || undefined,
        publishYear: publishYear ? parseInt(publishYear) : undefined,
        authorId: parseInt(authorId),
        genreIds: selectedGenreIds.length > 0 ? selectedGenreIds : undefined
      });
      onSuccess();
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la obra');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Agregar Nueva Obra">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-md">
            {error}
          </div>
        )}

        <Input
          label="Título"
          placeholder="Ej: Spider-Man"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          disabled={isLoading}
          autoFocus
        />

        {/* Textarea custom style matching Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-300">Descripción</label>
          <textarea
            className="bg-slate-900/50 border border-slate-700/50 focus:border-cyan-400 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 outline-none transition-colors duration-200 min-h-25"
            placeholder="Sinopsis de la obra..."
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <Input
          label="URL de la Portada (Opcional)"
          placeholder="https://..."
          value={coverUrl}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCoverUrl(e.target.value)}
          disabled={isLoading}
        />

        <Input
          label="Año de Publicación (Opcional)"
          type="number"
          placeholder="Ej: 2024"
          value={publishYear}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPublishYear(e.target.value)}
          disabled={isLoading}
        />

        <div className="flex flex-col gap-1.5 relative">
          <label className="text-sm font-medium text-slate-300">Géneros</label>
          <MultiSelect
            options={genres.map(g => ({ label: g.name, value: g.id }))}
            value={selectedGenreIds}
            onChange={(values) => setSelectedGenreIds(values as number[])}
            placeholder="Seleccionar géneros..."
            disabled={isLoading || genres.length === 0}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-300">Autor</label>
          <select
            className="bg-slate-900/50 border border-slate-700/50 focus:border-cyan-400 rounded-lg px-4 py-2.5 text-white outline-none transition-colors duration-200"
            value={authorId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAuthorId(e.target.value)}
            disabled={isLoading || authors.length === 0}
          >
            {authors.length === 0 ? (
              <option value="" disabled>No hay autores disponibles</option>
            ) : (
              authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))
            )}
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button type="button" variant="secondary" onClick={handleClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" isLoading={isLoading}>
            Guardar Obra
          </Button>
        </div>
      </form>
    </Modal>
  );
}
