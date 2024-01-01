'use client';

import {PageHeader} from "@/components/common/page-header";
import * as React from "react";
import useApiRoles from "@/_actions/roles";
import {Space,Tag, Modal,Select} from 'antd';
import {PlusCircle} from "lucide-react";
import {toast} from "react-hot-toast";
import {catchError, formatDate, uniqueResult} from "@/lib/helpers";
import {useEffect} from "react";
import {ShellAction} from "@/components/common/shell-back";
import {DataTableRaw} from "@/components/common/data-table/data-table-raw";
import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/common/ui/checkbox";
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header";

interface IEditPromissionForRole extends React.PropsWithChildren {
    params: {
        roleId: string
    }
}
type IPerName = {
    permission:{
        name:string,
        id: number
    }
}
export default function EditPromissionForRole({
                                                  params,
                                              }: IEditPromissionForRole) {

    const [isPending, startTransition] = React.useTransition()
    const {getAllPermisstion, getPermissionOfRole, getRoles, assignRoleForPermission} = useApiRoles();
    const [allPer, setAllPer] = React.useState<any[]>([])
    const [permissionsOfRole, setPermissionsOfRole] = React.useState<any[]>([])
    const [roleName, setRoleName] = React.useState<any>()
    const [open, setOpen] = React.useState<boolean>(false)
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

    const fetchData = React.useCallback(() => {
        (async () => {
            await Promise.all(
                [
                    getPermissionOfRole(params.roleId),
                    getRoles(),
                    getAllPermisstion()
                ]
            )
                .then(([{data: permissionOfRole}, {data: roles}, {data: allPermissions}]) => {
                    const role = roles.find((item: any) => item?.id == params.roleId);
                    setRoleName(role);
                    setPermissionsOfRole(permissionOfRole);
                    const response = uniqueResult(allPermissions, permissionOfRole, 'id', 'permission_id')
                    if (response) setAllPer(response)
                })
        })()
    }, [params.roleId]);

    useEffect(() => {
        fetchData()
    }, [params.roleId]);

    // @ts-ignore
    const column = React.useMemo<ColumnDef<any, unknown>[]>(
        () =>[

            {
                id: "select",
                header: ({ table }) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                        className="translate-y-[2px]"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                        className="translate-y-[2px]"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: "id",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="id"/>
                ),
                cell: ({row}) => <div className="w-[20px]">{row.getValue("id")}</div>,
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: "permission",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="name"/>
                ),

                cell: ({row}) => {
                    const name = row.getValue("permission") && row.getValue("permission") as IPerName as any;
                    return (
                        <div className="w-[80px]">{name.name}</div>
                    )
                },
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: "status",
                header: ({column}) => {
                    return (
                        <DataTableColumnHeader column={column} title="status" />
                    )
                },
                cell: ({row}) =>
                    <div>
                        <Tag color={row.getValue("status") === "on" ? "#87d068" : '#f50'}>
                            {row.getValue("status") === "on" ? "active" : 'block'}
                        </Tag>
                    </div>,
            },
            {
                accessorKey: "createdAt",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Created At"/>
                ),
                cell: ({cell}) => formatDate(cell.getValue() as Date),
                enableColumnFilter: false,
            },
            {
                accessorKey: "updatedAt",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="updated At"/>
                ),
                cell: ({cell}) => formatDate(cell.getValue() as Date),
                enableColumnFilter: false,
            },
            {
                id: "actions",
                cell: ({row}) => (
                    <>



                    </>
                ),
            },

        ],
        [permissionsOfRole, isPending]
    )


    const handleOk = () => {
        const output = allPer.filter((item: any) => selectedItems.includes(item.id));
        const payload = [
            {
                roles: roleName,
                permissions: output
            }
        ]
        console.log('payload', payload)
        startTransition(() => {
            toast.promise((assignRoleForPermission(payload)),
                {
                    loading: "loading...",
                    success: (payload: any) => {
                        setOpen(false);
                        setSelectedItems([]);
                        fetchData();
                        return 'Assign permissions success'
                    },
                    error: (err: unknown) => catchError(err),
                }
            )
        })
    };
    const permissionCount = `${permissionsOfRole.length}/${Number(permissionsOfRole.length) + Number(allPer.length)}`
    return (
        <>
            <Space className={"flex items-center justify-between"}>
                <PageHeader title={`Permissions (${permissionCount})`}
                            desc={`Role: ${roleName?.name}`}
                />
                <ShellAction href="/admin/roles" actionName="Back"/>
            </Space>
            <div className="container space-y-6">
                <ShellAction actionName="Assign new permissions" icon={PlusCircle}
                             actionVoid={() => setOpen(true)}/>
                <Modal title="list permissions"
                       open={open}
                       onOk={handleOk}
                       okText={<p className="text-black">OK</p>}
                       onCancel={() => {
                           setOpen(false);
                           setSelectedItems([])
                       }}>
                    <Select
                        mode="multiple"
                        showSearch
                        style={{width: '100%'}}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        onChange={setSelectedItems}
                        value={selectedItems}
                        options={allPer?.map((item: any, index) => {
                            return {
                                label: item?.name,
                                key: index,
                                value: item?.id
                            }
                        })}
                    />

                </Modal>
                <DataTableRaw columns={column} data={permissionsOfRole} showToolbar={true}/>
            </div>

        </>
    )
}