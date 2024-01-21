import useAxiosPrivate from "@/lib/hooks/useAxiosPrivate"
import axios, {AxiosResponse} from 'axios';
import type {IDetailUser} from "@/lib/validation/users"
import {
    getUniqueRecordsByField, uniqueResult,
} from "@/lib/helpers";
import {useAuth} from "@/lib/hooks/use-auth";
import useApiPlatform from "@/_actions/platforms";

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
    const {getRegisteredPlatformByUserId} = useApiPlatform()
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
            let platforms:any = await getRegisteredPlatformByUserId(payload);
            if (roleResponse.data) {
                const results = await Promise.all(roleResponse.data.map(async (item: any) => {
                    if (item?.status === "on") {
                        const response = await axiosInstance.get(`${apiUrl.permissionOfUser}/${item?.role_id}`);
                        return response.data.data;
                    }
                    return null;
                }));
                const setResult = getUniqueRecordsByField(results, 'permission_id',"multi")
                permissions = [...setResult]
            }

            const data = {
                user: infoResponse.user,
                role: roleResponse.data,
                permissions: permissions,
                groups: groups,
                platforms:platforms?.data as any[],
                user_has_pl_id:platforms?.user_has_platform_id as any
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
        try {
            const response = await axiosInstance.post(`${apiUrl.removeMember}`, payload);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
    function findNonExistingRecords(arr1: any, arr2: any) {
        const nonExistingInArr2 = arr1.filter((item1: any) => !arr2.some((item2: any) => item2.id === item1.id));
        const nonExistingInArr1 = arr2.filter((item2: any) => !arr1.some((item1: any) => item1.id === item2.id));
        const result = [...nonExistingInArr1, ...nonExistingInArr2];
        return result
    }
    const userCanAddInGroupAndUserInGroup = async (payload: {id: number, groupId:number}) => {
        try {
            Promise.all([getUsers(), getAllMemberInGroup({user_id: payload.id, group_id: payload.groupId})])
                .then(([{data: users}, data]) => {
                    const userCanChoose = users?.filter((item: any) => item.id !== payload.id);
                    const listUser = findNonExistingRecords(userCanChoose, data?.childData ? data?.childData : [])
                    // console.log("listUser",listUser);
                    // console.log("data?.childData",data?.childData)

                   return {listUser, data}

                })
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
        removeMemberToGroup,
        userCanAddInGroupAndUserInGroup
    };
};


export default useApiUsers;