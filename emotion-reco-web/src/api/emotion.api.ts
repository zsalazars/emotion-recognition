// src/api/emotion.api.ts

import api from "@/core/axios";
import type { Emotion } from "@/types/Emotion";

export const GetEmotions = async () => {
  const response = await api.get("/emotions/");
  return response.data;
};

export const PostEmotion = async (data: Emotion) => {
  const response = await api.post("/emotions/", data);
  return response.data;
};
