import useAxiosPrivate from "@/lib/hooks/useAxiosPrivate"
import axios, {AxiosResponse} from 'axios';
import type {IDetailUser} from "@/lib/validation/users"
import {
    getUniqueRecordsByField, uniqueResult,
} from "@/lib/helpers";
import {useAuth} from "@/lib/hooks/use-auth";

const apiUrl = {
    //basic
    create: 'user/register',
    getAll: 'user/get-all',
    getOne: 'user/user-by-id',
    delete: 'user/user-delete',
    updateProfile: 'user/update-profile',

    //group
    createUserToGroup: 'user/add-new-child',
    getAllMemberInGroup: 'user/get-all-member-in-group',
    removeMember: 'user/remove-member',


    //other:
    roleOfUser: 'role-per/get-role-belong-to-user',
    permissionOfUser: 'role-per/get-per-belong-to-role',
    yourGroup: 'additional/get-group'
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
    const yourGroups = async (payload: number) => {
        try {
            const {data} = await axiosInstance.get(apiUrl.yourGroup);
            const groups2 = data.data?.filter((item: any) => item['user_id'] === payload)
            return groups2

        } catch (error) {
            console.log('Request aborted');
        }
    }

    const getUser = async (payload: any): Promise<IDetailUser> => {
        try {
            const [{data: infoResponse}, {data: roleResponse}] = await Promise.all([
                axiosInstance.get(`${apiUrl.getOne}/${payload}`),
                axiosInstance.get(`${apiUrl.roleOfUser}/${payload}`),
            ]);
            let permissions: any[] = [];
            const groups: any[] = await yourGroups(Number(payload))

            if (roleResponse.data) {
                const results = await Promise.all(roleResponse.data.map(async (item: any) => {
                    if (item?.status === "on") {
                        const response = await axiosInstance.get(`${apiUrl.permissionOfUser}/${item?.role_id}`);
                        return response.data.data;
                    }
                    return null;
                }));
                const setResult = getUniqueRecordsByField(results, 'permission_id')
                permissions = [...setResult]
            }

            const data = {
                user: infoResponse.user,
                role: roleResponse.data,
                permissions: permissions,
                groups: groups
            } as IDetailUser

            return data;
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


    const updateProfile = async (payload: any): Promise<any> => {
        try {
            //promise all luôn cái re-assignRole
            const {data} = await axiosInstance.put(apiUrl.updateProfile, payload);
            return data;

        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };


    //group
    const getAllMemberInGroup = async (payload: { user_id: number, group_id: number }) => {
        try {
            const response = await axiosInstance.get(`${apiUrl.getAllMemberInGroup}/${payload.user_id}/${payload.group_id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const createUserToGroup = async (body: any) => {
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
            const response = await axiosInstance.delete(`${apiUrl.removeMember}`, payload);
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
        updateProfile,
        getAllMemberInGroup,
        createUserToGroup,
        removeMemberToGroup
    };
};


export default useApiUsers;