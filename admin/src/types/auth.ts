export interface LoginRequest {
    email: string;
  }
  
export type UserRole = 'admin' | 'regular' | 'guest';

// Define User interface
export interface User {
  email: string;
  role: UserRole;
}