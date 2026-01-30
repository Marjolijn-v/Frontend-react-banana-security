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
    })




    useEffect(() => {
        //persist on refresh
        const jwtToken = localStorage.getItem('token');
        if (jwtToken) {
            const decoded = jwtDecode(jwtToken);
            if(isTokenValid(decoded)) {
                checkAuth();
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

    async function checkAuth() {
        const jwtToken = localStorage.getItem('token');
        const decoded = jwtDecode(jwtToken);
        const userId = decoded.userId;

        try {

            const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'novi-education-project-id': '2767c1c3-13ff-45b7-a2b7-6870077651b3',
                    "Content-Type": "application/json",
                },
            }
            );

            toggleAuth({
                isAuth: true,
                user: response.data,
                status: 'done',
            })


        } catch (e) {
            console.error(e);
        }
    }


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