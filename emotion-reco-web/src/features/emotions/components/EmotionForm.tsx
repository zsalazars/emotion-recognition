interface EmotionFormProps {
  formData: { name: string };
  onChange: (data: { name: string }) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
  isEditing: boolean;
}
const EmotionForm: React.FC<EmotionFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isLoading,
  isEditing
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="emotionName" className="block text-sm font-medium text-gray-700 mb-2">
          Nombre de la Emoción
        </label>
        <input
          type="text"
          id="emotionName"
          value={formData.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          placeholder="Ej: Felicidad, Tristeza, Ira..."
          autoFocus
          disabled={isLoading}
        />
      </div>

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
          ) : (
            isEditing ? 'Actualizar' : 'Crear'
          )}
        </button>
      </div>
    </form>
  );
};

export default EmotionForm;