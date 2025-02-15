import { useEffect, useState } from "react";
import { SignUpInterface, UserDetails } from "../../interfaces/auth.interface";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import _fetch from "../utils/fetch";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<UserDetails | null>(null);

    const navigate = useNavigate();

    const signUp = async (data: SignUpInterface): Promise<{ token: string }> => {
        return await _fetch(`/auth/signup`, {
            method: "POST",
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.status === 201) {
                navigate("/");
                return res;
            }
        })
            .catch((err) => {
                console.log(err);
                throw new Error(err);
            })
    }

    const getUser = async (email: string): Promise<UserDetails> => {
        return _fetch(`/user?email=${email}`, {
            includeCredentials: true,
        }).then(
            (res) => {
                localStorage.setItem("user", JSON.stringify(res.id));
                setUser(res);
                return res;
            }
        ).catch((err) => {
            console.error(err);
        });
    }

    const getUserByToken = (token: string): string => {
        if (!token) {
            location.href = "/";
            return "";
        }
        const decodedToken = jwtDecode<{ sub: string }>(token);
        return decodedToken.sub;
    }

    const login = async (email: string, password: string): Promise<{ token: string }> => {
        return await _fetch(`/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        }).then(async response => {
            localStorage.setItem('token', response.token);
            const email = getUserByToken(response.token);
            const userFound = getUser(email);
            setIsAuthenticated(true);
            setUser(await userFound);
            window.location.href = '/docs';
            return response.token;
        }).catch(error => {
            console.error(error);
            alert("Usuário ou senha inválidos");
            return error;
        });
    }

    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        setIsAuthenticated(false);
        setUser(null);
        navigate('/');
    }

    const isTokenExpired = (token: string) => {
        if (!token) return true;
        try {
            const decodedToken = jwtDecode<{ exp?: number }>(token);
            const tokenExpiration = decodedToken.exp ? decodedToken.exp * 1000 : 0;
            const currentTime = new Date().getTime();
            return tokenExpiration < currentTime;
        } catch (error) {
            console.error('Error decoding token:', error);
            return true;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                if (isTokenExpired(token)) {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                    navigate('/');
                } else {
                    const email = getUserByToken(token);
                    const userFound = getUser(email);
                    setUser(await userFound);
                    setIsAuthenticated(true);
                }
            } else {
                setIsAuthenticated(false);
            }
        };
        fetchData();
    }, [setIsAuthenticated, navigate]);

    return {
        isAuthenticated,
        signUp,
        login,
        logout,
        user
    }
}

export default useAuth;