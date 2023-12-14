import useAxiosPrivate from "@/lib/hooks/useAxiosPrivate"
import {AxiosResponse} from 'axios';

const apiUrl = {
    create: 'role-per/add-role',
    getAll: 'user/get-all',
    getOne: 'user/user-by-id',
    delete: 'user/user-delete'
}


const useApiUsers = () => {
    const axiosInstance = useAxiosPrivate();

    const createRole = async (body: any) => {
        try {
            const response = await axiosInstance.post(apiUrl.create, body);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
    const deleteUser = async (payload: any) => {
        console.log(payload)
        try {
            const response = await axiosInstance.delete(`${apiUrl.delete}/${payload.id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
    const getUser = async (payload: any) => {
        console.log(payload)
        try {
            const response = await axiosInstance.get(`${apiUrl.getOne}/${payload}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };


    const getUsers = async (): Promise<any> => {
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


    return {
        createRole,
        getUsers,
        deleteUser,
        getUser
    };
};

export default useApiUsers;