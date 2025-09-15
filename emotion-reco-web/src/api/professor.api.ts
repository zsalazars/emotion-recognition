import api from "@/core/axios";

export const GetProfessors = async () => {
  const response = await api.get("/professors/");
  return response.data;
};
