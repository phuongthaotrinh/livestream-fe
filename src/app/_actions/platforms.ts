import useAxiosPrivate from "@/lib/hooks/useAxiosPrivate"
import {AxiosResponse} from 'axios';
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import {useRouter} from "next/navigation";
import {useId} from "react"

const apiUrl = {
    //PlatformFileds
    createPlatformFileds: 'platform/add-field',
    getAllPlatformFileds: 'role-per/get-all-role',
}


const useApiPlatform = () => {
    const axiosInstance = useAxiosPrivate();
    const [platformFields, setPlatformFields] = useLocalStorage<any>('platformFields',[]);
    const router = useRouter()
    const createPlatformFileds = async (body: any) => {
        try {
            // const response = await axiosInstance.post(apiUrl.createPlatformFileds, body);
            // return response.data;

            setPlatformFields([...platformFields, body]);
            router.refresh()

        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const getPlatformFileds = async (): Promise<any> => {
        try {
            const controller = new AbortController();
            const {signal} = controller;
            const timeoutId = setTimeout(() => {
                controller.abort();
            }, 3000);
            // const response: AxiosResponse<any> = await axiosInstance.get(apiUrl.getAllPlatformFileds, {signal});
            // clearTimeout(timeoutId);
            // return response.data;
            return platformFields
        } catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError') {
                console.log('Request aborted');
            } else {
                console.error('Error fetching data:', error);
                throw error;
            }
        }
    };


    return {
        platformFields,
        createPlatformFileds,
        getPlatformFileds
    };
};

export default useApiPlatform;