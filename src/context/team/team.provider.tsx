import { ReactNode, useMemo } from "react";
import useTeam from "./team.services";
import { TeamContext } from "./team.context";

export const TeamProvider = ({ children }: { children: ReactNode }) => {

    const { teams, team, loading, addTeam, updateTeam, deleteTeam } = useTeam();

    const value = useMemo(() => ({
        teams,
        team,
        loading,
        addTeam,
        updateTeam,
        deleteTeam
    }), [teams, loading, addTeam, updateTeam, deleteTeam, team]);

    return (
        <TeamContext.Provider value={value}>
            {children}
        </TeamContext.Provider>
    );
}