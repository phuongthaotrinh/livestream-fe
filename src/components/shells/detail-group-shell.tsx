import {Button, Modal, Space} from "antd";
import {PageHeader} from "@/components/common/page-header";
import {ShellAction} from "@/components/common/shell-back";
import {PlusCircle, Trash} from "lucide-react";
import React, {startTransition} from "react";
import {useRouter} from "next/navigation";
import {IUsers} from "@/lib/validation/users";
import useApiUsers from "@/_actions/users";
import {toast} from "react-hot-toast";
import {catchError} from "@/lib/helpers";
import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/common/ui/checkbox";
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header";
import {fallbackImg} from "@/lib/constants/fallbackImg";
import Link from "next/link";
import {DataTableRaw} from "@/components/common/data-table/data-table-raw";


type IListMember = {
    data: any[],
    selectedRowIds: number[],
    setSelectedRowIds: React.Dispatch<React.SetStateAction<number[]>>,
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>,
    addMember?: () => void,
    removeMember?: () => void,
    name: 'list' | 'create',
    params: any,
    isPreview:boolean
}


const ListMember = ({data, selectedRowIds, setSelectedRowIds, addMember, name,removeMember,isPreview}: IListMember) => {
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

        ],
        [data, selectedRowIds]
    )

    return (
        <div className="space-y-4">
            {name == "create" ? (
                <>
                    <DataTableRaw columns={columns} data={data}
                                  searchableColumns={[
                                      {
                                          id:"name",
                                          title:"name"
                                      }
                                  ]}
                                  newRowAction={addMember}
                    />
                </>
            ):(
                <>
                    {!isPreview && (
                    <DataTableRaw columns={columns} data={data}
                                  searchableColumns={[
                                      {
                                          id:"name",
                                          title:"name"
                                      }
                                  ]}
                                  deleteRowsAction={removeMember}
                    />)}
                </>
            )}
        </div>
    )
};

function findNonExistingRecords(arr1: any, arr2: any) {
    const nonExistingInArr2 =  arr1.filter((item1: any) => !arr2.some((item2: any) => item2.id === item1.id));
    const nonExistingInArr1 =  arr2.filter((item2: any) => !arr1.some((item1: any) => item1.id === item2.id));
    return [...nonExistingInArr1, ...nonExistingInArr2]
}
interface IParams {
    params:{
        id: number,
        groupId: number
    },
    isPreview:boolean
}
export default function DetailGroupShell ({params,isPreview}:IParams) {
    const router = useRouter();
    const [open, setOpen] = React.useState<boolean>(false);
    const [data, setData] = React.useState<IUsers[]>([]);
    const [usersInGroup, setUsersInGroup] = React.useState<any[]>([])
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])
    const {getUsers, createUserToGroup, getAllMemberInGroup, removeMemberToGroup, userCanAddInGroupAndUserInGroup} = useApiUsers()
    const [trigger, setTrigger] = React.useState<boolean>(false);

    const loadData =  () => {
        startTransition(() => {
            toast.promise(( Promise.all([getUsers(), getAllMemberInGroup({user_id: Number(params.id), group_id: Number(params.groupId)})])
            ),{
                loading:"Loading...",
                success:(res) => {
                    const userCanChoose = res?.[0]?.data?.filter((item: any) => item.id !== Number(params.id));
                    const userInGroup = res?.[1]?.childData;
                    const listUser = findNonExistingRecords(userCanChoose, userInGroup)
                    setData(listUser);
                    setUsersInGroup(userInGroup)
                    return "Get data success"
                }, error:(err) => catchError(err)
            })
        })
    };
    React.useEffect(() => {
        loadData()
    },[]);

    React.useEffect(() => {
        if(trigger) loadData()
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
                    setTrigger(true);
                    return catchError(err)
                },
            }
        )
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
                    setTrigger(true);
                    setSelectedRowIds([]);
                    return "Remove members successfully."
                },
                error: (err: unknown) => {
                    setSelectedRowIds([])
                    return catchError(err)
                },
            }
        )
    }
    return (
        <>
            <Space className={"flex items-center justify-between my-7"}>
                <PageHeader title="Your groups" desc="watch user "/>
                <ShellAction type="action" actionVoid={() => router.back()} actionName="Back"/>
            </Space>
            <div className="space-y-4">
                {!isPreview && (
                    <section className="add_new_mem_section relative">
                       <div className="absolute top-[0.2rem] left-[35vw]">
                        <ShellAction icon={PlusCircle} type="action" actionVoid={() => setOpen(true)}
                                     actionName="Choose user"
                        />
                    </div>
                        <Modal open={open}
                               onCancel={() => {
                                   setOpen(false);
                                   setSelectedRowIds([]);
                               }}
                               okType="dashed"
                               footer={null}
                        >
                            <ListMember selectedRowIds={selectedRowIds} setSelectedRowIds={setSelectedRowIds}
                                        data={data}
                                        addMember={() => void addMember()}
                                        name="create"
                                        params={params}
                                        setTrigger={setTrigger}
                                        isPreview={isPreview}
                            />
                        </Modal>
                    </section>
                )}
            </div>

            <ListMember data={usersInGroup} selectedRowIds={selectedRowIds}
                        setSelectedRowIds={setSelectedRowIds} name="list"
                        params={params}
                        setTrigger={setTrigger}
                        removeMember={() => void removeMember()}
                        isPreview={isPreview}

            />
        </>
    )
}
