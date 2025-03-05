import { Project } from "../../interfaces/project.interfaces";

export interface ProjectContextValue {
    currentProject: Project | null;
    changeCurrentProject: (projectId: number) => void;
    projects: Project[];
    loading: boolean;
    addProject: (project: Project) => void;
    updateProject: (project: Project) => void;
    deleteProject: (projectId: number) => void;
}