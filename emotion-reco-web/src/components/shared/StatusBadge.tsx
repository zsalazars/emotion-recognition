import type React from "react";

interface StatusBadgeProps {
  isActive: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ isActive }) => (
  <span
    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
  >
    {isActive ? "Activo" : "Inactivo"}
  </span>
);

export default StatusBadge;