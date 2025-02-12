import { useEffect, useState } from "react";
import { SignUpInterface, UserDetails } from "../../interfaces/auth.interface";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<UserDetails | null>(null);

    const navigate = useNavigate();

    const signUp = async (data: SignUpInterface): Promise<{ token: string }> => {
        return await fetch(`${API_URL}/api/v1/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.status === 201) {
                navigate("/login");
                return res.json();
            }
        })
            .catch((err) => {
                console.log(err);
                throw new Error(err);
            })
    }

    const login = async (email: string, password: string): Promise<{ token: string }> => {
        return await fetch(`${API_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        }).then(response => {
            localStorage.setItem('email', email);
            navigate('/');
            return response.json();
        }).catch(error => {
            alert("Usuário ou senha inválidos");
            return error;
        });
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
                setUser(null)
            } else {
                setIsAuthenticated(true);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, [setIsAuthenticated, user, setUser, navigate]);

    return {
        isAuthenticated,
        user,
        signUp,
        login
    }
}

export default useAuth;