export interface User {
  id: string;
  email: string;
  name: string;
  roleId: number;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  user: User;
  expiresAt: Date;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login(email: string, password: string): Promise<void>;
  register(email: string, name: string, password: string): Promise<void>;
  logout(): Promise<void>;
}
