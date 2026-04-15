import { Table, type Column } from "../../../components/ui/Table";
import React from 'react';

// Tipado basado en el modelo Prisma
interface Author {
  id: number;
  name: string;
}
export const AuthorsList = () => {

  const [authors, setAuthors] = React.useState<Author[]>([
    { id: 1, name: 'Gabriel García Márquez' },
    { id: 2, name: 'Isabel Allende' }
  ]);

  const columns: Column<Author>[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nombre del Autor' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Gestión de Autores</h1>
        <p className="text-slate-400">Administra los autores del catálogo</p>
      </div>

      <Table<Author>
        data={authors}
        columns={columns}
        onEdit={(author) => console.log('Editando', author)}
        onDelete={(author) => console.log('Eliminando', author)}
      />
    </div>
  );
};
