import { SignUpInterface, UserDetails } from "../../interfaces/auth.interface";

export interface AuthContextValue {
    signUp(user: SignUpInterface): Promise<{ token: string }>;
    login(email: string, password: string): Promise<{ token: string }>;
    isAuthenticated: boolean;
    user: UserDetails | null;
}