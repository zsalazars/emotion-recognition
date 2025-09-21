import type { Professor } from "./Professor";

export interface Course {
  id: number;
  name: string;
  code: string;
  professor: Professor;
}

export interface CourseFormData {
  name: string;
  code: string;
  professor_id: number;
}

export const defaultCourse: CourseFormData = {
  name: "",
  code: "",
  professor_id: 0,
};
