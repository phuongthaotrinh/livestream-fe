
'use client';
import * as React from "react"
import {PageHeader} from "@/components/common/page-header";
import {ShellAction} from "@/components/common/shell-back";
import {useRouter} from "next/navigation";
import {Trash} from "lucide-react";
import {Form, Modal, Input, Button, Popconfirm} from "antd"
import useApiRoles from "@/_actions/roles"
import {useMounted} from "@/lib/hooks/use-mounted";
import {DataTableRaw} from "@/components/common/data-table/data-table-raw";
import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/common/ui/checkbox";
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header";
import Link from "next/link";
import {toast} from "react-hot-toast";
import {catchError} from "@/lib/helpers";

export function PermissionTemplate () {
    const router = useRouter();
    const {getAllPermisstion, createPermisstion} = useApiRoles();
    const [open, setOpen] = React.useState<boolean>(false);
    const [form] = Form.useForm();
    const [permissions, setPermissions]= React.useState<any[]>([]);
    const [trigger, setTrigger]= React.useState<boolean>(false);
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])
    const [isPending, startTransition] = React.useTransition();
    const mount = useMounted();

    const fetch = async () => {
        const {data} = await getAllPermisstion();
        setPermissions(data)
    }

    React.useEffect(() => {
        if(trigger || mount) fetch()
    },[trigger, mount])


    const deleteMany = () => {
        toast.error(`feature not enable, delete ${selectedRowIds.length} item`)
    }


    const columns = React.useMemo<ColumnDef<any, unknown>[]>(
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
                                prev.length === permissions.length ? [] : permissions.map((row) => row.id)
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
                cell: ({row}) => {
                    const id = row.original.id as string;
                    return (
                        <div className="lowercase truncate ">
                                {row.getValue("name")}
                        </div>
                    )
                },
            },
            {
                id: "action",
                cell: ({row}) => {
                    return (

                        <>
                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this task?"
                                    onConfirm={() => {
                                        toast.error(`feature not enable : ${row.original.id}`)
                                    }}
                                    okText="Yes"
                                    cancelText="No"
                                    okType="danger"
                                >
                                    <div className="flex items-center cursor-pointer">
                                        <Trash className="text-red-900 w-4 h-3 mr-2"/><p>Delete</p>
                                    </div>
                                </Popconfirm>
                        </>
                    )
                }

            },
        ],
        [isPending, permissions]
    )


    const onFinish = (value:any) => {
        startTransition(() => {
            toast.promise(createPermisstion(value),{
                error:(err) => catchError(err),
                loading:"Loading...",
                success:() => {
                    setTrigger(true);
                    setOpen(false);
                    return "create success"
                }
            })
        })
    }


    return (
        <>
         <div className="flex items-center justify-between">
             <PageHeader title="Manager permissions"  desc="Create, Update, Read all permissions"/>
               <div className="max-w-screen-sm">
                   <ShellAction actionName="Back" actionVoid={() => router.back()}  />
               </div>
         </div>
        <div className="space-y-3">
            <Modal open={open} onCancel={() => setOpen(false)} title="New permission" okType="dashed" footer={null}>
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                            <Form.Item label="Name" name="name">
                                 <Input placeholder="permission 1"/>
                            </Form.Item>
                        <Form.Item colon={true}>
                            <Button htmlType="submit" type="default">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
            </Modal>

            <DataTableRaw columns={columns}
                          data={permissions}
                          showToolbar={true}
                          deleteRowsAction={() => void deleteMany()}
                          searchableColumns={[
                              {
                                  id:"name",
                                  title:"name"
                              }
                          ]}
                          newRowAction={() => void setOpen(true)}
            />
        </div>
        </>
    )
}