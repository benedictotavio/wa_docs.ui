import { useMemo, useState } from "react";
import { UserDetails } from "../../interfaces/auth.interface";
import _fetch from "../utils/fetch";
import { jwtDecode } from "jwt-decode";

const useUser= () => {
    const [user, setUser] = useState<UserDetails | null>(null);

    const getUser = async (email: string) => {
        return _fetch(`/user?email=${email}`, {
            includeCredentials: true,
        }).then(
            (res) => {
                setUser(res);
                return res;
            }
        ).catch((err) => {
            console.error(err);
        });
    }

    const getUserByToken = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            location.href = "/";
            return;
        }
        const decodedToken = jwtDecode<{ sub: string }>(token);
        return decodedToken.sub;
    }

    useMemo(() => {
        getUser(getUserByToken() ?? "").then((res) => {
            localStorage.setItem("user", JSON.stringify(res.id));
        });
    }, []);

    return {
        user,
    }
}

export default useUser;