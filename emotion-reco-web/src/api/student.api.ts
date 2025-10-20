// src/api/student.api.ts

import api from "@/core/axios";
import type { Student } from "@/types/Student";

export const GetStudents = async () => {
  const response = await api.get("/students/");
  return response.data;
};

export const PostStudent = async (data: Student) => {
  const response = await api.post("/students/", data);
  return response.data;
};
