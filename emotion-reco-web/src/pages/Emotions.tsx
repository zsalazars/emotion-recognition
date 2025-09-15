
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Meh, AlertCircle, CheckCircle } from 'lucide-react';
import type { Emotion } from '@/types/Emotion';
import { GetEmotions, PostEmotion } from '@/api/emotion.api';

const Emotions = () => {
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmotion, setEditingEmotion] = useState<Emotion | null>(null);
  const [formData, setFormData] = useState({ name: '' });
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const getEmotions = async () => {
    setLoading(true);
    const emotions = await GetEmotions();
    setEmotions(emotions);
    setLoading(false);
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      showNotification('error', 'El nombre de la emoción es requerido');
      return;
    }

    const newEmotion = {
      id: 0,
      name: formData.name.trim()
    };

    await PostEmotion(newEmotion);

    setEmotions([...emotions, newEmotion]);
    setFormData({ name: '' });
    setIsModalOpen(false);
    showNotification('success', 'Emoción creada exitosamente');
  };

  const handleUpdate = async () => {
    if (!formData.name.trim()) {
      showNotification('error', 'El nombre de la emoción es requerido');
      return;
    }

    setFormData({ name: '' });
    setEditingEmotion(null);
    setIsModalOpen(false);
    showNotification('success', 'Emoción actualizada exitosamente');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta emoción?')) return;

    setEmotions(emotions.filter(emotion => emotion.id !== id));
    showNotification('success', 'Emoción eliminada exitosamente');
  };

  const openCreateModal = () => {
    setFormData({ name: '' });
    setEditingEmotion(null);
    setIsModalOpen(true);
  };

  const openEditModal = (emotion: Emotion) => {
    setFormData({ name: emotion.name });
    setEditingEmotion(emotion);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEmotion(null);
    setFormData({ name: '' });
  };

  useEffect(() => {
    getEmotions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Dashboard de Emociones
            </h1>
            <p className="text-indigo-100">
              Gestiona el catálogo de emociones para tu sistema de reconocimiento
            </p>
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-2 ${notification.type === 'success'
            ? 'bg-green-500 text-white'
            : 'bg-red-500 text-white'
            }`}>
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Actions Bar */}
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Catálogo de Emociones
              </h2>
              <p className="text-gray-600 mt-1">
                {emotions.length} emociones registradas
              </p>
            </div>
            <button
              onClick={openCreateModal}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              <span>Nueva Emoción</span>
            </button>
          </div>

          {/* Emotions Grid */}
          <div className="p-6">
            {emotions.length === 0 ? (
              <div className="text-center py-12">
                <Meh className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No hay emociones registradas</p>
                <button
                  onClick={openCreateModal}
                  className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Crear la primera emoción
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {emotions.map((emotion) => (
                  <div
                    key={emotion.id}
                    className="group bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500">#{emotion.id}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      {emotion.name}
                    </h3>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(emotion)}
                        className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center space-x-1 font-medium"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Editar</span>
                      </button>
                      <button
                        onClick={() => handleDelete(emotion.id)}
                        className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200 flex items-center justify-center space-x-1 font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Eliminar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                {editingEmotion ? 'Editar Emoción' : 'Nueva Emoción'}
              </h3>
              <p className="text-gray-600 mt-1">
                {editingEmotion ? 'Actualiza la información de la emoción' : 'Agrega una nueva emoción al catálogo'}
              </p>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <label htmlFor="emotionName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la Emoción
                </label>
                <input
                  type="text"
                  id="emotionName"
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  placeholder="Ej: Felicidad, Tristeza, Ira..."
                  autoFocus
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  onClick={editingEmotion ? handleUpdate : handleCreate}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Guardando...</span>
                    </div>
                  ) : (
                    editingEmotion ? 'Actualizar' : 'Crear'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Emotions;