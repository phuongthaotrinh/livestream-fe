'use client'

import * as React from "react";
import useApiPlatform from "@/_actions/platforms";
import {usePathname} from "next/navigation";
import {BellIcon, PlusCircleIcon} from "lucide-react";
import {ShellAction} from "@/components/common/shell-back";
import { Tabs , Card} from 'antd';
import type { TabsProps } from 'antd';
import {PageHeader} from "@/components/common/page-header";
import {useAuth} from "@/lib/hooks/use-auth"
import {RegisterFormShell} from "@/components/shells/register-form-shell";


interface IFormsubmissionShell {
    page_title:string,
    page_desc:string,
    isClientMode:boolean
}

export function FormsubmissionShell ({page_title, page_desc, isClientMode}:IFormsubmissionShell) {
    const [data,setData] = React.useState<any[]>([]);
    const [yourForms, setYourForms]= React.useState<any[]>([]);
    const [isPending, startTransition] = React.useTransition()
    const [activeKey, setActiveKey]= React.useState<string>("");
    const [trigger, setTrigger] = React.useState<boolean>(false);

    const {getAllForms, getRegisteredDetailAndResult} = useApiPlatform();
        const pathname = usePathname()
       const {profile} = useAuth();



    React.useEffect(() => {
        (async () => {
            const {data}  = await getAllForms();
            if(data) setData(data)
        })()
    },[]);

    React.useEffect(() => {
        if(profile?.user?.id || trigger) {
            startTransition(async () => {
                const data = await getRegisteredDetailAndResult(profile?.user?.id);
                setYourForms(data)
            })
        }

    },[profile,trigger])


    return (
        <>

            {isClientMode ? (
                <Tabs defaultActiveKey="1" items={[
                    {
                        key: '1',
                        label: 'Your Forms',
                        children:(<>

                            <RegisterFormShell data={yourForms} setTrigger={setTrigger} isClientMode={true} />
                        </>)
                    },
                    {
                        key: '2',
                        label: 'Create form',
                        children:(<>
                            <PageHeader desc="Select a form template and start create new form register" title="Create new form"  />
                            <section className="space-y-3">
                                {data ? data.map((item, index) => (
                                    <Card key={index}  className="w-full" bodyStyle={{padding:"5px"}} >
                                        <div className=" flex items-center space-x-4 rounded-md border p-4">
                                            <BellIcon />
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {item.name}
                                                </p>

                                            </div>
                                            <div className="max-w-[150px]">
                                                <ShellAction  type="link" actionName="create submission" icon={PlusCircleIcon}
                                                              href={{
                                                                  pathname: `${pathname}/${item.id}`,
                                                                  query: {type: JSON.stringify(item.live_type_id, null, 2)},
                                                              }}
                                                />
                                            </div>

                                        </div>
                                    </Card>
                                )) : (
                                    <></>
                                )}
                            </section>
                        </>)
                    }
                ]}
                      onChange={(activeKey) => setActiveKey(activeKey)}
                />
            ):(
                <section className="space-y-5 my-5">
                    {data ? data.map((item, index) => (
                        <Card key={index}  className="w-full" bodyStyle={{padding:"5px"}} >
                            <div className=" flex items-center space-x-4 rounded-md border p-4">
                                <BellIcon />
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {item.name}
                                    </p>

                                </div>
                                <div className="max-w-[150px]">
                                    <ShellAction  type="link" actionName="create submission" icon={PlusCircleIcon}
                                                  href={{
                                                      pathname: `${pathname}/${item.id}`,
                                                      query: {type: JSON.stringify(item.live_type_id, null, 2)},
                                                  }}
                                    />
                                </div>

                            </div>
                        </Card>
                    )) : (
                        <></>
                    )}
                </section>
            )}

        </>
    )
}