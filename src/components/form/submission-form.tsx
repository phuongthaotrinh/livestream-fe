'use client';

import * as React from "react";
import {PageHeader} from "@/components/common/page-header";
import {useRouter, useSearchParams} from "next/navigation";
import useIsomorphicLayoutEffect from "@/lib/hooks/use-isomorphic-layout-effect";
import useApiPlatform  from "@/_actions/platforms";
import {toast} from "react-hot-toast"
import {catchError, toSentenceCase} from "@/lib/helpers";
import {Form, Input, Space, InputNumber,Select,DatePicker} from "antd"
import {Button} from "@/components/common/ui/button";
import {useAuth} from "@/lib/hooks/use-auth";
import { Loader2 } from "lucide-react"
import FormSkeleton from "@/components/common/skeleton/form-skeleton";
import {ShellAction} from "@/components/common/shell-back";


const groupFied = (values:any) => {
    const field_data = [];

    for (const key in values) {
        if (values.hasOwnProperty(key)) {
            if ( key !== "field_id" &&
                key !== "form_field_id" &&
                key !== "form_id" &&
                key !== "user_id") {
                field_data.push({ name: key.replace("field_", ""), value: values[key] });
            }
        }
    }
    return JSON.parse(JSON.stringify(field_data,undefined,2))
}


const FormItemRow: React.FC<any> = ({

                                        dataIndex,
                                        title,
                                        name,
                                        index,
                                        children,
                                        inputType,
                                        ...restProps
                                    }) => {


    const getInputType = () => {
        if(inputType === "text" ||inputType ===  "url" || inputType === "email") return <Input count={{ show: true,  max:255 }}
                                               placeholder={`Enter ${name}`} required />
        if(inputType === "number") return <InputNumber  min="0"
                                                        style={{width:"100%"}}
                                                        placeholder={`Enter ${name}`} required />
        if(inputType === "password") return <Input.Password />
        if(inputType === "date") return  <DatePicker />
    }
    const getRule = () => {
        let rule =[]
        if(inputType === "email") {
            rule = [
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
            ]
        }
        else if (inputType === 'url') {
            rule = [{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]
        }
        else {
            rule=[
                {
                    required: true,
                    message: `Please Input ${title}!`,
                },
            ]
        }
        return rule

    }
    const rules = getRule() as any;

    return (
        <div {...restProps}>

            <Form.Item
                name={name}
                style={{margin: 0}}
                label={toSentenceCase(name)}
                rules={rules}
            >
                {getInputType()}
            </Form.Item>

        </div>
    );
};


export default function FSubmissionForm({params}:{params:{form_id:number}}) {
    const searchParams = useSearchParams();
    const [data, setData]  = React.useState<any>();
    const [fields, setFields]  = React.useState<any>();
    const [isPending, startTransition] = React.useTransition();
    const [type, setType] = React.useState<number>();
    const [form] = Form.useForm();
    const {getFormByLiveTypeId,createUserSubmissions} = useApiPlatform();
    const {profile} = useAuth()
    const router = useRouter();

    useIsomorphicLayoutEffect(() => {
        const type = JSON.parse(searchParams.get('type')!);
        setType(type)
    }, []);

    React.useEffect(() => {
        if(type) {
            startTransition(() => {
                toast.promise((getFormByLiveTypeId({
                    type:type,
                    formId:Number(params.form_id)
                })),{
                    loading: 'loading...',
                    success :({data}) => {
                        if(data)  {
                            setData(data)
                        }
                        return "success"
                    },
                    error:(err) => catchError(err)
                })
            })
        }
    },[type]);


    React.useEffect(() => {
        if(data) {
            const parseField = JSON?.parse(data['field_name']!)!;
            setFields(parseField)
        }
    },[data?.id]);

    const onFinish = async (values:any) => {
        values.user_id = Number(profile.user.id);
        values.form_id = Number(params.form_id);
        values.field_data = groupFied(values);
        values.form_field_id = Number(data?.form_field_id);
        values.field_id = Number(data?.id);
        startTransition(() => {
            toast.promise((createUserSubmissions(values)),{
                loading: "loading...",
                error:(err) =>catchError(err),
                success:() => {
                    form.resetFields();
                    return "create success"
                }
            })
        });
    }

    return (
        <>
            <div className="flex items-center justify-between w-full mb-7">
                <PageHeader title="create new submission " desc="New submission"/>
                <ShellAction actionName="Backd" type="link" actionVoid={() => router.back()} />
            </div>
            {isPending ? (
                <>
                    <FormSkeleton />
                </>
            ):(
                <Form form={form} onFinish={onFinish} layout="vertical" className="my-3">
                    <div className="space-y-5">
                        {fields && fields?.map((item:any, index:any) => {
                            const inputType  = item.field_data
                            return (
                                <FormItemRow key={index} name={item.field_name}  inputType={inputType} id={`field_${item.field_name}`}/>
                            )
                        })}
                        <Form.Item label="Platform" name="platform_ids">
                            <Select
                                mode="multiple"
                                size="middle"
                                placeholder="Please select platform to show"
                                style={{ width: '100%'}}
                                options={profile?.platforms?.map((item:any,index:number) => {
                                    return {
                                        key:index,
                                        label: item?.name,
                                        value:item?.id
                                    }
                                })}
                            />
                        </Form.Item>
                        <Form.Item colon={false} >
                            <Space>
                                <Button disabled={isPending}  type="submit" variant="default">
                                    {isPending ? (
                                        <>   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Please wait</>
                                    ): <p>Submit</p>}
                                </Button>
                                <Button disabled={isPending} onClick={() => form.resetFields()} type="button" variant="outline">
                                    {isPending ? (
                                        <>   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Please wait</>
                                    ): <p>Reset</p>}
                                </Button>
                            </Space>
                        </Form.Item>
                    </div>
                </Form>
            )}
        </>
    )
}