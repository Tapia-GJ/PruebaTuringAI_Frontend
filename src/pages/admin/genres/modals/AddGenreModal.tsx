import React, { useState } from 'react';
import { Modal } from '../../../../components/common/Modal';
import { Button } from '../../../../components/common/Button';
import { Input } from '../../../../components/common/Input';
import { createGenre } from '../../../../api/genres.api';
import type { GenrePayload } from '../../../../types/genre.types';

interface AddGenreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddGenreModal({ isOpen, onClose, onSuccess }: AddGenreModalProps) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setName('');
    setError(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('El nombre del género es obligatorio');
      return;
    }

    setIsLoading(true);
    try {
      const payload: GenrePayload = { name: name.trim() };
      await createGenre(payload);
      onSuccess();
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el género');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Agregar Nuevo Género">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-md">
            {error}
          </div>
        )}

        <Input
          label="Nombre del Género"
          placeholder="Agrega el nombre del género"
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
            Guardar Género
          </Button>
        </div>
      </form>
    </Modal>
  );
}
