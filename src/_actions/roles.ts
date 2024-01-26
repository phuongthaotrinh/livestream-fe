import useAxiosPrivate from "@/lib/hooks/useAxiosPrivate"
import {AxiosResponse} from 'axios';

const apiUrl = {
    //role
    create: 'role-per/add-role',
    getAll: 'role-per/get-all-role',
    edit : '',

    //permission
    createPermissions: 'role-per/add-per',
    getAllPermisstion: 'role-per/get-all-permission',

    assignRoleForPermission:'role-per/assign-role-for-per',
    getPermissionOfRole:'role-per/get-per-belong-to-role',


    //assign role for user
    assignRoleForUser: 'role-per/assign-role-for-user',
    getRoleOfUser: 'role-per/get-role-belong-to-user',
    deletePermission: 'role-per/delete-permission',
    unAssignRoleForUser:'role-per/remove-role-for-user',
}


const useApiRoles = () => {

    const axiosInstance = useAxiosPrivate();

    //Role
    const createRole = async (body: any) => {
        try {
            const response = await axiosInstance.post(apiUrl.create, body);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
    const updateRole = async (body: any) => {
        try {
            const response = await axiosInstance.patch(apiUrl.edit, body);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
    const getRoles = async (): Promise<any> => {
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

    //permisstion
    const createPermisstion = async (body: any) => {
        try {
            const response = await axiosInstance.post(apiUrl.createPermissions, body);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getAllPermisstion =  async (): Promise<any> => {
        try {
            const controller = new AbortController();
            const {signal} = controller;
            const timeoutId = setTimeout(() => {
                controller.abort();
            }, 3000);
            const response: AxiosResponse<any> = await axiosInstance.get(apiUrl.getAllPermisstion, {signal});
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


    // assign role for permissions
    const assignRoleForPermission = async (body: any) => {
        try {
            const response = await axiosInstance.post(apiUrl.assignRoleForPermission, body);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };


// get permission belong to role

    const getPermissionOfRole = async (payload: any) => {
        try {
            const response = await axiosInstance.get(`${apiUrl.getPermissionOfRole}/${payload?.id ? payload?.id:payload}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const assignRoleForUser = async (body: any) => {
        try {
            const response = await axiosInstance.post(apiUrl.assignRoleForUser, body);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const deletePer = async (payload: number) => {
        try {
            const response = await axiosInstance.delete(`${apiUrl.deletePermission}/${payload}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
    const unAssignRoleForUser = async (body: any) => {
        try {
            const response = await axiosInstance.put(apiUrl.unAssignRoleForUser, body);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
    return {
        createRole,
        getRoles,
        createPermisstion,
        getAllPermisstion,
        assignRoleForPermission,
        getPermissionOfRole,
        assignRoleForUser,
        deletePer,
        unAssignRoleForUser
    };
};

export default useApiRoles;