import { useMemo, useState } from "react";
import { Project } from "../../interfaces/project.interfaces";
import { useNavigate } from "react-router-dom";
import _fetch from "../utils/fetch";

const useProject = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getProjects = async () => {
    setLoading(true);
    try {
      const response = await _fetch(`/project?owner=${localStorage.getItem("user")}`, {
        includeCredentials: true,
      });
      setProjects(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (project: Project) => {
    try {
      const response = await _fetch(`/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
      const data = await response.json();
      setProjects([...projects, data]);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const updateProject = async (project: Project) => {
    try {
      const response = await _fetch(`/projects/${project.id}`, {
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
      console.log(error);
    }
  };

  const deleteProject = async (projectId: number) => {
    try {
      await _fetch(`/projects/${projectId}`, {
        method: "DELETE",
      });
      setProjects(projects.filter((project) => project.id !== projectId));
    } catch (error) {
      console.log(error);
    }
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
  };
};

export default useProject;
