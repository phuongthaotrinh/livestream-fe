
import  {AxiosResponse} from 'axios';
import {useEffect} from 'react';
import useRefreshToken from './useRefreshToken';
import {useAuth} from '@/lib/hooks/use-auth';
import { httpAuth } from "@/config/httpAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const {auth} = useAuth();

    useEffect(() => {
        // Check if we are on the client-side before using useEffect
        if (typeof window !== 'undefined') {
            if(auth) {
                const token = auth.token
                const requestIntercept = httpAuth.interceptors.request.use(
                    config => {
                        if (!config.headers['Authorization']) {
                            config.headers['Authorization'] = `Bearer ${token}`;
                        }
                        return config;
                    }, (error) => Promise.reject(error)
                );

                const responseIntercept = httpAuth.interceptors.response.use(
                    (response: AxiosResponse) => response,
                    async (error) => {
                        const prevRequest = error?.config;
                        if (error?.response?.status === 403 && !prevRequest?.sent) {
                            prevRequest.sent = true;
                            const newAccessToken = await refresh();
                            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                            return httpAuth(prevRequest);
                        }
                        return Promise.reject(error);
                    }
                );


            return () => {
                httpAuth.interceptors.request.eject(requestIntercept);
                httpAuth.interceptors.response.eject(responseIntercept);
            };
        } }
    }, [auth, refresh]);

    return httpAuth;
};

export default useAxiosPrivate;
