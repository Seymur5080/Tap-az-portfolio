import React, {createContext, useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';

export const Context = createContext();

const ContextElement = ({children}) => {
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [isLogin, setIsLogin] = useState(false);

    useEffect(()=>{
        let idToken = localStorage.getItem('idToken');
        if(idToken){
            setUser(idToken);
            setIsLogin(true);
        } else {
            navigate('/signIn');
        }
    }, [])

    const signIn = (data) => {
        setUser(data.idToken);
        setIsLogin(true);
        localStorage.setItem('idToken', data.idToken);
        navigate('/');
    }

    const logout = () => {
        setUser('');
        setIsLogin(false);
        localStorage.removeItem('idToken');
        navigate('/signIn');
    }

    const values = {
        user,
        isLogin,
        signIn,
        logout
    }

    return(
        <div>
            <Context.Provider value={values}>
                {children}
            </Context.Provider>
        </div>
    )
}

export default ContextElement;