import { Team } from "./team.interface";

export interface User {
    id?: number;
    crated_at: string;
    email: string;
    role: string;
    updated_at: string;
    username: string;
    teams: Team[];
}