import useAxiosPrivate from "@/lib/hooks/useAxiosPrivate"
import {AxiosResponse} from 'axios';
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import {useRouter} from "next/navigation";
import {useId} from "react"
import {IListFormOfPlatform, ResponseData} from "@/lib/validation/live-stream-type";

const apiUrl = {
    //platform
    getAll: 'platform/get-all',
    create: 'platform/add-live-stream-platform',


    // //live_stream_type
    createLiveStreamTypes: 'platform/add-live-stream-type',


    //platform_fields
    createPlatformField: 'platform/add-field',
    getALlFormFields: 'platform/get-all-formsfields',

    ///types-has-platform,
    getAllTypesHasPlatform: 'platform/get-all-types-has-platform',

    //get-form
    getALlForm: '/platform/get-all-forms',

    //
    getALlFields: 'platform/get-all-fields',
    approveRegisteredPlatform:'platform/approve-registered-platform',
    getFormByLiveTypeId:'platform/get-form-field-by-live-type-id',

    createUserSubmissions:'platform/create-new-submiss',
    getAllFormsRegister:'platform/get-all-forms-register'

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
            return response.data as ResponseData;
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
        const {data: all} = await getAll();
        const data = all.liveStreamTypeData as any[];
        return data
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

    //PlatformField
    const createPlatformField = async (body: any) => {
        try {
            const response = await axiosInstance.post(apiUrl.createPlatformField, body);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const getAllTypeHasPlatform = async () => {
        try {
            const {data} = await axiosInstance.get(apiUrl.getAllTypesHasPlatform);
            return data
        } catch (e) {
            console.log('error', e)
        }
    }
    const getAllForms = async () => {
        try {
            const {data} = await axiosInstance.get(apiUrl.getALlForm);
            return data
        } catch (e) {
            console.log('error', e)
        }
    }
    const getALlFields = async () => {
        try {
            const {data} = await axiosInstance.get(apiUrl.getALlFields);
            return data
        } catch (e) {
            console.log('error', e)
        }
    }
    const getAllFormFields = async () => {
        try {
            const {data} = await axiosInstance.get(apiUrl.getALlFormFields);
            return data
        } catch (e) {
            console.log('error', e)
        }
    }
    const ListFormsOfPlatform = async (payload: number) => {
        try {
            let data: IListFormOfPlatform[] = []
            let res = await getAllTypeHasPlatform();
            const result = res?.data.filter((item: any) => item['platform_id'] === payload);
            if (result) {
                const {data: all} = await getAll();
                const newDtaa = result.map((res: any) => {
                    const platform_info = all?.liveStreamplatFormData?.find((item: any) => item['id'] == res['platform_id']);
                    const live_type_info = all?.liveStreamTypeData?.find((item: any) => item['id'] == res['live_type_id']);

                    return {
                        info: res,
                        platform_info: platform_info,
                        live_type_info: live_type_info
                    }
                });
                data = [...newDtaa] as IListFormOfPlatform[]
            }
            return data ? data : []
        } catch (e) {
            console.log('error', e)
        }
    }


    const getAllFormsOfPlatform = async (platformId: number) => {
        try {

            const {data: all} = await getAll();
            const {data: formss} = await getAllForms();
            const {data: allFormFields} = await getAllFormFields();
            const platform = all.liveStreamplatFormData.find((item: any) => item['id'] === platformId)
            const {data: typeshasPl} = await getAllTypeHasPlatform();
            const {data: fieldss} = await getALlFields();


            const liveTypes = all.liveStreamTypeData;
            const allForms = formss.filter((item: any) => item['platform_id'] === platformId);
            const typeHasPlatform = typeshasPl.filter((item: any) => item['platform_id'] === platformId)


            const type = liveTypes.map((i: any) => {
                const matchingType = typeHasPlatform.filter((j: any) => i['id'] === j['live_type_id'])[0];
                if (matchingType) {
                    return {...matchingType, data: i};
                }
                return null;
            }).filter((result: any) => result !== null);



            const output = allForms.map((form:any) => {
                const formFields = allFormFields.find((field:any) => field.form_id === form.id);
                const fieldsData = fieldss.find((fields:any) => fields.id === formFields.field_id);

                return {
                    ...form,
                    fields_raw: formFields,
                    fields_data: fieldsData,
                };
            });
            return {
                data:{
                    type:type,
                    form:output,
                    platform:platform

                }
            }



        } catch (e) {
            console.log('error', e)
        }
    }

    //approveRegisteredPlatform
    const approveRegisteredPlatform  = async (payload:any) => {
        try {
            const response = await axiosInstance.post(apiUrl.approveRegisteredPlatform, payload);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
    const getFormByLiveTypeId  =  async (payload:{type:number,formId:number }) => {
            const type = payload.type
            try {
                const {data} =await axiosInstance.get(`${apiUrl.getFormByLiveTypeId}/${type}}`);
                const forms = data.data?.find((item:any) => item.id == payload.formId);
                return {
                    data: {...forms, form_field_id: data.form_field_id[0]},
                }

            }catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
    }

     const createUserSubmissions = async (payload:any) => {
        try {
                const {data} = await axiosInstance.post(apiUrl.createUserSubmissions, payload);
                return data
        }catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
     }

    const getAllFormsRegister = async () => {
        try {
            const {data} = await axiosInstance.get(apiUrl.getAllFormsRegister);
            return data
        } catch (e) {
            console.log('error', e)
        }
    }

    return {
        getAll,
        createPlatform,
        createLiveStreamTypes,
        getAllLiveStreamTypes,
        createPlatformField,
        ListFormsOfPlatform,
        getAllFormsOfPlatform,
        getAllForms,
        approveRegisteredPlatform,
        getFormByLiveTypeId,
        createUserSubmissions,
        getAllFormsRegister
    }
};

export default useApiPlatform;