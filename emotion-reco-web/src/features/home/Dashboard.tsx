import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { Users, TrendingUp, Clock, Activity, Heart, AlertTriangle, CheckCircle, type LucideIcon } from 'lucide-react';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // Datos simulados - en tu proyecto real vendrían de la API
  const emotionData = [
    { emotion: 'Feliz', count: 45, color: '#10B981', percentage: 30 },
    { emotion: 'Neutral', count: 38, color: '#6B7280', percentage: 25.3 },
    { emotion: 'Concentrado', count: 32, color: '#3B82F6', percentage: 21.3 },
    { emotion: 'Confundido', count: 20, color: '#F59E0B', percentage: 13.3 },
    { emotion: 'Triste', count: 12, color: '#EF4444', percentage: 8 },
    { emotion: 'Enojado', count: 3, color: '#DC2626', percentage: 2 }
  ];

  const dailyTrends = [
    { time: '9:00', feliz: 20, neutral: 15, confundido: 8, triste: 2 },
    { time: '10:00', feliz: 32, neutral: 22, confundido: 12, triste: 4 },
    { time: '11:00', feliz: 45, neutral: 28, confundido: 18, triste: 6 },
    { time: '12:00', feliz: 38, neutral: 35, confundido: 15, triste: 8 },
    { time: '13:00', feliz: 25, neutral: 40, confundido: 20, triste: 10 },
    { time: '14:00', feliz: 42, neutral: 30, confundido: 14, triste: 5 },
    { time: '15:00', feliz: 48, neutral: 25, confundido: 10, triste: 3 }
  ];

  const weeklyComparison = [
    { day: 'Lun', semanaActual: 85, semanaAnterior: 78 },
    { day: 'Mar', semanaActual: 92, semanaAnterior: 85 },
    { day: 'Mié', semanaActual: 78, semanaAnterior: 90 },
    { day: 'Jue', semanaActual: 95, semanaAnterior: 82 },
    { day: 'Vie', semanaActual: 88, semanaAnterior: 88 }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: LucideIcon; // cualquier ícono de lucide-react
    color: "red" | "green" | "blue" | "yellow" | "purple" | "indigo" | "pink" | "orange";
    trend?: number; // porcentaje positivo o negativo
  }

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }: StatCardProps) => (
    <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 border-${color}-500 hover:shadow-xl transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
          {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{Math.abs(trend)}% vs semana anterior</span>
            </div>
          )}
        </div>
        <div className={`bg-${color}-100 p-3 rounded-full`}>
          <Icon className={`w-8 h-8 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Panel de Control - Reconocimiento Emocional</h1>
              <p className="text-gray-600 text-lg">Sistema de monitoreo universitario en tiempo real</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Última actualización</p>
              <p className="text-lg font-semibold text-gray-700">
                {currentTime.toLocaleTimeString('es-ES')}
              </p>
            </div>
          </div>
        </div>

        {/* Filtros de período */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {['today', 'week', 'month'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedPeriod === period
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-blue-50 shadow-md'
                  }`}
              >
                {period === 'today' ? 'Hoy' : period === 'week' ? 'Esta semana' : 'Este mes'}
              </button>
            ))}
          </div>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total de Estudiantes"
            value="147"
            subtitle="Presentes hoy"
            icon={Users}
            color="blue"
            trend={8.2}
          />
          <StatCard
            title="Sesiones Activas"
            value="23"
            subtitle="En tiempo real"
            icon={Activity}
            color="green"
            trend={-2.1}
          />
          <StatCard
            title="Promedio de Atención"
            value="78%"
            subtitle="Últimas 2 horas"
            icon={Heart}
            color="purple"
            trend={5.4}
          />
          <StatCard
            title="Tiempo Promedio"
            value="2.4h"
            subtitle="Por sesión"
            icon={Clock}
            color="orange"
            trend={12.3}
          />
        </div>

        {/* Gráficos principales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Distribución de emociones */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Distribución de Emociones</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emotionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {emotionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} estudiantes`, 'Cantidad']}
                    labelFormatter={(label) => `Emoción: ${label}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {emotionData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium">{item.emotion}</span>
                  </div>
                  <span className="text-sm text-gray-600">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tendencias diarias */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Tendencias del Día</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="time"
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="feliz"
                    stackId="1"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.8}
                  />
                  <Area
                    type="monotone"
                    dataKey="neutral"
                    stackId="1"
                    stroke="#6B7280"
                    fill="#6B7280"
                    fillOpacity={0.8}
                  />
                  <Area
                    type="monotone"
                    dataKey="confundido"
                    stackId="1"
                    stroke="#F59E0B"
                    fill="#F59E0B"
                    fillOpacity={0.8}
                  />
                  <Area
                    type="monotone"
                    dataKey="triste"
                    stackId="1"
                    stroke="#EF4444"
                    fill="#EF4444"
                    fillOpacity={0.8}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Comparación semanal y alertas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Comparación semanal */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Comparación Semanal</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="day"
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar
                    dataKey="semanaActual"
                    fill="#3B82F6"
                    name="Semana Actual"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="semanaAnterior"
                    fill="#93C5FD"
                    name="Semana Anterior"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Panel de alertas y estado del sistema */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Estado del Sistema</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Raspberry Pi Conectado</p>
                    <p className="text-sm text-green-600">Enviando datos correctamente</p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center space-x-3">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">API Funcionando</p>
                    <p className="text-sm text-blue-600">Latencia: 45ms</p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-800">Atención Requerida</p>
                    <p className="text-sm text-yellow-600">3 estudiantes con baja concentración</p>
                  </div>
                </div>
                <button className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full hover:bg-yellow-300 transition-colors">
                  Ver detalles
                </button>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Métricas de Rendimiento</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Precisión del modelo</p>
                    <p className="font-semibold text-green-600">94.2%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Datos procesados</p>
                    <p className="font-semibold text-blue-600">2,847</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Tiempo de respuesta</p>
                    <p className="font-semibold text-purple-600">0.08s</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Uptime</p>
                    <p className="font-semibold text-green-600">99.8%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;