import type { Course } from "./Course";

export interface Student {
  id: number;
  code: string;
  name: string;
  courses: Course[];
}
