import { UserDetails } from "./auth.interface";
import { Folder } from "./folder.interface";
import { Team } from "./team.interface";

export interface Project {
  id?: number;
  description: string;
  name: string;
  owner?: UserDetails;
  team?: Team;
  folders?: Folder[];
  ownerId?: number;
  teamId?: number;
}