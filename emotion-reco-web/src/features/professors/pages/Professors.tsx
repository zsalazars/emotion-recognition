import { useEffect, useState } from "react";
import type { Professor } from "@/types/Professor";
import ProfessorTable from "./components/professors-table";
import { GetProfessors } from "@/api/professor.api";

const Professors = () => {
  const [data, setData] = useState<Professor[]>([]);

  const fetchProfessors = async () => {
    const response = await GetProfessors();
    setData(response);
  }

  useEffect(() => {
    fetchProfessors();
  }, []);
  return (
    <div>
      <ProfessorTable data={data} />
    </div>
  )
}

export default Professors;