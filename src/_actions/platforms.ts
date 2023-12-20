import useAxiosPrivate from "@/lib/hooks/useAxiosPrivate"
import {AxiosResponse} from 'axios';
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import {useRouter} from "next/navigation";
import {useId} from "react"

const apiUrl = {
    //platform
    getAll: 'platform/get-all',
    create: 'platform/create',


    //live_stream_type
    createLiveStreamTypes: 'platform/add-live-stream-type',
    getAllLiveStreamTypes: 'platform/get-all-live-stream-type'
}


const useApiPlatform = () => {
    const axiosInstance = useAxiosPrivate();

    //platform
    const getAll = async (): Promise<any> => {
        try {
            const controller = new AbortController();
            const {signal} = controller;
            const timeoutId = setTimeout(() => {
                controller.abort();
            }, 3000);
            const response: AxiosResponse<any> = await axiosInstance.get(apiUrl.getAll, {signal});
            clearTimeout(timeoutId);
            return response.data;
        } catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError') {
                console.log('Request aborted');
            } else {
                console.error('Error fetching data:', error);
                throw error;
            }
        }
    };


    const createPlatform = async (body: any) => {
        try {
            const response = await axiosInstance.post(apiUrl.create, body);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };


//live_stream_type
    const getAllLiveStreamTypes = async (): Promise<any> => {
        try {
            const controller = new AbortController();
            const {signal} = controller;
            const timeoutId = setTimeout(() => {
                controller.abort();
            }, 3000);
            const response: AxiosResponse<any> = await axiosInstance.get(apiUrl.getAllLiveStreamTypes, {signal});
            clearTimeout(timeoutId);
            return response.data;
        } catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError') {
                console.log('Request aborted');
            } else {
                console.error('Error fetching data:', error);
                throw error;
            }
        }
    };

    const createLiveStreamTypes = async (body: any) => {
        try {
            const response = await axiosInstance.post(apiUrl.createLiveStreamTypes, body);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    return {
        getAll,
        createPlatform,
        createLiveStreamTypes,
        getAllLiveStreamTypes
    };
};

export default useApiPlatform;