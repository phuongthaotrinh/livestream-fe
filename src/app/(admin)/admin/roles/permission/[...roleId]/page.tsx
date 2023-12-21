'use client';
import {PageHeader} from "@/components/common/page-header";
import * as React from "react";
import useApiRoles from "@/_actions/roles";
import {IRoles} from "@/lib/validation/roles";

interface IEditPromissionForRole extends React.PropsWithChildren {
    params: {
        roleId: string
    }
}


export default function EditPromissionForRole({
                                                  params,
                                              }: IEditPromissionForRole) {

    const [roleDetail, setRoleDetail] = React.useState<IRoles>()
    const {getRoles} = useApiRoles();

    React.useEffect(() => {
        (async () => {
            const {data} = await getRoles();
            const roleName = data?.find((item: IRoles) => item.id == params.roleId);
            if (roleName) setRoleDetail(roleName)
        })()
    }, [params.roleId]);

    return (
        <>
            {roleDetail && (
                <>
                    <PageHeader title={`Setting Permission `}
                                desc={`Permission name: ${roleDetail?.name}`}
                    />


                </>
            )}


        </>
    )
}