import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import isTokenValid from "../helpers/isTokenValid";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider( {children} ) {
    const [auth, toggleAuth] = useState({
        isAuth: false,
        user:null,
        status: 'pending',
    });

    useEffect(() => {
        //persist on refresh
        const jwtToken = localStorage.getItem('token');
        if (jwtToken) {
            const decoded = jwtDecode(jwtToken);
            if(isTokenValid(decoded)) {
                toggleAuth({
                    isAuth: true,
                    user: {
                        email: decoded.email,
                        roles: decoded.role,
                    },
                    status: 'done',
                });
            } else {
                toggleAuth( {
                    ...auth,
                    status: 'done',
                });
            }

        } else {
            toggleAuth({
                ...auth,
                status: 'done',
            });
        }
    }, []);
    const navigate = useNavigate();



    function login(userDetails) {
        localStorage.setItem('token', userDetails.token);
        toggleAuth({
            isAuth: true,
            status: 'done',
            user: {
                email: userDetails.user.email,
                roles: userDetails.user.roles,
            },
        });
        navigate('/profile');
        console.log('Gebruiker is ingelogd!');
    }

    function logout() {
        localStorage.removeItem('token');
        toggleAuth({
            isAuth: false,
            status: 'done',
            user: null,
        });
        navigate('/');
        console.log('Gebruiker is uitgelogd!');
    }

    const data = {
        authentication: auth.isAuth,
        login: login,
        logout: logout,

    }

    return (
        <AuthContext.Provider value={data}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider;