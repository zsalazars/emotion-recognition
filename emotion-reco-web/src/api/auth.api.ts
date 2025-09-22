import api from "@/core/axios";

export const GetUsers = async () => {
  const response = await api.get("/users/");
  return response.data;
};

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
