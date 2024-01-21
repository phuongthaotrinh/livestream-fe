'use client';
import {PageHeader} from "@/components/common/page-header";
import {UserTableShell} from "@/components/shells/user-shell"
import useApiUsers from "@/_actions/users";
import * as React from "react";
import {DataTableSkeleton} from "@/components/common/skeleton/table-skeleton";
import {useMounted} from "@/lib/hooks/use-mounted";


export default function UserPage() {
    const {getUsers} = useApiUsers();
    const [pending, startTransition] = React.useTransition();
    const [users, setUsers] = React.useState([]);
    const mouted = useMounted();
    React.useEffect(() => {
        startTransition(() => {
            (async () => {
                try {
                    const {data} = await getUsers();
                    setUsers(data);
                } catch (error) {
                    console.error('Error in fetching roles:', error);
                }
            })()
        });
    }, []);

    {!mouted && <DataTableSkeleton  columnCount={6}  />}
    return (
        <>
            {mouted && (
                <>
                    <PageHeader title="Users" desc="your list user is here"/>
                    <div className="my-6">
                        {!pending && users && (
                            <UserTableShell data={users} pageCount={1}/>
                        )}

                    </div>

                </>
            )}

        </>
    )
}