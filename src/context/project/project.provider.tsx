import { ReactNode, useMemo } from "react";
import useProject from "./project.services";
import { ProjectContext } from "./project.context";

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const {
    projects,
    loading,
    addProject,
    updateProject,
    deleteProject,
    changeCurrentProject,
    currentProject,
  } = useProject();

  const value = useMemo(
    () => ({
      projects,
      loading,
      addProject,
      updateProject,
      deleteProject,
      changeCurrentProject,
      currentProject,
    }),
    [
      projects,
      loading,
      addProject,
      updateProject,
      deleteProject,
      changeCurrentProject,
      currentProject,
    ]
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
