import { Project } from "../../interfaces/project.interfaces";

export interface ProjectContextValue {
  currentProject: Project | null;
  changeCurrentProject: (projectId: number) => void;
  loading: boolean;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: number) => void;
  getProjects: (userId?: number, teamId?: number) => Promise<Project[] | undefined>
}
