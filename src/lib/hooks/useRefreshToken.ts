import {http} from '@/config/http';
import {useAuth} from "@/lib/hooks/use-auth";


const useRefreshToken = () => {
     const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await http.get('/refresh', {
            withCredentials: true
        });
        setAuth((prev:any) => {
            console.log(JSON.stringify(prev));
            console.log(response.data.token);
            return { ...prev, token: response.data.token }
        });
        return response.data.token;
    }
    return refresh;

};

export default useRefreshToken;