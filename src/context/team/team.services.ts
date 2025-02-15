import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Team } from "../../interfaces/team.interface";
import _fetch from "../utils/fetch";

const useTeam = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [team, setTeam] = useState<Team>(teams[0]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getTeams = async () => {
    try {
      const response = await _fetch(
        `/team?user=${localStorage.getItem("user")}`,
        {
          includeCredentials: true,
        }
      );

      setTeams(response);
      setLoading(false);

      if (sessionStorage.getItem("team") === null) {
        sessionStorage.setItem("team", response[0].id);
      }

      setTeam(response[0]);

    } catch (error) {
      console.log(error);
    }
  };

  const getTeam = async () => {

    const teamId = sessionStorage.getItem("team");

    if (teamId) {
      try {
        const response = await _fetch(`/team/${teamId}`, {
          includeCredentials: true,
        });
        const data = await response;
        sessionStorage.setItem("team", JSON.stringify(data.team_id));
        setTeam(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addTeam = async (team: Team) => {
    try {
      await _fetch(`/team`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(team),
        includeCredentials: true,
      });
      setTeams([
        ...teams,
        {
          ownerId: team.ownerId,
          name: team.name,
          description: team.description,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTeam = async (team: Team) => {
    try {
      const response = await fetch(`/team/${team.team_id}`, {
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
      await fetch(`/team/${teamId}`, {
        method: "DELETE",
      });
      setTeams(teams.filter((team) => team["team_id"] !== teamId));
    } catch (error) {
      console.log(error);
    }
  };

  const changeActualTeam = async (team: Team) => {
    sessionStorage.setItem("team", JSON.stringify(team.id));
    setTeam(team);
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
    changeActualTeam,
  };
};

export default useTeam;
