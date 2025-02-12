import { ReactNode, useMemo } from "react";
import useAuth from "./auth.services";
import { AuthContext } from "./auth.context";


export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const { isAuthenticated, login, signUp, user } = useAuth();

    const value = useMemo(() => ({
        isAuthenticated,
        login,
        signUp,
        user
    }), [isAuthenticated, login, signUp, user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
