import React, { useState, useEffect } from 'react';
import { Modal } from '../../../../components/common/Modal';
import { Button } from '../../../../components/common/Button';
import { Input } from '../../../../components/common/Input';
import { updateGenre } from '../../../../api/genres.api';
import type { Genre, GenrePayload } from '../../../../types/genre.types';

interface EditGenreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  genre: Genre | null; // El género que vamos a editar
}

export function EditGenreModal({ isOpen, onClose, onSuccess, genre }: EditGenreModalProps) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cuando se abre el modal o cambia el género seleccionado, llenamos el input con su nombre actual
  useEffect(() => {
    if (genre && isOpen) {
      setName(genre.name);
      setError(null);
    }
  }, [genre, isOpen]);

  const handleClose = () => {
    setName('');
    setError(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!genre) return;

    if (!name.trim()) {
      setError('El nombre del género es obligatorio');
      return;
    }

    if (name.trim() === genre.name) {
      // Si no cambió nada, simplemente cerramos para no hacer una petición innecesaria al backend
      handleClose();
      return;
    }

    setIsLoading(true);
    try {
      const payload: GenrePayload = { name: name.trim() };
      await updateGenre(genre.id, payload);
      onSuccess(); // Recargar la tabla
      handleClose(); // Cerrar modal y limpiar
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el género');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Editar Género">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-md">
            {error}
          </div>
        )}

        <Input
          label="Nombre del Género"
          placeholder="Modifica el nombre del género"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          disabled={isLoading}
          autoFocus
        />

        <div className="flex justify-end gap-3 mt-4">
          <Button type="button" variant="secondary" onClick={handleClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" isLoading={isLoading}>
            Guardar Cambios
          </Button>
        </div>
      </form>
    </Modal>
  );
}
