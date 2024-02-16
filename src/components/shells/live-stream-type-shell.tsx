'use client';

import {DataTableRaw} from "@/components/common/data-table/data-table-raw";
import * as React from "react";
import {ColumnDef} from "@tanstack/react-table";
import { Modal, Card} from "antd";
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header";
import Link from "next/link";
import {catchError, formatDate,toSentenceCase} from "@/lib/helpers";
import {PlusCircle} from "lucide-react";
import {ShellAction} from "@/components/common/shell-back";
import {LiveStreamTypeForm} from "@/components/form/live-stream-type-form";
import {useValidation} from "@/lib/hooks/use-validation";
import {ILiveStreamType, livesStreamTypeSchema} from "@/lib/validation/live-stream-type";
import useApiPlatform from "@/_actions/platforms";
import {toast} from "react-hot-toast";
import {Checkbox} from "@/components/common/ui/checkbox"
import {usePlatform} from "@/lib/hooks/use-platform";


export function LiveStreamTypeShell() {
    const {liveStreamTypeData:data, setTrigger} = usePlatform()

    const [isPending, startTransition] = React.useTransition()
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])
    const [open, setOpen] = React.useState<boolean>(false);
    const [form, rule] = useValidation<ILiveStreamType>(livesStreamTypeSchema)
    const {createLiveStreamTypes} = useApiPlatform()


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
                    <DataTableColumnHeader column={column} title="name"/>
                ),
                cell: ({row}) => {
                    const id = row.original.id as string;
                    return (
                        <div className="truncate ">
                                {row.getValue("name")}
                        </div>
                    )
                },
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
        [data]
    )
    const onFinish = (values: ILiveStreamType) => {
        values.name=toSentenceCase(values.name);
        startTransition(() => {
            toast.promise((createLiveStreamTypes(values)),
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

    return (
        <Card>
                <Modal title="Create" footer={null} open={open} onCancel={() => {
                    form.resetFields();
                    setOpen(false)
                }}>
                    <LiveStreamTypeForm form={form} rule={rule} onFinish={onFinish} isPending={isPending}/>
                </Modal>
            <DataTableRaw data={data}
                          columns={columns}
                          searchableColumns={[
                              {
                                  id: "name",
                                  title: "name",
                              },
                          ]}
                          newRowAction={() => setOpen(true)}/>
        </Card>
    )
}