import React, { useState } from 'react';
import { Modal } from '../../../../components/common/Modal';
import { Button } from '../../../../components/common/Button';
import { Input } from '../../../../components/common/Input';
import { createAuthor } from '../../../../api/authors.api';
import type { AuthorPayload } from '../../../../types/author.types';

interface AddAuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddAuthorModal({ isOpen, onClose, onSuccess }: AddAuthorModalProps) {
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
      setError('El nombre del autor es obligatorio');
      return;
    }

    setIsLoading(true);
    try {
      const payload: AuthorPayload = { name: name.trim() };
      await createAuthor(payload);
      onSuccess();
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el autor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Agregar Nuevo Autor">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-md">
            {error}
          </div>
        )}

        <Input
          label="Nombre del Autor"
          placeholder="Agrega el nombre del autor"
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
            Guardar Autor
          </Button>
        </div>
      </form>
    </Modal>
  );
}
