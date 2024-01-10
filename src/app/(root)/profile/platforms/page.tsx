'use client'
import * as React from "react";
import {PageHeader} from "@/components/common/page-header";
import {Card, Switch, Form} from "antd";
import {usePlatform} from "@/lib/hooks/use-platform";
import {ShellAction} from "@/components/common/shell-back";
import {getUniqueRecordsByField} from "@/lib/helpers";
import {Save,BellIcon} from "lucide-react";
import useApiPlatform from "@/_actions/platforms";
import {useAuth} from "@/lib/hooks/use-auth";

export default function Platforms() {
    const [isPending, startTransition] = React.useTransition()
    const [data, setData] = React.useState<any[]>([])
    const {platforms, liveStreamTypeData, setTrigger} = usePlatform()
    const {approveRegisteredPlatform} = useApiPlatform();
    const {profile} = useAuth()
    console.log('produ', profile)

    const onChangeSwitch = (values: any) => {
        const newData = {
            id: values.item.id,
            status: values.e
        }

        const newImages = [...data, newData] as any;
        const payload = getUniqueRecordsByField(newImages, 'id', 'single')
        setData(payload)
    }
    const onSubmit = () => {
        console.log('save', data);
        const payload ={
            user_id:profile.user.id
        }
    }
    return (
        <>
            <PageHeader title="Platforms" desc="Manage your platforms settings"/>
            <div className="space-y-5">
                <div className="w-1/4">
                    <ShellAction actionName="Save" actionVoid={() => onSubmit()} icon={Save}/>
                </div>
                <div className="space-y-3">
                    {platforms ? platforms.map((item, index) => (
                        <Card key={index} bodyStyle={{padding:'5px'}} className="w-1/2" >
                            <div className=" flex items-center space-x-4 rounded-md border p-4">
                                <BellIcon />
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {item.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Send notifications to device.
                                    </p>
                                </div>
                                <Switch onChange={(e) => onChangeSwitch({item, e})}/>
                            </div>
                        </Card>
                    )) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    )
}