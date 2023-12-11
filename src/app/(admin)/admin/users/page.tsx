
import {PageHeader} from "@/components/common/page-header";
import { UserTableShell} from "@/components/shells/user-shell"

export default function UserPage() {

    return (
        <div>
            <PageHeader title="Users" desc="your list user is here"/>
            <div className="my-6">
                <UserTableShell data={[]} pageCount={1}/>
            </div>
        </div>
    )
}