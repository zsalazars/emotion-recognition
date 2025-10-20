import { GetStudents } from "@/api/student.api";
import type { Student } from "@/types/Student";
import { useEffect, useState } from "react";
import StudentsTable from "../components/students-table";

const Students = () => {
  const [data, setData] = useState<Student[]>([]);

  const fetchStudents = async () => {
    const response = await GetStudents();
    setData(response);
  }

  useEffect(() => {
    fetchStudents();
  }, []);
  return (
    <div>
      <StudentsTable data={data} />
    </div>
  )
}

export default Students;