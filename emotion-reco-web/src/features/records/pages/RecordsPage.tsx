import { useEffect, useState } from "react";
import { GetRecords } from "@/api/record.api";
import type { Record } from "@/types/Record";
import { Search, BookOpen, Heart, TrendingUp, Eye, Clock } from 'lucide-react';

const Records = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEmotion, setFilterEmotion] = useState("all");
  const [sortBy, setSortBy] = useState("timestamp");

  const getRecords = async () => {
    try {
      setLoading(true);
      const recordsData = await GetRecords();
      setRecords(recordsData);
    } catch {
      console.error('Error al cargar los registros');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600';
    if (accuracy >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const uniqueEmotions = [...new Set(records.map(record => record.emotion.name))];

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.classroom_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.emotion.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEmotion = filterEmotion === "all" || record.emotion.name === filterEmotion;

    return matchesSearch && matchesEmotion;
  });

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    switch (sortBy) {
      case 'timestamp':
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      case 'accuracy':
        return b.accuracy - a.accuracy;
      case 'course':
        return a.course.name.localeCompare(b.course.name);
      default:
        return 0;
    }
  });

  const stats = {
    total: records.length,
    avgAccuracy: records.length > 0 ? (records.reduce((sum, r) => sum + r.accuracy, 0) / records.length).toFixed(1) : 0,
    topEmotion: records.length > 0 ? [...records.reduce((acc, r) => {
      acc.set(r.emotion.name, (acc.get(r.emotion.name) || 0) + 1);
      return acc;
    }, new Map())].sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A' : 'N/A'
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                  <Heart className="h-8 w-8" />
                  Registros de Emociones
                </h1>
                <p className="text-blue-100 text-lg">
                  Analiza y gestiona los registros emocionales de tus estudiantes
                </p>
              </div>
              <div className="text-right text-white">
                <div className="text-3xl font-bold">{stats.total}</div>
                <div className="text-blue-100">Registros totales</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Precisión Promedio</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgAccuracy}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Emoción Predominante</p>
                <p className="text-2xl font-bold text-gray-900">{stats.topEmotion}</p>
              </div>
              <Heart className="h-8 w-8 text-pink-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Cursos Activos</p>
                <p className="text-2xl font-bold text-gray-900">{new Set(records.map(r => r.course.id)).size}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por curso, aula o emoción..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <select
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                value={filterEmotion}
                onChange={(e) => setFilterEmotion(e.target.value)}
              >
                <option value="all">Todas las emociones</option>
                {uniqueEmotions.map(emotion => (
                  <option key={emotion} value={emotion}>{emotion}</option>
                ))}
              </select>

              <select
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="timestamp">Más recientes</option>
                <option value="accuracy">Mayor precisión</option>
                <option value="course">Por curso</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-4 text-gray-600">Cargando registros...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Curso</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Aula</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Emoción</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Precisión</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedRecords.map((record: Record) => (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        #{record.id.toString().padStart(3, '0')}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{record.course.name}</div>
                          <div className="text-sm text-gray-500">{record.course.code}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {record.classroom_code}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border`}>
                          {record.emotion.name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className={`text-sm font-semibold ${getAccuracyColor(record.accuracy)}`}>
                            {record.accuracy.toFixed(1)}%
                          </span>
                          <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${record.accuracy >= 90 ? 'bg-green-500' : record.accuracy >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${record.accuracy}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-2" />
                          {formatDate(record.timestamp)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {sortedRecords.length === 0 && (
                <div className="text-center py-12">
                  <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No se encontraron registros</p>
                  <p className="text-gray-400 text-sm">Intenta ajustar los filtros de búsqueda</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Records;