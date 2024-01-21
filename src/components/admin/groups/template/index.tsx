'use client';


import {PageHeader} from "@/components/common/page-header";
import * as React from "react";
import {UserTableShell} from "@/components/shells/user-shell";
import {IGroups} from "@/lib/validation/group";
import {UserGroupsShell} from "@/components/shells/user-groups-shell";
import {GroupsShell} from "@/components/shells/groups-shell";
import {toast} from "react-hot-toast";
import {useApiAdditional} from "@/_actions/additional";
import {catchError} from "@/lib/helpers";

export function GroupTemplate() {
    const [isPending, startTransition] = React.useTransition();
    const [data, setData] = React.useState<IGroups[]>([])
    const {getGroups} = useApiAdditional()

    React.useEffect(() => {
        startTransition(() => {
            toast.promise((getGroups()), {
                loading: 'loading',
                success: ({data}) => {
                    setData(data);
                    return 'Get groups successfully!'
                },
                error: (err) => catchError(err)
            })
        })
    }, []);


    const onEdit = (value: any) => {
        // setOpen(true);
        // setMode('update')
        // form.setFieldsValue(value)
    }
    return (
        <>
            <PageHeader title="Groups" desc="view all groups"/>
            <div className="my-6">
                {!isPending && (
                    <GroupsShell data={data} pageCount={1} onEdit={onEdit}/>
                )}
            </div>
        </>
    )
}