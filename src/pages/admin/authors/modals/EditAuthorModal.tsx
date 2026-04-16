import React, { useState, useEffect } from 'react';
import { Modal } from '../../../../components/common/Modal';
import { Button } from '../../../../components/common/Button';
import { Input } from '../../../../components/common/Input';
import { updateAuthor } from '../../../../api/authors.api';
import type { Author, AuthorPayload } from '../../../../types/author.types';

interface EditAuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  author: Author | null; // El autor que vamos a editar
}

export function EditAuthorModal({ isOpen, onClose, onSuccess, author }: EditAuthorModalProps) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cuando se abre el modal o cambia el autor seleccionado, llenamos el input con su nombre actual
  useEffect(() => {
    if (author && isOpen) {
      setName(author.name);
      setError(null);
    }
  }, [author, isOpen]);

  const handleClose = () => {
    setName('');
    setError(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!author) return;

    if (!name.trim()) {
      setError('El nombre del autor es obligatorio');
      return;
    }

    if (name.trim() === author.name) {
      // Si no cambió nada, simplemente cerramos para no hacer una petición innecesaria al backend
      handleClose();
      return;
    }

    setIsLoading(true);
    try {
      const payload: AuthorPayload = { name: name.trim() };
      await updateAuthor(author.id, payload);
      onSuccess(); // Recargar la tabla
      handleClose(); // Cerrar modal y limpiar
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el autor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Editar Autor">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-md">
            {error}
          </div>
        )}

        <Input
          label="Nombre del Autor"
          placeholder="Modifica el nombre del autor"
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
