"use client";

import * as React from "react";
import {Checkbox} from "@/components/common/ui/checkbox";
import {ColumnDef} from "@tanstack/react-table"
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header";
import {DataTableRaw} from "@/components/common/data-table/data-table-raw";
import {Tag,Modal} from "antd";
import {formatDate} from "@/lib/helpers";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/common/ui/dropdown-menu";
import {Button} from "@/components/common/ui/button";
import {MoreVertical} from "lucide-react";
import Link from "next/link";
import {toast} from "react-hot-toast";
import {usePathname} from "next/navigation";
import {groupSchema, IGroups} from "@/lib/validation/group";
import {useValidation} from "@/lib/hooks/use-validation";
import {GroupsForm} from "@/components/form/groups-form";
import {useApiAdditional} from "@/_actions/additional";

interface UserGroupsShellProps {
    data: any[];
    showCreateBtn:boolean,
    userId:number,
    setTrigger?: React.Dispatch<React.SetStateAction<boolean>>,
}

export function UserGroupsShell({data,showCreateBtn,userId,setTrigger}: UserGroupsShellProps) {
    const [isPending, startTransition] = React.useTransition()
    const pathname = usePathname()
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])
    const [open, setOpen] = React.useState<boolean>(false)
    const [form, rule] = useValidation(groupSchema);
    const {updateStateGroups} = useApiAdditional();
    const column = React.useMemo<ColumnDef<any, unknown>[]>(
        () => [
            {
                id: "select",
                header: ({table}) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => {
                            table.toggleAllPageRowsSelected(!!value);
                            setSelectedRowIds((prev) =>
                                prev.length === data.length ? [] : data.map((row) => row.id)
                            )
                        }}
                        aria-label="Select all"
                        className="translate-y-[2px]"
                    />
                ),
                cell: ({row}) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => {
                            row.toggleSelected(!!value)
                            setSelectedRowIds((prev) =>
                                value
                                    ? [...prev, row.original.id]
                                    : prev.filter((id) => id !== row.original.id)
                            )
                        }}
                        aria-label="Select row"
                        className="translate-y-[2px]"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: "name",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="name"/>
                ),
                cell: ({row}) => (
                    <div className="w-[80px]">
                        <Link href={`${pathname}/group/${row.original.id}`}>
                            {row.getValue("name")}
                        </Link>
                    </div>
                ),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: "status",
                header: ({column}) => {
                    return (
                        <DataTableColumnHeader column={column} title="status"/>
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                aria-label="Open menu"
                                variant="ghost"
                                // className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                            >
                                <MoreVertical className="h-4 w-4 text-black" aria-hidden="true"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuItem>
                                <Link
                                    href={`/admin/users/${row.original.id}`}
                                >
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuItem>
                                <Link href={`${pathname}/group/${row.original.id}`}>
                                    Watch
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
            },

        ],
        [data, isPending]
    );
    const onFinish = (values: IGroups) => {
        values.user_id = Number(userId);

        startTransition(() => {
            toast.promise((updateStateGroups(values)), {
                loading: 'Loading',
                success: () => {
                    setOpen(false);
                    form.resetFields();
                    setTrigger && setTrigger(true);
                    return "create group successfully"
                },
                error: 'errr'
            })
        })
        console.log("onFinish", values)
    }

    return (
        <>

            { showCreateBtn ?  (<DataTableRaw columns={column}
                             data={data}
                             searchableColumns={[
                                 {
                                     id:"name",
                                     title:"name"
                                 }
                             ]}
                             newRowAction={() => {
                                 if(showCreateBtn) setOpen(true);

                             }}
            /> ):(
                <DataTableRaw columns={column}
                              data={data}
                              searchableColumns={[
                                  {
                                      id:"name",
                                      title:"name"
                                  }
                              ]}
                />
            )}
            <Modal open={open} okType="dashed" footer={null}
                   onCancel={() => {
                       setOpen(false);
                       form.resetFields()
                   }}>
                <GroupsForm form={form} rule={rule} handleReset={() => {form.resetFields();}} onFinish={onFinish}
                            isPending={isPending}
                            formName="create_group"/>
            </Modal>

        </>
    )
}


