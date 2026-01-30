import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider( {children} ) {
    const [isAuth, setIsAuth] = useState({
        isAuth: false,
        user:null,
    });
    const navigate = useNavigate();



    function login() {
        setIsAuth({
            isAuth: true,
            user: '',
        });
        navigate('/profile');
        console.log('Gebruiker is ingelogd!');
    }

    function logout() {
        setIsAuth({
            isAuth: false,
            user: '',
        });
        navigate('/');
        console.log('Gebruiker is uitgelogd!');
    }

    const data = {
        authentication: isAuth,
        login: login,
        logout: logout,

    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider;