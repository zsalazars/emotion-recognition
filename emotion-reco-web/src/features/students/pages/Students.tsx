import type { Student } from "@/types/Student";
import { useEffect, useState } from "react";
import StudentsTable from "../components/students-table";
import { useParams } from "react-router";
import { GetCoursesById } from "@/api/course.api";
import Modal from "@/components/shared/Modal";
import { GetRecordsByStudentAndCourse } from "@/api/record.api";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { Record } from "@/types/Record";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

  const exportPdf = async (student: Student) => {
    try {
      // Obtenemos los datos del estudiante
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

      // Crear PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      let yPos = 20;

      // Título principal
      pdf.setFontSize(22);
      pdf.setTextColor(31, 41, 55);
      pdf.text('Reporte de Estudiante', pageWidth / 2, yPos, { align: 'center' });
      yPos += 15;

      // Cuadro de información del estudiante
      pdf.setFillColor(249, 250, 251);
      pdf.roundedRect(15, yPos, pageWidth - 30, 40, 3, 3, 'F');
      pdf.setDrawColor(229, 231, 235);
      pdf.roundedRect(15, yPos, pageWidth - 30, 40, 3, 3, 'S');

      pdf.setFontSize(14);
      pdf.setTextColor(55, 65, 81);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Información del estudiante', 20, yPos + 10);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(107, 114, 128);

      const col1X = 20;
      const col2X = 80;
      const col3X = 140;

      pdf.text('ID:', col1X, yPos + 20);
      pdf.text('Código:', col2X, yPos + 20);
      pdf.text('Nombre:', col3X, yPos + 20);

      pdf.setTextColor(31, 41, 55);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.text(String(student.id), col1X, yPos + 28);
      pdf.text(student.code, col2X, yPos + 28);
      pdf.text(student.name, col3X, yPos + 28);

      yPos += 50;

      // Emociones detectadas
      pdf.setFontSize(14);
      pdf.setTextColor(55, 65, 81);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Emociones detectadas', 20, yPos);
      yPos += 10;

      // Total de registros
      const totalRecords = emotionData.reduce((sum: number, e: EmotionChartData) => sum + e.count, 0);

      // Tabla de emociones
      const tableData = emotionData.map((item: EmotionChartData) => [
        item.name.charAt(0).toUpperCase() + item.name.slice(1),
        item.count.toString(),
        `${((item.count / totalRecords) * 100).toFixed(1)}%`
      ]);

      autoTable(pdf, {
        startY: yPos,
        head: [['Emoción', 'Cantidad', 'Porcentaje']],
        body: tableData,
        theme: 'striped',
        headStyles: {
          fillColor: [55, 65, 81],
          textColor: [255, 255, 255],
          fontSize: 11,
          fontStyle: 'bold',
          halign: 'center'
        },
        bodyStyles: {
          fontSize: 10,
          textColor: [31, 41, 55]
        },
        columnStyles: {
          0: { halign: 'left', cellWidth: 80 },
          1: { halign: 'center', cellWidth: 40 },
          2: { halign: 'center', cellWidth: 40 }
        },
        alternateRowStyles: {
          fillColor: [249, 250, 251]
        },
        margin: { left: 20, right: 20 },
        didDrawCell: (data: any) => {
          // Círculo de color junto a la emoción
          if (data.column.index === 0 && data.section === 'body') {
            const emotion = emotionData[data.row.index];
            const r = parseInt(emotion.color.slice(1, 3), 16);
            const g = parseInt(emotion.color.slice(3, 5), 16);
            const b = parseInt(emotion.color.slice(5, 7), 16);

            pdf.setFillColor(r, g, b);
            pdf.circle(data.cell.x + 5, data.cell.y + data.cell.height / 2, 2.5, 'F');
          }
        }
      });

      // Obtener la posición Y después de la tabla
      yPos = (pdf as any).lastAutoTable.finalY + 15;

      // Resumen
      pdf.setFillColor(239, 246, 255);
      pdf.roundedRect(15, yPos, pageWidth - 30, 25, 3, 3, 'F');
      pdf.setDrawColor(191, 219, 254);
      pdf.roundedRect(15, yPos, pageWidth - 30, 25, 3, 3, 'S');

      pdf.setFontSize(11);
      pdf.setTextColor(30, 64, 175);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Resumen:', 20, yPos + 10);

      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(55, 65, 81);
      pdf.text(`Total de registros emocionales: ${totalRecords}`, 20, yPos + 18);

      // Footer
      const pageCount = pdf.getNumberOfPages();
      pdf.setFontSize(8);
      pdf.setTextColor(107, 114, 128);
      pdf.setFont('helvetica', 'italic');

      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        const footerText = `Generado el ${new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })} - Página ${i} de ${pageCount}`;
        pdf.text(footerText, pageWidth / 2, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });
      }

      // Abrir en nueva ventana
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');

      // También descargar
      pdf.save(`estudiante_${student.code}_${student.name}.pdf`);

      console.log("PDF generado exitosamente!");
    } catch (error) {
      console.error("Error al exportar PDF:", error);
      alert(`Hubo un error al generar el PDF: ${error}`);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <StudentsTable
        data={data}
        onHandleView={handleView}
        onHandleEdit={handleEdit}
        onHandleDelete={handleDelete}
        onHandlePdf={exportPdf}
      />

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
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Información del estudiante
              </h3>

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
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Emociones detectadas
              </h3>

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
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Distribución de emociones
              </h3>

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
  );
};

export default Students;