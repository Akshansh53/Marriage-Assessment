import { users } from "../database/schema/schema";

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      password: string;
      role?: string | null;
    }
  }
}

export {};
