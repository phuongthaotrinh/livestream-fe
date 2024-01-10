"use client";

import {createContext, useState, startTransition} from "react";
import {IAuthSignin, IAuthSignup, IDetailUser} from "@/lib/validation/users";
import {http} from "@/config/http";
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import React from "react";
import {jwtDecode} from "jwt-decode";
import useApiUsers from "@/_actions/users"
import {hasAdminRole} from "@/lib/helpers"

interface AuthContextType {
    auth: any | null;
    setAuth: React.Dispatch<React.SetStateAction<any>>;
    profile: any | null;
    setProfile: React.Dispatch<React.SetStateAction<any>>;
    isAdmin: boolean;
    signinAction: (body: IAuthSignin) => Promise<void>;
    signupAction: (body: IAuthSignup) => Promise<void>;
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

const intialContext = {
    auth: null,
    profile: null,
    isAdmin: false,
    setAuth: (auth: any) => {
        // Implement the setAuth function
    },
    setProfile: (profile: any) => {
        // Implement the setProfile function
    },
    signinAction: async (body: any) => {
        // Implement the signinAction function
    },
    signupAction: async (body: any) => {
        // Implement the signupAction function
    },
    setTrigger: () => {
        // Implement the setTrigger function
    }
}

const AuthContext = createContext<AuthContextType | null>(intialContext);
export default AuthContext;
const userApiUrl = {
    signup: 'user/register',
    signin: 'user/login',

}

export const AuthProvider = ({children}: any) => {
    const {getUser} = useApiUsers();
    const [auth, setAuth] = useLocalStorage<any | null>('auth', null);
    const [profile, setProfile] = useState<IDetailUser | null>(null);
    const [user, setUser] = useState<any | null>(null);
    const [isAdmin, setIsAdmin] = React.useState<boolean>(false)
    const [trigger, setTrigger] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (auth) {
            const decoded: any = jwtDecode(auth.token);
            setUser(decoded.user);
        }
    }, [auth])

    const fetchData = () => {
        (async () => {
            await getUser(Number(user?.id)).then((data) => {
                setProfile(data);
                setProfile(data);
                const isAdmin = hasAdminRole(data.role as any[]);
                setIsAdmin(isAdmin)
            })
        })
        ()

    }
    React.useEffect(() => {
        if (auth?.token && user?.id) fetchData();
        if (trigger) fetchData();
    }, [user, trigger]);


    async function signupAction(
        body: Omit<IAuthSignup, 'verifyPassword'>
    ) {
        await http.post(userApiUrl.signup, body);
    }


    async function signinAction(body: IAuthSignin): Promise<void> {
        const {data} = await http.post(userApiUrl.signin, body);
        if (data) {
            setAuth(data);
        }
    }

    return (
        <AuthContext.Provider
            value={{auth, setAuth, setProfile, isAdmin, profile, signinAction, setTrigger, signupAction}}>
            {children}
        </AuthContext.Provider>
    )
}

