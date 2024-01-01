'use client'

import {PageHeader} from "@/components/common/page-header";
import {ShellAction} from "@/components/common/shell-back";
import {Space, Modal, Button, Popconfirm} from 'antd';
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {PlusCircle, Trash} from "lucide-react";
import {DataTableRaw} from "@/components/common/data-table/data-table-raw";
import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/common/ui/checkbox";
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header";
import Link from "next/link";
import {fallbackImg} from "@/lib/constants/fallbackImg";
import useApiUsers from "@/_actions/users";
import {IUsers} from "@/lib/validation/users";
import {toast} from "react-hot-toast";
import {catchError} from "@/lib/helpers";

interface IParams extends React.PropsWithChildren {
    params: {
        id: number,
        groupId: number
    }
}

function findNonExistingRecords(arr1: any, arr2: any) {
    const nonExistingInArr2 = arr1.filter((item1: any) => !arr2.some((item2: any) => item2.id === item1.id));
    const nonExistingInArr1 = arr2.filter((item2: any) => !arr1.some((item1: any) => item1.id === item2.id));
    const result = [...nonExistingInArr1, ...nonExistingInArr2];
    return result
}

export default function AdminGroupDetail({params}: IParams) {
    const router = useRouter();
    const [open, setOpen] = React.useState<boolean>(false);
    const [data, setData] = React.useState<IUsers[]>([]);
    const [usersInGroup, setUsersInGroup] = React.useState<any[]>([])
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])
    const {getUsers, createUserToGroup, getAllMemberInGroup, removeMemberToGroup} = useApiUsers()
    const [trigger, setTrigger] = React.useState<boolean>(false);

    const loadData = () => {
        Promise.all([getUsers(), getAllMemberInGroup({user_id: Number(params.id), group_id: Number(params.groupId)})])
            .then(([{data: users}, data]) => {
                const userCanChoose = users?.filter((item: any) => item.id !== Number(params.id));
                const listUser = findNonExistingRecords(userCanChoose, data?.childData ? data?.childData : [])
                setData(listUser);
                setUsersInGroup(data?.childData ? data?.childData : [])
            })
    };

    useEffect(() => {
        loadData();
        if (trigger) loadData()
    }, [trigger]);


    const addMember = () => {
        toast.promise(
            Promise.all(
                selectedRowIds.map((id) =>
                    createUserToGroup({
                        group_id: Number(params.groupId),
                        parent_id: Number(params.id),
                        child_id: id
                    })
                )
            ),
            {
                loading: "Add members...",
                success: () => {
                    setSelectedRowIds([]);
                    setOpen(false);
                    setTrigger(true);
                    return `Add members in group ${params.groupId} successfully.`
                },
                error: (err: unknown) => {
                    setSelectedRowIds([]);
                    setOpen(false);
                    return catchError(err)
                },
            }
        )
    }


    return (
        <>
            <Space className={"flex items-center justify-between"}>
                <PageHeader title="Your groups" desc="watch user "/>
                <ShellAction type="action" actionVoid={() => router.back()} actionName="Back"/>
            </Space>
            <div className="space-y-4">
                <section className="add_new_mem_section">
                    <ShellAction icon={PlusCircle} type="action" actionVoid={() => setOpen(true)}
                                 actionName="Choose user"
                    />
                    <Modal width="70vw" open={open}
                           onCancel={() => {
                               setOpen(false);
                               setSelectedRowIds([]);
                           }}
                           okType="dashed"
                           footer={null}>
                        <ListMember selectedRowIds={selectedRowIds} setSelectedRowIds={setSelectedRowIds}
                                    data={data}
                                    addMember={() => void addMember()}
                                    name="create"
                                    params={params}
                        />
                    </Modal>
                </section>
            </div>

            <ListMember data={usersInGroup} selectedRowIds={selectedRowIds}
                        setSelectedRowIds={setSelectedRowIds} name="list"
                        params={params}

            />
        </>
    )
}


type IListMember = {
    data: any[],
    selectedRowIds: number[],
    setSelectedRowIds: React.Dispatch<React.SetStateAction<number[]>>,
    addMember?: () => void,
    name: 'list' | 'create',
    params: any
}


