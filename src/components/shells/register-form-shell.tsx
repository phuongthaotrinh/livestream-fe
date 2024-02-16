import * as React from "react";
import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/common/ui/checkbox";
import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header";
import Link from "next/link";
import {Popconfirm, Space, Tag,Skeleton} from "antd";
import {Button} from "@/components/common/ui/button";
import {toast} from "react-hot-toast";
import {catchError} from "@/lib/helpers";
import {DataTableRaw} from "@/components/common/data-table/data-table-raw";
import {useAuth} from "@/lib/hooks/use-auth";
import {usePathname, useRouter} from "next/navigation";
import useApiPlatform from "@/_actions/platforms";
import { useClickOutside } from "@/lib/hooks/use-click-outside"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/common/ui/dialog"
import { Input } from "@/components/common/ui/input"
import { Label } from "@/components/common/ui/label"
import {LoadingSpin} from "@/components/common/loading-spin";



interface IRegisterFormShell{
    data:any[],
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>,
    isClientMode:boolean
}


export function RegisterFormShell ({data, setTrigger, isClientMode}:IRegisterFormShell) {
    const pathname = usePathname();
    const router = useRouter();
    const {getFormData, approveRegisteredPlatform} = useApiPlatform();
    const [isPending, startTransition] = React.useTransition()
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])
    const {profile} = useAuth()
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [detailForm, setDetailForm]= React.useState<any>(undefined)
    const [formId, setFormId]= React.useState<number | null>(null)
    const ref = React.useRef<HTMLDivElement>(null)

    const handleStt = (status:any, id:any) => {
        const payload = {
            status: status,
            register_id: id,
            user_id: profile?.user?.id
        }
        setConfirmLoading(true);
        startTransition(() => {
            toast.promise((approveRegisteredPlatform(payload)), {
                loading: "Loading...",
                error: (err: any) => catchError(err),
                success: () => {
                    setConfirmLoading(false);
                    setTrigger(true)
                    return "success"
                }
            })
        })
    }

    const columns = React.useMemo<ColumnDef<any, any[]>[]>(
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
                accessorKey: "id",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="id"/>

                ),
                cell: ({row}) => {
                    const id = row.original.id as string;
                    return (
                     <>
                         {isClientMode  ? (
                             <> {row.getValue("id")}</>
                         ):(
                             <Link href={`${pathname}/${id}`}>
                                 {row.getValue("id")}
                             </Link>
                         )}

                     </>
                    )
                },
            },
            {
                accessorKey: "user",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="user"/>
                ),
                cell: ({row}) =>{
                    const name = isClientMode ?profile?.user?.name :  (row.getValue("user")) ? (row.getValue("user")as any).name :"";
                    return  <div>{name}</div>
                }

            },
            {
                accessorKey: "platform_ids",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="platforms_id"/>
                ),
                cell: ({row}) =>{
                    const name = row.getValue("platform_ids") ? (row.getValue("platform_ids")as any) :[];
                    return  <div>
                        {name && name.map((item:any, index:any) => (
                            <div key={index}>platform: {item}</div>
                        ))}
                    </div>
                }
            },
            {
                accessorKey: "additional_status",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="additional_status"/>
                ),
                cell: ({row}) =>{
                    const status = row.getValue("additional_status")
                    return  <div>
                        {status && status == "pending" ? <Tag color="default">pending</Tag> :
                            status == "approve" ? <Tag color="green">approve</Tag>  :<Tag color="red">reject</Tag>
                        }
                    </div>
                }

            },
            {
                id: "action",
                cell: ({row}) => {
                    const status = row.getValue("additional_status");
                    const id = row.original.id;
                    return (
                        <>
                            {!isClientMode ? (
                                <Space >
                                    <Popconfirm
                                        title="Title"
                                        description="Open Popconfirm with Promise"
                                        onConfirm={() => {handleStt("approve", id)}}
                                        okType="dashed"
                                        okButtonProps={{ loading: confirmLoading }}
                                    >
                                        <Button  disabled={status !== "pending"} variant="green" size="sm">
                                            Approve
                                        </Button>
                                    </Popconfirm>


                                    <Popconfirm
                                        title="Title"
                                        description="Open Popconfirm with Promise"
                                        onConfirm={() => {handleStt("reject", id)}}
                                        okType="danger"
                                        okButtonProps={{ loading: confirmLoading }}
                                    >
                                        <Button disabled={status !== "pending"} variant="destructive" size="sm">
                                            Reject
                                        </Button>
                                    </Popconfirm>
                                    <Button onClick={() => {
                                        setFormId(id)
                                        setOpen(true)
                                    }} >
                                        Watch
                                    </Button>
                                </Space>

                            ):(
                              <>


                              <Button onClick={() => {
                                  setOpen(!open);
                                  setFormId(row?.original.id)
                              }} >
                                  Watch
                              </Button>
                              </>
                            )}

                        </>
                    )
                }

            },
        ],
        [data, selectedRowIds]
    )
    React.useEffect(() => {
        if(formId) {
            startTransition(async () => {
                const {data}  = await getFormData({ form_id:formId});
                 setDetailForm(data?.[0]?.field_data)
            });
        }
    },[formId])
    React.useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
               setOpen(false);
                setDetailForm(undefined)
            }
        }
        window.addEventListener("keydown", handleEsc)
        return () => {
            window.removeEventListener("keydown", handleEsc)
        }
    }, [router])

    useClickOutside({
        ref: ref,
        handler: () => {
            setOpen(false);
            setDetailForm(undefined)
        },
    });

    return (
        <>
            <DataTableRaw columns={columns} data={data ? data :[]}/>
            <div ref={ref}>
             <Dialog open={open} onOpenChange={() => {setOpen(false); setDetailForm(undefined)}}>
                 <DialogContent className="sm:max-w-screen-md">
                     <DialogHeader>
                         <DialogTitle>Detail Form</DialogTitle>
                         <DialogDescription>
                             You can watch your form field data
                         </DialogDescription>
                     </DialogHeader>

                     {isPending ? (
                         <>
                            <LoadingSpin />
                         </>
                     ):(
                         <div className="grid gap-4 py-4">
                             {detailForm?.map((item:any, index:any) => (
                                 <div className="grid grid-cols-4 items-center gap-4" key={index}>
                                     <Label  className="text-right">
                                         {item?.name}
                                     </Label>
                                     <Input  readOnly={true} value={item?.value} className="col-span-3" />
                                 </div>

                             ))}
                         </div>
                     )}
                 </DialogContent>
             </Dialog>
         </div>
        </>
    )
}