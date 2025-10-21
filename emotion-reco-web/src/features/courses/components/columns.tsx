import type { Course } from '@/types/Course';
import {
  createColumnHelper,
} from '@tanstack/react-table';
import { Edit2, Eye, Trash2 } from 'lucide-react';
import { Link } from 'react-router';

const columnHelper = createColumnHelper<Course>();

const columns = (({
  onEdit, onDelete
}: {
  onEdit: (course: any) => void;
  onDelete: (course: any) => void;
}) => [
    columnHelper.accessor('id', {
      header: 'ID',
      size: 60,
      cell: info => (
        <span className="font-mono text-sm text-gray-600">
          #{info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('code', {
      header: 'Código',
      cell: info => (
        <div className="font-medium text-gray-900">
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('name', {
      header: 'Nombre',
      cell: info => (
        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Acciones',
      size: 140,
      cell: ({ row }) => (
        <div className="flex space-x-1">
          <Link
            to={"/asignaturas/estudiantes/" + row.original.id}
            className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            title="Ver detalles"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={() => onEdit(row.original)}
            className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
            title="Editar"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(row.original)}
            className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
            title="Eliminar"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    }),
  ]
);

export default columns;
