import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Team } from "../../interfaces/team.interface";
import _fetch from "../utils/fetch";

const API_URL = import.meta.env.VITE_API_URL;

const useTeam = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [team, setTeam] = useState<Team>({} as Team);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getTeams = async () => {
    try {
      const response = await _fetch(`/team?user=${localStorage.getItem("user")}`, {
        includeCredentials: true,
      });
      setTeams(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getTeam = async (teamId: number) => {
    try {
      const response = await fetch(`${API_URL}/teams/${teamId}`);
      const data = await response.json();
      setTeam(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const addTeam = async (team: Team) => {
    try {
      const response = await fetch(`${API_URL}/teams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(team),
      });
      const data = await response.json();
      setTeams([...teams, data]);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const updateTeam = async (team: Team) => {
    try {
      const response = await fetch(`${API_URL}/teams/${team.team_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(team),
      });
      const data = await response.json();
      setTeams(
        teams.map((team) => (team["team_id"] === data["team_id"] ? data : team))
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTeam = async (teamId: number) => {
    try {
      await fetch(`${API_URL}/teams/${teamId}`, {
        method: "DELETE",
      });
      setTeams(teams.filter((team) => team["team_id"] !== teamId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  return {
    teams,
    team,
    loading,
    getTeam,
    getTeams,
    addTeam,
    updateTeam,
    deleteTeam,
  };
};

export default useTeam;