const ListMember = ({data, selectedRowIds, setSelectedRowIds, addMember, name, params}: IListMember) => {
    const [isPending, startTransition] = React.useTransition();
    const {getUsers, createUserToGroup, getAllMemberInGroup, removeMemberToGroup} = useApiUsers()

    const confirm = (id: any) => {
        toast(`delte member with id ${id}`,);
        startTransition(() => {
            toast.promise((removeMemberToGroup({
                    parent_id: Number(params.id), child_id: Number(id)
                })),
                {
                    loading: "Loading...",
                    success: (data) => {
                        setSelectedRowIds([])
                        return "Remove members successfully."
                    },
                    error: (err: unknown) => {
                        setSelectedRowIds([]);
                        return catchError(err)
                    },
                }
            )
        })

    }

    const removeMember = () => {
        toast.promise(
            Promise.all(
                selectedRowIds.map((id) =>
                    removeMemberToGroup({
                        parent_id: Number(params.id),
                        child_id: Number(id)
                    })
                )
            ),
            {
                loading: "Deleting...",
                success: () => {
                    setSelectedRowIds([])
                    return "Remove members successfully."
                },
                error: (err: unknown) => {
                    setSelectedRowIds([])
                    return catchError(err)
                },
            }
        )
    }
    const columns = React.useMemo<ColumnDef<any, unknown>[]>(
        () => [
            {
                id: "select",
                header: ({table}) => {
                    const isCheck = table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
                    return (
                        <Checkbox
                            checked={selectedRowIds.length > 0 ? isCheck : false}
                            onCheckedChange={(value) => {
                                table.toggleAllPageRowsSelected(!!value);
                                setSelectedRowIds && setSelectedRowIds((prev: any) =>
                                    prev.length === data.length ? [] : data.map((row: any) => row.id)
                                )
                            }}
                            aria-label="Select all"
                            className="translate-y-[2px]"
                        />
                    )
                },
                cell: ({row}) => {
                    const isCheck = row.getIsSelected()
                    return (
                        <Checkbox
                            checked={selectedRowIds.length > 0 ? isCheck : false}
                            onCheckedChange={(value) => {
                                row.toggleSelected(!!value)
                                setSelectedRowIds && setSelectedRowIds((prev) =>
                                    value
                                        ? [...prev, row.original.id]
                                        : prev.filter((id) => id !== row.original.id))
                            }}
                            aria-label="Select row"
                            className="translate-y-[2px]"
                        />
                    )
                },
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: "image",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Image"/>

                ),
                cell: ({row}) => {
                    return (
                        <img src={fallbackImg}
                             className="w-12 h-12"
                             alt=""
                        />
                    )
                },
            },
            {
                accessorKey: "name",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="name"/>

                ),
                cell: ({row}) => {
                    const id = row.original.id as string;
                    return (
                        <div className="lowercase truncate ">
                            <Link href={`/admin/users/${id}`}>
                                {row.getValue("name")}
                            </Link>
                        </div>
                    )
                },
            },
            {
                accessorKey: "fullName",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="fullName"/>
                ),
                cell: ({row}) =>
                    <div>{row.getValue("fullName")}</div>,
            },
            {
                accessorKey: "email",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="email"/>
                ),
                cell: ({row}) =>
                    <div>{row.getValue("email")}</div>,
            },
            {
                id: "action",
                cell: ({row}) => {
                    return (

                        <>
                            {name == "list" && (

                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this task?"
                                    onConfirm={() => confirm(row.original.id)}
                                    okText="Yes"
                                    cancelText="No"
                                    okType="dashed"
                                >
                                    <div className="flex items-center cursor-pointer">
                                        <Trash className="text-red-900 w-4 h-3 mr-2"/><p>Remove user</p>
                                    </div>
                                </Popconfirm>

                            )}
                        </>
                    )
                }

            },


        ],
        [data, selectedRowIds]
    )

    return (
        <div className="space-y-4">

            {selectedRowIds && selectedRowIds.length > 0 && (
                <>
                    {name == "create" ? (
                        <Button size="small" onClick={addMember} type="dashed" className="flex items-center">
                            <PlusCircle className="w-4 h-4 mr-2"/>
                            <span>Add</span>
                        </Button>
                    ) : (
                        <Button size="small" onClick={removeMember} type="dashed"
                                className="flex items-center my-3">
                            <Trash className="w-4 h-4 mr-2"/>
                            <span>Remove</span>
                        </Button>

                    )}

                </>
            )}

            <div className="my-4"></div>
            <DataTableRaw columns={columns} data={data} showToolbar={false}/>
        </div>
    )
};

