'use client';

import {PageHeader} from "@/components/common/page-header";
import * as React from "react";
import {useValidation} from "@/lib/hooks/use-validation";
import {IDetailUser, usersSchema} from "@/lib/validation/users";
import {useRouter} from "next/navigation";
import {UserForm} from "@/components/form/user-form";
import {ShellAction} from "@/components/common/shell-back";
import {toast} from "react-hot-toast";
import useApiUsers from "@/_actions/users";
import useApiRoles from "@/_actions/roles";
import {catchError} from "@/lib/helpers";
import {PermissionAcceptCard} from "@/components/admin/users/user-card/permission-accept-card";
import {LoadingSpin} from "@/components/common/loading-spin";
import  useIsomorphicLayoutEffect from "@/lib/hooks/use-isomorphic-layout-effect"

interface IParams extends React.PropsWithChildren {
    params: {
        id: number
    }
}


export default function UserIdPageEdit({params}:IParams) {
    const router = useRouter();
    const {updateProfile,getUser} = useApiUsers()
    const {assignRoleForUser,unAssignRoleForUser} = useApiRoles()
    const [form, rule] = useValidation(usersSchema);
    const [images, setImages] = React.useState<any[]>([]);
    const [data, setData] = React.useState<IDetailUser>();
    const [isPending, startTransition] = React.useTransition();
    const [trigger, setTrigger] = React.useState<boolean>(false)


    const fetchData = React.useCallback(() => {
        startTransition(() => {
            toast.promise((getUser(Number(params.id))),
                {
                    loading: "Loading...",
                    success: (data) => {
                        setData(data);
                        return "Get detail user successfully."
                    },
                    error: (err: unknown) => catchError(err),
                }
            )

        })
    }, [params.id,trigger]);

    useIsomorphicLayoutEffect(() => {
        if(params.id)fetchData();
        if (trigger) fetchData();
    }, [params.id, trigger]);

    const setFiedsFn = (data: IDetailUser | undefined) => {
        if (data) {
            form.setFieldsValue({
                ...data?.user,
                role: data?.role?.map((item: any) => {
                    return Number(item?.role_id)
                }),
                password: ''
            })
        }
    }
    useIsomorphicLayoutEffect(() => {
        if(data) {
            setFiedsFn(data)
        }
    }, [data]);

    const onFinish = (value: any) => {
            const payload = {
                ...value,
                userId: data?.user?.id,
                user_id: data?.user?.id,
                password: value?.password ? value?.password :data?.user?.password
            }
            const assign = payload?.role.map((item:any) =>
                assignRoleForUser({
                    user_id: payload.user_id,
                    role_id:item
                })
            );
            const un_assign_role = data?.role?.map((item: any) => {
                    return unAssignRoleForUser({
                        user_id: payload.user_id,
                        user_has_role_id: item?.id
                    })
                });

            startTransition(() => {
                toast.promise(
                    Promise.all([un_assign_role,assign, updateProfile(payload)]),
                    {
                        loading: "Loading...",
                        success: () => {
                            setTrigger(true)
                            return "Save successfully.";
                        },
                        error: (err) => {
                            return catchError(err);
                        },
                    }
                );
            })

    }




    return (
        <>
            <div className="flex items-center justify-between">
                <PageHeader title="Edit User Profile" desc="edit infomation"/>
                <ShellAction actionName="Back" actionVoid={() => router.back()} type="action"/>
            </div>

            {isPending ? (
                <>
                   <LoadingSpin />
                </>
            ):(
                <>
                    <div className="my-6">
                        <UserForm onFinish={onFinish}
                                  form={form}
                                  setImages={setImages}
                                  images={images}
                                  rule={rule}
                                  showPassw={false}
                                  showRole={true}
                                  editMail={true}
                                  isPending={isPending}
                                  handleReset={() => setFiedsFn(data)}
                        />
                    </div>
                    <PermissionAcceptCard data={data?.permissions}
                                          dataChecked={data?.permissionEnable}
                                          setTrigger={setTrigger}
                                          trigger={trigger}
                                          user_id={data?.user?.id}
                    />

                </>
            )}

        </>
    )
}