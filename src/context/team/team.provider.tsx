import { ReactNode, useMemo } from "react";
import useTeam from "./team.services";
import { TeamContext } from "./team.context";

export const TeamProvider = ({ children }: { children: ReactNode }) => {

    const { teams, team, loading, addTeam, updateTeam, deleteTeam, changeActualTeam } = useTeam();

    const value = useMemo(() => ({
        teams,
        team,
        loading,
        addTeam,
        updateTeam,
        deleteTeam,
        changeActualTeam
    }), [teams, loading, addTeam, updateTeam, deleteTeam, team, changeActualTeam]);

    return (
        <TeamContext.Provider value={value}>
            {children}
        </TeamContext.Provider>
    );
}