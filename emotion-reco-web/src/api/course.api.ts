import api from "@/core/axios";

export const GetCourses = async () => {
  const response = await api.get("/courses/");
  return response.data;
};
