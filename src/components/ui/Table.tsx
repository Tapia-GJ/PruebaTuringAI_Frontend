import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  isLoading?: boolean;
}

export function Table<T extends { id: string | number }>({ 
  data, 
  columns, 
  onEdit, 
  onDelete,
  isLoading = false
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full h-48 flex items-center justify-center bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full p-8 text-center bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400">
        No hay datos disponibles para mostrar.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
      <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-300">
        <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-4 font-medium">
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-6 py-4 font-medium text-right">Acciones</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {data.map((item) => (
            <tr 
              key={item.id} 
              className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              {columns.map((col) => (
                <td key={`${item.id}-${col.key}`} className="px-6 py-4 whitespace-nowrap">
                  {col.render 
                    ? col.render(item) 
                    : String(item[col.key as keyof T] ?? '-')}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <div className="flex justify-end gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(item)}
                        className="p-2 text-zinc-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-md transition-colors"
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(item)}
                        className="p-2 text-zinc-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-md transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
