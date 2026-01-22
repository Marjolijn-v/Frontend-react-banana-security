import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider( {children} ) {
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();



    function login() {
        setIsAuth(true);
        navigate('/profile');
        console.log('Gebruiker is ingelogd!');
    }

    function logout() {
        setIsAuth(false);
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