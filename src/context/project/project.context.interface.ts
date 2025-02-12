import { Project } from "../../interfaces/project.interfaces";

export interface ProjectContextValue {
    projects: Project[];
    loading: boolean;
    addProject: (project: Project) => void;
    updateProject: (project: Project) => void;
    deleteProject: (projectId: number) => void;
}