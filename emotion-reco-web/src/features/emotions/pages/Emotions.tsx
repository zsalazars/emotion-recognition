
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Meh } from 'lucide-react';
import type { Emotion } from '@/types/Emotion';
import { GetEmotions, PostEmotion } from '@/api/emotion.api';
import Modal from '@/components/shared/Modal';
import EmotionForm from '@/features/emotions/components/EmotionForm';
import toast from 'react-hot-toast';

const Emotions = () => {
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmotion, setEditingEmotion] = useState<Emotion | null>(null);
  const [formData, setFormData] = useState({ name: '' });
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getEmotions = async () => {
    try {
      setLoading(true);
      const emotionsData = await GetEmotions();
      setEmotions(emotionsData);
    } catch {
      toast.error('Error al cargar las emociones');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error('El nombre de la emoción es requerido');
      return;
    }

    try {
      setIsSubmitting(true);

      if (editingEmotion) {
        // Actualizar
        const updatedEmotion = { ...editingEmotion, name: formData.name.trim() };
        //await UpdateEmotion(updatedEmotion);
        setEmotions(emotions.map(emotion =>
          emotion.id === editingEmotion.id ? updatedEmotion : emotion
        ));
        toast.success('Emoción actualizada exitosamente');
      } else {
        // Crear
        const newEmotion = { id: 0, name: formData.name.trim() };
        const createdEmotion = await PostEmotion(newEmotion);
        setEmotions([...emotions, createdEmotion]);
        toast.success('Emoción creada exitosamente');
      }

      closeModal();
    } catch {
      toast.error(editingEmotion ? 'Error al actualizar la emoción' : 'Error al crear la emoción');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta emoción?')) return;

    setEmotions(emotions.filter(emotion => emotion.id !== id));
    toast.error('Emoción eliminada exitosamente');
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
      <div>
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
          <div className="bg-blue-950 p-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Dashboard de Emociones
            </h1>
            <p className="text-indigo-100">
              Gestiona el catálogo de emociones para tu sistema de reconocimiento
            </p>
          </div>
        </div>

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
              className="bg-gradient-to-r from-indigo-900 to-blue-800 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-800 hover:to-blue-900 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              disabled={loading}
            >
              <Plus className="w-5 h-5" />
              <span>Nueva Emoción</span>
            </button>
          </div>

          {/* Emotions Grid */}
          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500">Cargando emociones...</p>
              </div>
            ) : emotions.length === 0 ? (
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

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingEmotion ? 'Editar Emoción' : 'Nueva Emoción'}
        subtitle={editingEmotion ? 'Actualiza la información de la emoción' : 'Agrega una nueva emoción al catálogo'}
        size="md"
      >
        <EmotionForm
          formData={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          isLoading={isSubmitting}
          isEditing={!!editingEmotion}
        />
      </Modal>
    </div>
  );
};

export default Emotions;