import { Team } from "../../interfaces/team.interface";

export interface TeamContextValue {
  teams: Team[];
  team: Team;
  loading: boolean;
  addTeam: (team: Team) => void;
  updateTeam: (team: Team) => void;
  deleteTeam: (teamId: number) => void;
}
