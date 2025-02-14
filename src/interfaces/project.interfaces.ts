import { Folder } from "./folder.interface";
import { Team } from "./team.interface";
import { User } from "./user.interface";

export interface Project {
  id: number;
  description: string;
  name: string;
  owner: User;
  team: Team;
  folders: Folder[];
}