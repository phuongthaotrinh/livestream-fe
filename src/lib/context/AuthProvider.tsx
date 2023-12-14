import {createContext, useState, useEffect} from "react";
import {IAuthSignin, IAuthSignup} from "@/lib/validation/users";
import {http} from "@/config/http";
import useLocalStorage from '@/lib/hooks/useLocalStorage';

interface AuthContextType {
    auth: any | null;
    setAuth: any;
    signinAction: (userData: any) => void;
    signupAction: (userData: any) => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);
const userApiUrl = {
    signup: 'user/register',
    signin: 'user/login',

}
export const AuthProvider = ({children}: any) => {
    const [auth, setAuth] = useLocalStorage<any | null>('auth', null);

    async function signupAction(
        body: Omit<IAuthSignup, 'verifyPassword'>
    ) {
        await http.post(userApiUrl.signup, body);
    }

    async function signinAction(
        body: IAuthSignin
    ) {
        const {data} = await http.post(userApiUrl.signin, body);
        if (data.token) {
            setAuth(data)
        }
    }

    return (
        <AuthContext.Provider value={{auth, setAuth, signinAction, signupAction}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;