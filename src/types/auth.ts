export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: Record<string, string> | null;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  user: User;
}
