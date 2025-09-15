import type { Record } from "@/types/Record";
import { useEffect, useState } from "react";

const Records = () => {
  const [records, setRecords] = useState<Record[]>([]);

  const getRecords = async () => {

  }

  useEffect(() => {

  })
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
          <div className="bg-blue-950 p-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Registros de Emociones
            </h1>
            <p className="text-indigo-100">
              Gestiona y revisa tus registros de emociones aquí.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Records;