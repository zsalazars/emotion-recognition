import type { Student } from "@/types/Student";
import { useEffect, useState } from "react";
import StudentsTable from "../components/students-table";
import { useParams } from "react-router";
import { GetCoursesById } from "@/api/course.api";

const Students = () => {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!id) return;
      const response = await GetCoursesById(parseInt(id));
      setData(response.students);
    };

    fetchStudents();
  }, [id]);

  return (
    <div>
      <StudentsTable data={data} />
    </div>
  )
}

export default Students;