'use client';

import type {InferGetServerSidePropsType, GetServerSideProps} from 'next'
import {PageHeader} from "@/components/common/page-header";
import {useValidation} from "@/lib/hooks/use-validation";
import {IRoles, rolesSchema} from "@/lib/validation/roles";
import {CollectionCreateForm} from "@/components/admin/roles/form";
import * as React from "react";
import useApiRoles from "@/_actions/roles";
import toast from "react-hot-toast";
import {catchError} from "@/lib/helpers";
import {useRouter} from "next/navigation";
import {RolesTableShell} from '@/components/shells/roles-shell';
import {PlusCircle} from "lucide-react"
import clsx from "clsx";
import {buttonVariants} from "@/components/common/ui/button";


export default function RolesPage() {
    const router = useRouter()
    const [pending, startTransition] = React.useTransition();
    const [form, rule] = useValidation<IRoles>(rolesSchema);
    const [open, setOpen] = React.useState<boolean>(false);
    const [mode, setMode] = React.useState("");
    const [roles, setRoles] = React.useState<IRoles[]>([]);
    const {createRole, getRoles} = useApiRoles();

    React.useEffect(() => {
        startTransition(() => {
            toast.promise((getRoles()),
                {
                    loading: "Loading...",
                    success: ({data}: any) => {
                        setRoles(data);
                        return "Get data successfully."
                    },
                    error: (err: unknown) => catchError(err),
                }
            )

        })


    }, [])

console.log('mode', mode)
    const onCreate = (values: IRoles) => {
        if (mode === 'create') {
            startTransition(async () => {
                try {
                    const es = await createRole({...values});
                    if (es.success == true) {
                        toast.success(es.message);
                        form.resetFields();
                        onCancel();
                    }
                } catch (err) {
                    catchError(err);
                }
            });
        } else {
            console.log('update mdode')
        }
    };
    const onCancel = () => {
        setOpen(false);

    }
    const onEdit = (value: any) => {
        setOpen(true);
        setMode('update')
        form.setFieldsValue(value)
    }

    return (
        <>
            <PageHeader title="Roles" desc="settings all roles"/>
            <div className="my-6 relative">
                <div className="absolute top-[0.3em] right-24 ">
                    <button
                        className="flex items-center gap-2"
                        onClick={() => {
                            setOpen(true);
                            setMode('create')
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
                            New
                        </div>
                    </button>
                    <CollectionCreateForm
                        pending={pending}
                        form={form}
                        rule={rule}
                        onCreate={onCreate}
                        open={open}
                        onCancel={onCancel}
                        mode={mode}
                    />
                </div>
                <div>
                    {!pending &&
                        <RolesTableShell data={roles} pageCount={1} onEdit={onEdit}/>
                    }
                </div>
            </div>
        </>
    )
};


