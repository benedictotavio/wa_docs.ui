import { ReactNode, useMemo } from "react";
import useAuth from "./auth.services";
import { AuthContext } from "./auth.context";


export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const { isAuthenticated, login, signUp, logout, user } = useAuth();

    const value = useMemo(() => ({
        isAuthenticated,
        login,
        signUp,
        logout,
        user
    }), [isAuthenticated, login, signUp, logout, user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
