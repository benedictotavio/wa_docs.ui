import { useEffect, useState } from "react";
import { Project } from "../../interfaces/project.interfaces";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const useProject = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/projects`);
      const data = await response.json();
      setProjects(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addProject = async (project: Project) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/projects`, {
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
      const response = await fetch(`${API_URL}/api/v1/projects/${project.id}`, {
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
      await fetch(`${API_URL}/api/v1/projects/${projectId}`, {
        method: "DELETE",
      });
      setProjects(projects.filter((project) => project.id !== projectId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, [projects]);

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
