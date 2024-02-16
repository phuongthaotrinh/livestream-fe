import useAxiosPrivate from "@/lib/hooks/useAxiosPrivate"
import {AxiosResponse} from 'axios';
import useApiUsers from "@/_actions/users";

const apiUrl = {
    //slider
    create: 'additional/add-bulk-slide',
    getAll: 'additional/get-all-slide',

    //news
    updateStateNews: 'additional/add-or-update-news',
    getAllNews: 'additional/get-all-news',

    //group
    updateStateGroup: 'additional/add-or-uodate-group',
    getGroups: 'additional/get-group',
    getGroup: 'additional/get-group',

    // import-excel
    importExcel:'additional/import-excel'
}


export const useApiAdditional = () => {
    const axiosInstance = useAxiosPrivate();
    const {getUser, getUsers, getAllMemberInGroup} = useApiUsers()
    //slider
    const createSliders = async (body: any) => {
        try {
            const response = await axiosInstance.post(apiUrl.create, body);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
    const getSliders = async (): Promise<any> => {
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

    //news
    const updateStateNews = async (body: any) => {
        try {
            const response = await axiosInstance.post(apiUrl.updateStateNews, body);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
    const getNews = async (): Promise<any> => {
        try {
            const controller = new AbortController();
            const {signal} = controller;
            const timeoutId = setTimeout(() => {
                controller.abort();
            }, 3000);
            const response: AxiosResponse<any> = await axiosInstance.get(apiUrl.getAllNews, {signal});
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

    // groups
    const updateStateGroups = async (body: any) => {
        try {
            const response = await axiosInstance.post(apiUrl.updateStateGroup, body);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
    const getGroups = async (): Promise<any> => {
        try {
            const controller = new AbortController();
            const {signal} = controller;
            const timeoutId = setTimeout(() => {
                controller.abort();
            }, 3000);
            const response: AxiosResponse<any> = await axiosInstance.get(apiUrl.getGroups, {signal});
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

    const getGroup = async (payload: number): Promise<any> => {
        console.log('getGroup_payload', payload)
        const {data: allGroups} = await getGroups();
         const group = allGroups?.find((item: any) => item.id == Number(payload));
        let data: any = {
            group: {},
            user: {},
            members: [],
        }

        data.group = [];
        data.user = []

        return data
    }

    const importExcel = async (body: any) => {
        try {
            const response = await axiosInstance.post(apiUrl.importExcel, body);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }


    return {
        createSliders,
        getSliders,
        updateStateNews,
        getNews,
        updateStateGroups,
        getGroups,
        getGroup,
        importExcel
    };
};
// export default useApiAdditional;