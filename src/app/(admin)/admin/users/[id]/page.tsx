'use client';

import {Card, Button, Space, theme, Collapse} from "antd"
import {PageHeader} from "@/components/common/page-header";
import * as React from "react"
import {useParams} from "next/navigation";
import Link from "next/link";
import {MoveLeft, Pencil, ChevronRight, ChevronDown} from "lucide-react";
import {platform} from "@/lib/constants/platform";
import clsx from "clsx";
import {buttonVariants} from "@/components/common/ui/button";
import useApiUsers from "@/_actions/users";
import {toast} from "react-hot-toast";
import {catchError} from "@/lib/helpers";
import {IUsers} from "@/lib/validation/users";

export default function UserIdPage() {
    const {id} = useParams();
    const [isPending, startTransition] = React.useTransition();
    const [userEdit, setUserEdit] = React.useState<IUsers>()
    const {getUser} = useApiUsers();
    const [groupId, setGroupId] = React.useState<string>("group1")
    React.useEffect(() => {
        startTransition(() => {
            toast.promise((getUser(id)),
                {
                    loading: "Loading...",
                    success: ({user}: any) => {
                        setUserEdit(user);
                        return "Get detail user successfully."
                    },
                    error: (err: unknown) => catchError(err),
                }
            )

        })
    }, [id]);
    const {
        token: {colorTextBase},
    } = theme.useToken();

    const PlatformUser = () => {
        return (
            <>
                <div className="grid grid-cols-2 gap-6">
                    {platform.map((item, index) => (

                        <Card key={index}
                              className="my-5"
                              title={<div className={"flex items-stretch  gap-x-4"}>
                                  <div className="w-4 h-4 mr-2">
                                      {item.icon}
                                  </div>
                                  <span>{item.name}</span>
                              </div>}
                        >
                            <div>
                                <div>
                                    General:
                                    .....
                                </div>
                                <div className="my-3">
                                    <Button type="primary" style={{backgroundColor: colorTextBase}}>Watch
                                        setting</Button>
                                </div>
                            </div>
                        </Card>

                    ))}
                </div>
            </>
        )
    }

    const UserInfo = () => {
        return (
            <>
                {userEdit && (

                    <div className="max-w-xs">
                        <div className="py-3">
                            <div className="p-2">
                                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{userEdit?.fullName ||'NAN'}</h3>
                                <div className="text-center text-gray-400 text-xs font-semibold">
                                    <p>{userEdit?.name ||'NAN'}</p>
                                </div>
                                <table className="text-xs my-3">
                                    <tbody>
                                    <tr>
                                        <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
                                        <td className="px-2 py-2">{userEdit.address || "NAN"}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                        <td className="px-2 py-2">{userEdit.phoneNumber || 'NAN'}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                        <td className="px-2 py-2">{userEdit.email || "NAN"}</td>
                                    </tr>
                                    </tbody>
                                </table>

                                <div className="text-center">
                                    <Button type="dashed">
                                        <Link href={`/admin/users/${id}/edit`} className="flex items-center">
                                            <Pencil className='w-4 h-4 mr-2 '/>
                                            <span>Edit profile</span>
                                        </Link>
                                    </Button>
                                </div>


                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }
    const UserGroup = () => {
        return (
            <>
                <small>Just enable when user role is admin</small>
                <div>
                    <Card>
                        <small>example group 1</small>
                        <div>
                           <p>
                               having 25 user
                           </p>
                            <div>
                                <Button type="link" >
                                  <Link href={`/admin/users/${id}/${groupId}`}>
                                      Go to detail
                                  </Link>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </>
        )
    }

    return (
        <>
            <Space className={"flex items-center justify-between"}>
                <PageHeader title="Users" desc="watch your user "/>
                <Space>
                    <div className="flex justify-end">
                        <Link aria-label="Create new row" href="/admin/users">
                            <div
                                className={clsx(
                                    buttonVariants({
                                        variant: "outline",
                                        size: "sm",
                                        className: "h-8",
                                    })
                                )}
                            >
                                <MoveLeft className="mr-2 h-4 w-4" aria-hidden="true"/>
                                Back
                            </div>
                        </Link>
                    </div>
                </Space>
            </Space>
            <div className="my-6 content">
                <Card title="Infomation">
                    <UserInfo/>
                </Card>
                <Collapse
                    defaultActiveKey={['1']}
                    bordered={false}
                    expandIcon={({isActive}) => (
                        <>
                            {!isActive ? <ChevronRight/> : <ChevronDown/>}
                        </>
                    )}
                    items={[
                        {
                            key: '1',
                            label: "User platform",
                            children: <PlatformUser/>
                        },
                        {
                            key: '2',
                            label: "User Group",
                            children: <UserGroup/>
                        }
                    ]}
                />

            </div>
        </>
    )
}


