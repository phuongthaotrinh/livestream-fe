'use client';
import {PageHeader} from "@/components/common/page-header";
import {UserTableShell} from "@/components/shells/user-shell"
import useApiUsers from "@/_actions/users";
import * as React from "react";


export default function UserPage() {
    const {getUsers} = useApiUsers();
    const [pending, startTransition] = React.useTransition();
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        startTransition(() => {
            const fetchData = async () => {
                try {
                    const {data} = await getUsers();
                    console.log('data user', data)
                    setUsers(data);
                } catch (error) {
                    console.error('Error in fetching roles:', error);
                }
            };
            fetchData();
        });
    }, []);

    return (
        <div>
            <PageHeader title="Users" desc="your list user is here"/>
            <div className="my-6">
                {!pending && users && (
                    <UserTableShell data={users} pageCount={1}/>
                )}
            </div>
        </div>
    )
}