import { ReactNode, useMemo } from "react";
import useAuth from "./users.services";
import { UserContext } from "./users.context";


export const UserProvider = ({ children }: { children: ReactNode }) => {

    const { user } = useAuth();

    const value = useMemo(() => ({
        user
    }), [user]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}
