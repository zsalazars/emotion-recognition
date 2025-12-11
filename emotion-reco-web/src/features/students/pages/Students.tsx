import type { Student } from "@/types/Student";
import { useEffect, useState } from "react";
import StudentsTable from "../components/students-table";
import { useParams } from "react-router";
import { GetCoursesById } from "@/api/course.api";
import Modal from "@/components/shared/Modal";
import { GetRecordsByStudentAndCourse } from "@/api/record.api";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { Record } from "@/types/Record";

type EmotionChartData = {
  name: string;
  count: number;
  accuracy: number;
  color: string;
};

const Students = () => {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<Student[]>([]);
  const [student, setStudent] = useState<Student | null>(null);
  const [studentRecords, setStudentRecords] = useState<EmotionChartData[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!id) return;
      const response = await GetCoursesById(parseInt(id));
      setData(response.students);
    };

    fetchStudents();
  }, [id]);

  const selectColorByEmotion = (emotion: string) => {
    switch (emotion) {
      case 'happiness':
        return '#10B981';
      case 'neutral':
        return '#6B7280';
      case 'surprise':
        return '#3B82F6';
      case 'disgust':
        return '#F59E0B';
      case 'sadness':
        return '#EF4444';
      case 'anger':
        return '#DC2626';
      case 'fear':
        return '#8B5CF6';
      case 'contempt':
        return '#F59E0B';
      default:
        return '#9CA3AF';
    }
  }

  const handleView = async (student: Student) => {
    openModal();
    setStudent(student);

    const records = await GetRecordsByStudentAndCourse(student.id, parseInt(id!));

    const emotionData = records.reduce((acc: EmotionChartData[], record: Record) => {
      const existing = acc.find(item => item.name === record.emotion.name);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({
          name: record.emotion.name,
          count: 1,
          accuracy: record.accuracy,
          color: selectColorByEmotion(record.emotion.name),
        });
      }
      return acc;
    }, []);

    setStudentRecords(emotionData);
  };

  const handleEdit = (student: Student) => {
    console.log("Editar estudiante:", student);
  };

  const handleDelete = (student: Student) => {
    console.log("Eliminar estudiante:", student);
  };

  const exportPdf = (student: Student) => {
    console.log("Exportar PDF del estudiante:", student);
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <StudentsTable data={data} onHandleView={handleView} onHandleEdit={handleEdit} onHandleDelete={handleDelete} onHandlePdf={exportPdf} />

      {student && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Estudiante"
          subtitle="Ver información del estudiante"
          size="xl"
        >
          <div className="space-y-6">

            {/* Info del estudiante */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Información del estudiante</h3>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">ID</p>
                  <p className="font-medium">{student.id}</p>
                </div>

                <div>
                  <p className="text-gray-500">Código</p>
                  <p className="font-medium">{student.code}</p>
                </div>

                <div>
                  <p className="text-gray-500">Nombre</p>
                  <p className="font-medium">{student.name}</p>
                </div>
              </div>
            </div>

            {/* Lista de emociones detectadas */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Emociones detectadas</h3>

              <div className="flex flex-wrap gap-2">
                {studentRecords.map((item) => (
                  <span
                    key={item.name}
                    className="px-3 py-1 text-xs font-medium rounded-full text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.name} ({item.count})
                  </span>
                ))}
              </div>
            </div>

            {/* Gráfico */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Distribución de emociones</h3>

              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={studentRecords}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {studentRecords.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>

                    <Tooltip
                      formatter={(value) => [`${value} registros`, 'Cantidad']}
                      labelFormatter={(label) => `Emoción: ${label}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </Modal>

      )}
    </div>
  )
}

export default Students;