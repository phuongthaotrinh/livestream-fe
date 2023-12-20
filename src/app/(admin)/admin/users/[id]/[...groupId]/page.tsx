'use client';

import React from 'react';
import {usePathname} from "next/navigation"
import {Avatar, Form, Space, Table} from "antd"
import {catchError, useGetLastPath} from "@/lib/helpers";
import {PageHeader} from "@/components/common/page-header";
import {buttonVariants} from "@/components/common/ui/button"
import {PlusCircle, Trash} from "lucide-react"
import clsx from "clsx";
import {CreateUserFromGroup} from "@/components/admin/users/create-user-to-group";
import useApiUsers from "@/_actions/users";
import {fallbackImg} from "@/lib/constants/fallbackImg";
import {toast} from "react-hot-toast";


export default function UserGroupPage() {

    const [group, setGroup] = React.useState(useGetLastPath());
    //data user who admin can add to group
    const [dataEnable, setDataEnable] = React.useState([]);

    const [isPending, startTransition] = React.useTransition();
    const [open, setOpen] = React.useState(false);
    const [form] = Form.useForm();
    const {getUsers, getAllMemberInGroup, } = useApiUsers();

    React.useEffect(() => {
        startTransition(() => {
            const fetchData = async () => {
                try {
                    const {data} = await getUsers();
                    setDataEnable(data);
                } catch (error) {
                    console.error('Error in fetching roles:', error);
                }
            };
            fetchData();
        });
    }, []);



    const onCancel = () => {
        setOpen(false);
        form.resetFields()
    }

    const onCreate = ({users}:any) => {
        const fields = dataEnable && dataEnable?.filter((item: any) => users.includes(item.id));
        console.log('add to group', fields);
    }



    const renderColumns = React.useMemo(() => {
        return [
            {
                title: 'Images',
                dataIndex: 'images',
                key: 'images',
                render: (text:any) => <img className="w-12 h-12" src={text ? text : fallbackImg}/>,
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (text:any) => <a>{text}</a>,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                render: (text:any) => <a>{text}</a>,
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: 'Action',
                key: 'action',
                render: (_:any, record:any) => (
                    <Space size="middle">

                        <button
                            className="flex items-center gap-2"
                            onClick={() => {
                                const id  = record.id as string
                                console.log('record dele', record)
                                startTransition(() => {

                                    // @ts-ignore
                                    toast.promise((deleteUserInGroupFn({id: row.original.id})),
                                        {
                                            loading: "Deleting...",
                                            success: () => "Product deleted successfully.",
                                            error: (err: unknown) => catchError(err),
                                        }
                                    )

                                })
                            }}
                            disabled={isPending}
                        >
                            <div
                                className={clsx(
                                    buttonVariants({
                                        variant: "outline",
                                        size: "sm",
                                        className: "h-8",
                                    })
                                )}
                            >
                                <Trash className="mr-2 h-4 w-4" aria-hidden="true"/>
                            </div>
                        </button>
                    </Space>
                ),
            },
        ]
    },[dataEnable, isPending]);

    // change dataEnable = data after startTransition get user of groups
    const dataSource = dataEnable && dataEnable.map((item:any, index) => {
        return {
            key: index,
            name: item.name,
            email: item.email,
            address:item.address || "NAN",
            images:item.images
        }
    });



       return (
           <div className="">
               <PageHeader title="Users-groups" desc="watch your group "/>
               <div className={"my-6 flex items-center justify-end"}>
                   <button
                       className="flex items-center gap-2"
                       onClick={() => {
                           setOpen(true);
                       }}
                   >
                       <div
                           className={clsx(
                               buttonVariants({
                                   variant: "outline",
                                   size: "sm",
                                   className: "h-8",
                               })
                           )}
                       >
                           <PlusCircle className="mr-2 h-4 w-4" aria-hidden="true"/>
                          Add to {group}
                       </div>
                   </button>

                   <CreateUserFromGroup
                       pending={isPending}
                       form={form}
                       onCreate={onCreate}
                       open={open}
                       onCancel={onCancel}
                       data={dataEnable}
                   />


               </div>
               <div>
                   <Table columns={renderColumns} dataSource={dataSource}/>
               </div>
           </div>
       )

}
  