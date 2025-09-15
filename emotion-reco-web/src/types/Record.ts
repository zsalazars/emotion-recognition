import type { Course } from "./Course";
import type { Emotion } from "./Emotion";

export interface Record {
  id: number;
  accuracy: number;
  classroom_code: string;
  timestamp: string;
  emotion: Emotion;
  course: Course;
}

export interface RecordPost {
  id: number;
  accuracy: number;
  classroom_code: string;
  emotion_id: number;
  course_id: number;
}

export const defaultRecord = {
  id: 0,
  accuracy: 0,
  classroom_code: "",
  timestamp: "",
  emotion: { id: 0, name: "" },
  course: { id: 0, name: "", description: "" },
};
