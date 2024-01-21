"use client"

import * as React from "react"
import Link from "next/link"
import {PlusCircle} from "lucide-react"
import {type ColumnDef} from "@tanstack/react-table"
import {toast} from "react-hot-toast";
import {catchError, formatDate} from "@/lib/helpers";
import {Modal, Tag} from "antd";
import {Checkbox} from "@/components/common/ui/checkbox"
import {DataTable} from "@/components/common/data-table"
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header"
import {ShellAction} from "@/components/common/shell-back";
import {ILiveStreamType, IPlatform, livesStreamTypeSchema} from "@/lib/validation/live-stream-type";
import {useValidation} from "@/lib/hooks/use-validation";
import useApiPlatform from "@/_actions/platforms";
import {PlatformForm} from "@/components/form/platform";
import {usePathname} from "next/navigation";
import  {toSentenceCase} from "@/lib/helpers"
interface IPLatformTableShell {
    data: IPlatform[]
    pageCount: number,
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

export function PLatformTableShell({
                                       data,
                                       pageCount,
                                       setTrigger
                                   }: IPLatformTableShell) {
    const [isPending, startTransition] = React.useTransition()
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])
    const [open, setOpen] = React.useState<boolean>(false);
    const [form, rule] = useValidation<ILiveStreamType>(livesStreamTypeSchema)
    const {createPlatform} = useApiPlatform()
    const pathname = usePathname();

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
                    <DataTableColumnHeader column={column} title="Name"/>
                ),
                cell: ({row}) => {
                    const id = row.original.id as number;
                    return (
                        <div className="truncate ">
                            <Link href={`${pathname}/${id}`}>

                                {row.getValue("name")}
                            </Link>
                        </div>
                    )
                },
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
                        <Tag color={row.getValue("status") == 'on' ? "#87d068" : '#f50'}>
                            {row.getValue("status") == 'on' ? "on" : 'off'}
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

        ],
        [data, isPending]
    )


    const onFinish = (values: any) => {
        values.name = toSentenceCase(values.name);
        startTransition(() => {
            toast.promise((createPlatform(values)),
                {
                    loading: "Creating...",
                    success: () => {
                        setOpen(false);
                        form.resetFields();
                        setTrigger(true);
                        return "Livestream type create successfully."
                    },
                    error: (err: unknown) => catchError(err),
                }
            )

        })
    }
    const deleteSelectedRows = () => {
        toast.error('feature not enable');
        setSelectedRowIds([])
    }
    return (
        <>
            <div className="flex flex-end  absolute right-[13rem] top-[5.5rem]">
                <ShellAction actionName="Create" icon={PlusCircle} type="action" actionVoid={() => setOpen(true)}/>
            </div>
            <Modal title="Create" footer={null} open={open} onCancel={() => {
                form.resetFields();
                setOpen(false)
            }}>
                <PlatformForm form={form} rule={rule} onFinish={onFinish} isPending={isPending}/>
            </Modal>
            <DataTable
                columns={columns}
                data={data}
                pageCount={pageCount}
                searchableColumns={[
                    {
                        id: "name",
                        title: "name",
                    },
                ]}
                newRowLink={undefined}
                deleteRowsAction={() => void deleteSelectedRows()}
            />
        </>
    )
}
