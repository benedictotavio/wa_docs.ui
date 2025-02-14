import { useEffect, useState } from "react";
import { SignUpInterface } from "../../interfaces/auth.interface";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import _fetch from "../utils/fetch";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();

    const signUp = async (data: SignUpInterface): Promise<{ token: string }> => {
        return await _fetch(`/auth/signup`, {
            method: "POST",
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.status === 201) {
                navigate("/");
                return res.json();
            }
        })
            .catch((err) => {
                console.log(err);
                throw new Error(err);
            })
    }

    const login = async (email: string, password: string): Promise<{ token: string }> => {
        return await _fetch(`/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        }).then(response => {
            localStorage.setItem('token', response.token);
            navigate('/docs');
            return response.token;
        }).catch(error => {
            console.error(error);
            alert("Usuário ou senha inválidos");
            return error;
        });
    }

    const logout = () => {
        localStorage.removeItem('token');
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
        const token = localStorage.getItem('token');
        if (token) {
            if (isTokenExpired(token)) {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
            } else {
                setIsAuthenticated(true);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, [setIsAuthenticated, navigate]);

    return {
        isAuthenticated,
        signUp,
        login,
        logout
    }
}

export default useAuth;