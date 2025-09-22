import {
  createColumnHelper,
} from '@tanstack/react-table';
import { Edit2, Eye, Trash2 } from 'lucide-react';
import StatusBadge from '../../../../components/shared/StatusBadge';
import type { Professor } from '@/types/Professor';

const columnHelper = createColumnHelper<Professor>();

const columns = (({
  onView, onEdit, onDelete
}: {
  onView: (professor: any) => void;
  onEdit: (professor: any) => void;
  onDelete: (professor: any) => void;
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
    columnHelper.accessor('full_name', {
      header: 'Nombre Completo',
      cell: info => (
        <div className="font-medium text-gray-900">
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('user.username', {
      header: 'Usuario',
      cell: info => (
        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('user.email', {
      header: 'Email',
      cell: info => (
        <a
          href={`mailto:${info.getValue()}`}
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          {info.getValue()}
        </a>
      ),
    }),
    columnHelper.accessor('user.first_name', {
      header: 'Nombres',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('user.last_name', {
      header: 'Apellidos',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('user.is_active', {
      header: 'Estado',
      size: 100,
      cell: info => <StatusBadge isActive={info.getValue()} />,
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Acciones',
      size: 140,
      cell: ({ row }) => (
        <div className="flex space-x-1">
          <button
            onClick={() => onView(row.original)}
            className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            title="Ver detalles"
          >
            <Eye className="w-4 h-4" />
          </button>
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
