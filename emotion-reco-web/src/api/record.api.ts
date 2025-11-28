// src/api/record.api.ts

import api from "@/core/axios";
import type { Record } from "@/types/Record";

export const GetRecords = async () => {
  const response = await api.get("/emotion-records/");
  return response.data;
};

export const PostEmotion = async (data: Record) => {
  const response = await api.post("/emotion-records/", data);
  return response.data;
};

// By student and course
export const GetRecordsByStudentAndCourse = async (
  studentId: number,
  courseId: number
) => {
  const response = await api.get(
    `/emotion-records/by-student-course/?student_id=${studentId}&course_id=${courseId}`
  );
  return response.data;
};
