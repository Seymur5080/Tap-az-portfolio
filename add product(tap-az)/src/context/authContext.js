// IMPORT JSX, {CONTEXT, STATE, HOOKS}
import React, {createContext, useState, useEffect} from "react";
// IMPORT NAVIGATE
import {useNavigate} from 'react-router-dom';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    // USE NAVIGATE
    let navigator = useNavigate();

    // STATE
    const [user, setUser] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    // FOR PAGE REFRESH(HOOKS)
    useEffect(() => {
        let idToken = localStorage.getItem('idToken');
        if(idToken){
            setUser(idToken);
            setIsLogin(true);
        } else {
            navigator('/signUp');
        }
    }, []);

    // USER IS LOGIN IN HIS PROFILE(FOR SIGNUP, SIGNIN)
    const login = (data) => {
        setUser(data.idToken);
        setIsLogin(true);
        localStorage.setItem('idToken', data.idToken);
        navigator('/');
    }

    // USER IS LOGOUT IN HIS PROFILE
    const logout = () => {
        setUser('');
        setIsLogin(false);
        localStorage.removeItem('idToken');
        navigator('/signIn');
    }

    // OBJECT FOR ALL STATES
    const values = {
        user,
        isLogin,
        login,
        logout
    }

    return (
        <div>
            <AuthContext.Provider value={values}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthContextProvider;
