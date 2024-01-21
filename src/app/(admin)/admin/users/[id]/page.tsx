'use client';

import {Space} from "antd"
import {PageHeader} from "@/components/common/page-header";
import * as React from "react";
import useApiUsers from "@/_actions/users";
import {toast} from "react-hot-toast";
import {catchError, hasActivePermission} from "@/lib/helpers";
import {IDetailUser} from "@/lib/validation/users";
import {ShellAction} from "@/components/common/shell-back";
import {InfoCard} from "@/components/admin/users/user-card/info-card";
import {GroupCard} from "@/components/admin/users/user-card/group-card"
import {useAuth} from "@/lib/hooks/use-auth";
import {RegisterPlatformsCard} from "@/components/admin/users/user-card/register-platform-card";
import {usePlatform} from "@/lib/hooks/use-platform";
import {useMounted} from "@/lib/hooks/use-mounted";

interface IParams extends React.PropsWithChildren {
    params: {
        id: number
    }
}

export default function UserIdPage({params}: IParams) {
    const [isPending, startTransition] = React.useTransition();
    const [userEdit, setUserEdit] = React.useState<IDetailUser | null>(null)
    const {getUser} = useApiUsers();
    const {profile} = useAuth()
    const [showCreateBtn, setShowCreateBtn] = React.useState<boolean>(false)
    const [trigger, setTrigger] = React.useState<boolean>(false)
     const mounted = useMounted()

    const fetchData = () => {
        startTransition(() => {
            toast.promise((getUser(Number(params.id))),
                {
                    loading: "Loading...",
                    success: (data) => {
                        setUserEdit(data);
                        return "Get detail user successfully."
                    },
                    error: (err: unknown) => catchError(err),
                }
            )

        })
    }

    React.useEffect(() => {
        if (trigger) fetchData();
        if(Number(params.id) !== profile?.user?.id) fetchData();
    }, [params.id, trigger,profile]);

    React.useEffect(() => {
        if (profile && params.id) {
            const hasPer = hasActivePermission(profile.permissions, 'tạo nhóm');
            if((Number(params.id) === profile.user.id) && hasPer){
                setShowCreateBtn(true)
            }else{
                setShowCreateBtn(false)
            }
        }
    }, [params.id, profile])

    React.useEffect(() => {
        if (Number(params.id) === profile?.user?.id) setUserEdit(profile)
    }, [params.id, profile]);
    {!mounted  && <>Loading</>}

    return (
        <React.Suspense fallback={<>Loading...</>}>
            <Space className={"flex items-center justify-between"}>
                <PageHeader title="Users" desc="watch user "/>
                <ShellAction href="/admin/users" actionName="Back"/>
            </Space>
            <div className="my-6 content space-y-3">

                    <React.Suspense fallback={<>Loading.....</>}>
                        {userEdit && (
                            <div className="grid sm:grid-cols-2 md:grid-cols-1 gap-3">
                            <div>
                                    <InfoCard data={userEdit}/>
                            </div>
                            <div>
                                <GroupCard data={userEdit} params={params} showCreateBtn={showCreateBtn}
                                           setTrigger={setTrigger}/>
                            </div>
                            <div>
                                <RegisterPlatformsCard data={userEdit.platforms}
                                           setTrigger={setTrigger}
                                           showCreateBtn={showCreateBtn}
                                           user_has_pl_id={userEdit.user_has_pl_id}
                                />
                            </div>
                        </div>
                        )}
                    </React.Suspense>

            </div>
        </React.Suspense>
    )
}

