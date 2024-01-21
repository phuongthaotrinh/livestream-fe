'use client';

import {PageHeader} from "@/components/common/page-header";
import {useValidation} from "@/lib/hooks/use-validation";
import {IRoles, rolesSchema} from "@/lib/validation/roles";
import {CollectionCreateForm} from "@/components/admin/roles/components/form";
import * as React from "react";
import useApiRoles from "@/_actions/roles";
import toast from "react-hot-toast";
import {catchError} from "@/lib/helpers";
import {RolesTableShell} from '@/components/shells/roles-shell';
import {PlusCircle} from "lucide-react"
import clsx from "clsx";
import {buttonVariants} from "@/components/common/ui/button";
import {ShellAction} from "@/components/common/shell-back";

export function RolesPageTemplate() {
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

    const onCreate = (values: IRoles) => {
        if (mode === 'create') {
            startTransition(async () => {
                try {
                    const es = await createRole({...values});
                    if (es.success == true) {
                        const {data} = await getRoles();
                        setRoles(data)
                        toast.success(es.message);
                        form.resetFields();
                        onCancel();

                    }
                } catch (err) {
                    catchError(err);
                }
            });
        } else {
            toast('Feature not enable');
            onCancel()
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
                    <div className="flex items-center gap-4">
                        <ShellAction href="/admin/roles/permission" actionName="All Permission"
                                     icon={PlusCircle}
                        />
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

                    </div>
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


