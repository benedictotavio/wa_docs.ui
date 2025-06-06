export interface LoginInterface {
  email: string;
  password: string;
}

export interface SignUpInterface {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  role: string;
}

export interface UserDetails {
  id: number;
  email: string;
  username: string;
}
