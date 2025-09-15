const Dashboard = () => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-semibold">Panel de Control General</h1>
        <span className="text-gray-600">Estadísticas y análisis de resultados</span>
      </div>
      <div className="flex flex-row m-4 gap-8">
        <div className="flex flex-col bg-white p-4 rounded-lg shadow-md w-1/3 border-l-4 border-blue-600">
          <span className="text-gray-500">Total de alumnos</span>
          <span className="text-4xl font-semibold">50</span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md w-1/3 border-l-4 border-sky-600">
          <span>Estadísticas</span>
          <p>Resumen de las estadísticas</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md w-1/3 border-l-4 border-purple-500">
          <span>Estadísticas</span>
          <p>Resumen de las estadísticas</p>
        </div>
      </div>
    </>
  )
};

export default Dashboard;