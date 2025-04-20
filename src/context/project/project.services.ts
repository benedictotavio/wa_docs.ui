import { useMemo, useState } from "react";
import { Project } from "../../interfaces/project.interfaces";
import { useNavigate } from "react-router-dom";
import _fetch from "../utils/fetch";

const useProject = () => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getProjects = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("user");
      if (!userId) return;

      const response = await _fetch(`/project?owner=${userId}`, {
        includeCredentials: true,
      });

      setProjects(response);

      if (response.length > 0) {
        if (!currentProject) {
          if (sessionStorage.getItem("project")) {
            const projectId = sessionStorage.getItem("project") ?? "";
            setCurrentProject(
              response.find(
                (project: Project) => project.id === Number(projectId)
              )
            );
            sessionStorage.setItem("project", projectId);
          } else {
            setCurrentProject(response[0]);
            sessionStorage.setItem("project", response[0].id);
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const addProject = async (project: Project) => {
    try {
      const data = await _fetch(`/project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
        includeCredentials: true,
      });

      setProjects([
        ...projects,
        {
          description: data.description,
          name: data.name,
          ownerId: data.ownerId,
        },
      ]);
      setCurrentProject(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProject = async (project: Project) => {
    try {
      const response = await _fetch(`/project/${project.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
      const data = await response.json();
      setProjects(
        projects.map((project) => (project.id === data.id ? data : project))
      );
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProject = async (projectId: number) => {
    try {
      await _fetch(`/project/${projectId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        includeCredentials: true,
      });
      setProjects(projects.filter((project) => project.id !== projectId));
    } catch (error) {
      console.error(error);
    }
  };

  const changeCurrentProject = (projectId: number) => {
    const project = projects.find((project) => project.id === projectId);
    sessionStorage.setItem("project", JSON.stringify(projectId));
    setCurrentProject(project || null);
  };

  useMemo(() => {
    getProjects();
  }, []);

  return {
    projects,
    loading,
    getProjects,
    addProject,
    updateProject,
    deleteProject,
    currentProject,
    changeCurrentProject,
  };
};

export default useProject;
