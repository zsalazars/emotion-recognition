import api from "@/core/axios";
import type { CourseFormData } from "@/types/Course";

export const GetCourses = async () => {
  const response = await api.get("/courses/");
  return response.data;
};

export const GetCoursesById = async (id: number) => {
  const response = await api.get(`/courses/${id}`);
  return response.data;
};

export const PostCourse = async (data: CourseFormData) => {
  const response = await api.post("/courses/", data);
  return response.data;
};
