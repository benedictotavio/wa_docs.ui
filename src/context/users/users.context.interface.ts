import { UserDetails } from "../../interfaces/auth.interface";

export interface UserContextValue {
    user: UserDetails | null;
}