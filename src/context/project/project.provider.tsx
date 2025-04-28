import { ReactNode, useMemo } from "react";
import useProject from "./project.services";
import { ProjectContext } from "./project.context";

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const {
    loading,
    addProject,
    updateProject,
    deleteProject,
    changeCurrentProject,
    currentProject,
    getProjects,
  } = useProject();

  const value = useMemo(
    () => ({
      loading,
      addProject,
      updateProject,
      deleteProject,
      changeCurrentProject,
      currentProject,
      getProjects,
    }),
    [
      loading,
      addProject,
      updateProject,
      deleteProject,
      changeCurrentProject,
      currentProject,
      getProjects,
    ]
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
