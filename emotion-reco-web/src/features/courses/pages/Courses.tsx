import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { defaultCourse, type Course } from "@/types/Course";
import { GetCourses, PostCourse } from "@/api/course.api";
import toast from "react-hot-toast";
import Modal from "@/components/shared/Modal";
import CourseForm from "../components/CourseForm";

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState(defaultCourse);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCourses = async () => {
    try {
      setLoading(true);
      const emotionsData = await GetCourses();
      setCourses(emotionsData);
    } catch {
      toast.error('Error al cargar las emociones');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error('El nombre del curso es requerido');
      return;
    }

    try {
      setIsSubmitting(true);

      if (editingCourse) {
        // Actualizar
        const updatedCourse = { ...editingCourse, name: formData.name.trim(), code: formData.code, professor_id: formData.professor_id };
        //await UpdateEmotion(updatedEmotion);
        toast.success('Emoción actualizada exitosamente');
      } else {
        // Crear
        const newCourse = { id: 0, name: formData.name.trim(), code: formData.code, professor_id: formData.professor_id };
        const createdCourse = await PostCourse(newCourse);
        setCourses([...courses, createdCourse]);
        toast.success('Emoción creada exitosamente');
      }

      closeModal();
    } catch {
      toast.error(editingCourse ? 'Error al actualizar la emoción' : 'Error al crear la emoción');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openCreateModal = () => {
    setFormData(defaultCourse);
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
    setFormData(defaultCourse);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div>
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
          <div className="bg-blue-950 p-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Asignaturas
            </h1>
            <p className="text-indigo-100">
              Gestiona las asignaturas disponibles en el sistema
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Actions Bar */}
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Catálogo de asignaturas
              </h2>
              <p className="text-gray-600 mt-1">
                {courses.length} asignaturas registradas
              </p>
            </div>
            <button
              onClick={openCreateModal}
              className="bg-gradient-to-r from-indigo-900 to-blue-800 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-800 hover:to-blue-900 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              disabled={loading}
            >
              <Plus className="w-5 h-5" />
              <span>Nueva Asignatura</span>
            </button>
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
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Nombre</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Docente</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {courses.map((course: Course) => (
                    <tr key={course.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        #{course.id.toString().padStart(3, '0')}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{course.name}</div>
                          <div className="text-sm text-gray-500">{course.code}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {course.professor.full_name}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingCourse ? 'Editar Emoción' : 'Nueva Emoción'}
        subtitle={editingCourse ? 'Actualiza la información de la emoción' : 'Agrega una nueva emoción al catálogo'}
        size="md"
      >
        <CourseForm
          formData={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          isLoading={isSubmitting}
          isEditing={!!editingCourse}
        />
      </Modal>
    </div>
  )
}

export default Courses;