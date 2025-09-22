import type { User } from "./User";

export interface Professor {
  id: number;
  full_name: string;
  user: User;
}
