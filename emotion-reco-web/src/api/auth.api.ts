import api from "@/core/axios";

export const GetToken = async (credentials: {
  username: string;
  password: string;
}) => {
  const response = await api.post("/token/", credentials);
  return response.data;
};

export const GetRefreshToken = async (refreshToken: string) => {
  const response = await api.post("/token/refresh/", refreshToken);
  return response.data;
};
