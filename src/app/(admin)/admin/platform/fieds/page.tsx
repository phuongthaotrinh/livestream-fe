'use client';

import {PageHeader} from "@/components/common/page-header";
import {useValidation} from "@/lib/hooks/use-validation";
import {IRoles, rolesSchema} from "@/lib/validation/roles";
import {CollectionCreateForm} from "@/components/admin/platform/platformFields/form";
import * as React from "react";
import useApiPlatform from "@/app/_actions/platforms";
import toast from "react-hot-toast";
import {catchError} from "@/lib/helpers";
import {useRouter} from "next/navigation";
import {PlatformFiledsShell} from '@/components/shells/platformFileds-shell';
import {PlusCircle} from "lucide-react"
import clsx from "clsx";
import {buttonVariants} from "@/components/ui/button";
import {IPlatformFields,platformsFieldsSchema} from "@/lib/validation/platform";
import { v4 as uuid } from 'uuid';


export default function PlatformFiedsPage () {
    const router = useRouter()
    const [pending, startTransition] = React.useTransition();
    const [form, rule] = useValidation<IPlatformFields>(platformsFieldsSchema);
    const [open, setOpen] = React.useState<boolean>(false);
    const [mode, setMode] = React.useState("");
    const {getPlatformFileds, createPlatformFileds, platformFields} = useApiPlatform();
    const [platformFileds, setPlatformFileds] = React.useState(platformFields);


    // React.useEffect(() => {
    //     startTransition(() => {
    //         const fetchData = async () => {
    //             try {
    //                 const data  = await getPlatformFileds();
    //                 setPlatformFileds(data);
    //             } catch (error) {
    //                 console.error('Error in fetching roles:', error);
    //             }
    //         };
    //
    //         fetchData();
    //     });
    // },[])


    const onCreate = (values: IRoles) => {
        const id = uuid()
        const payload = ({...values, id});

        if(mode === 'create') {
            startTransition(async () => {
                try {
                    const es = await createPlatformFileds(payload);
                        toast.success('creating success');
                        form.resetFields();
                        onCancel();

                } catch (err) {
                    catchError(err);
                }
            });
        }else{

        }
    };
    const onCancel = () => {
        setOpen(false);

    }
    const onEdit = (value:any) => {
        setOpen(true);
        setMode('update')
        form.setFieldsValue(value)
    }

    return (
        <>
            <PageHeader title="Platform fields" desc="settings all platform fields"/>
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
                        <PlatformFiledsShell data={platformFileds} pageCount={1} onEdit={onEdit} />
                    }
                </div>
            </div>
        </>
    )
};


