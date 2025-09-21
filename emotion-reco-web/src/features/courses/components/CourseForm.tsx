import type { CourseFormData } from "@/types/Course";

interface CourseFormProps {
  formData: CourseFormData;
  onChange: (data: CourseFormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
  isEditing: boolean;
}

const CourseForm: React.FC<CourseFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isLoading,
  isEditing,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange({
      ...formData,
      [name]: name === "professor_id" ? Number(value) : value, // profesor como número
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nombre */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Nombre del Curso
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          autoFocus
          disabled={isLoading}
        />
      </div>

      {/* Código */}
      <div>
        <label
          htmlFor="code"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Código
        </label>
        <input
          type="text"
          id="code"
          name="code"
          value={formData.code}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          disabled={isLoading}
        />
      </div>

      {/* Profesor */}
      <div>
        <label
          htmlFor="professor_id"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Profesor
        </label>
        <select
          id="professor_id"
          name="professor_id"
          value={formData.professor_id}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          disabled={isLoading}
        >
          <option value={0}>Seleccione un profesor</option>
          <option value={1}>Profesor 1</option>
          <option value={2}>Profesor 2</option>
        </select>
      </div>

      {/* Botones */}
      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
          disabled={isLoading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Guardando...</span>
            </div>
          ) : isEditing ? (
            "Actualizar"
          ) : (
            "Crear"
          )}
        </button>
      </div>
    </form>
  );
};

export default CourseForm;
