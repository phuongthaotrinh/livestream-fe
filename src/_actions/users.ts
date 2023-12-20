import useAxiosPrivate from "@/lib/hooks/useAxiosPrivate"
import axios, {AxiosResponse} from 'axios';
import {http} from '@/config/http'
const apiUrl = {
    //basic
    create: 'user/register',
    getAll: 'user/get-all',
    getOne: 'user/user-by-id',
    delete: 'user/user-delete',

    //group
    createUserToGroup: 'user/add-new-child',
    getAllMemberInGroup: 'user/get-all-member-in-group',
    removeMember: 'user/remove-member'
}


const useApiUsers = () => {
    const axiosInstance = useAxiosPrivate();

    const createUser = async (body: any) => {
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
            const response: AxiosResponse<any> = await http.get(apiUrl.getAll, {signal});
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

    //group
    const getAllMemberInGroup = async (payload: any) => {
        console.log('getAllMemberInGroup_groupID', payload)
        try {
            const response = await axiosInstance.get(`${apiUrl.getAllMemberInGroup}/${payload}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const createUserToGroup = async (body: any) => {
        console.log('createUserToGroup_userId', body)
        try {
            const response = await axiosInstance.post(apiUrl.createUserToGroup, body);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const removeMemberToGroup = async (payload: any) => {
        console.log("removeMemberToGroup_payload", payload)
        try {
            const response = await axiosInstance.delete(`${apiUrl.removeMember}/${payload.id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
    return {
        createUser,
        getUsers,
        deleteUser,
        getUser,
        getAllMemberInGroup,
        createUserToGroup
    };
};

export default useApiUsers;