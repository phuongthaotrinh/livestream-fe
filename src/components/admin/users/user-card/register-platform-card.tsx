"use client";
import * as React from "react";
import {IDetailUser} from "@/lib/validation/users";
import {Card, Button, Switch} from "antd";
import {BellIcon} from "lucide-react";
import {usePlatform} from "@/lib/hooks/use-platform";
import {useAuth} from "@/lib/hooks/use-auth";
import useApiPlatform from "@/_actions/platforms";
import {toast} from "react-hot-toast";
import {catchError} from "@/lib/helpers";

interface IRegisterPlatformsCard {
    data:IDetailUser['platforms'],
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>,
    showCreateBtn:boolean,
    user_has_pl_id:any
}
interface Payload {
    user_id: string;
    platform_ids: string[];
    id?: string;
    status?: string;
}
function getUniqueById(inputArray:any[]) {
    const uniqueValues:any = {};
    for (let i = 0; i < inputArray.length; i++) {
        const currentItem = inputArray[i];
        if (!uniqueValues[currentItem.id] || uniqueValues[currentItem.id] < i) {
            uniqueValues[currentItem.id] = i;
        }
    }

    const outputArray = Object.values(uniqueValues).map((index:any) => inputArray[index]);
    return outputArray;
}


export  function RegisterPlatformsCard({setTrigger, data,showCreateBtn,user_has_pl_id}:IRegisterPlatformsCard) {
    const [isPending, startTransition] = React.useTransition();
    const [platformsSelect, setPlatformsSelect] = React.useState<any[]>([])
    const {profile} = useAuth();
    const {platforms} = usePlatform();
    const {registerPlatform} = useApiPlatform();

    const appendChecked = (item:any):boolean => {
        const isItemInData=data.some(record => record.id === item.id);
        return isItemInData
    }

    const convertPlatformData = () => {
        const newData:any[] = platforms.map((item) =>{
            return {
                ...item,
                stt: appendChecked(item)
            } }   )       ;
            return newData
    }

    React.useEffect(() => {
        if(data && platforms) {
            const data = convertPlatformData();
            setPlatformsSelect(data)
        }
    },[data,platforms])



    const onSubmit = () => {
        const filteredRecords  = platformsSelect.filter((item) => item.stt ==true);
        const nullALl  = platformsSelect.filter((item) => item.stt == false);
        const ids = filteredRecords.map(record => record.id);

        if(!user_has_pl_id) {
            startTransition(() => {
                toast.promise((registerPlatform({
                    platform_ids: ids,
                    user_id: profile.user.id,
                })) ,{
                    loading:"Loading...",
                    error:(err) => catchError(err),
                    success: () => {
                        setTrigger(true);
                        return "change platform success"
                    }
                })
            })

        }else{
            if(nullALl.length === platformsSelect.length){
                startTransition(() => {
                    toast.promise((registerPlatform({
                        id : user_has_pl_id,
                        status : "delete",
                    })) ,{
                        loading:"Loading...",
                        error:(err) => catchError(err),
                        success: () => {
                            setTrigger(true);
                            return "change platform success"
                        }
                    })
                });

            }
         else{
                startTransition(() => {
                    toast.promise((registerPlatform({
                        id : user_has_pl_id,
                        status : "on",
                        platform_ids: ids,
                    })) ,{
                        loading:"Loading...",
                        error:(err) => catchError(err),
                        success: () => {
                            setTrigger(true);

                            return "change platform success"
                        }
                    })
                })
            }
        }
    }


    return (
        <>
            <Card title="Platform register" className="h-auto " size="default" extra={<>
                {showCreateBtn && <Button onClick={onSubmit}>Save</Button>   }
            </>}>
                {/*<ScrollArea className="h-80 rounded-md border">*/}
                    <div className="space-y-3">

                        {platformsSelect ? platformsSelect.map((item, index) => (
                            <Card key={index} bodyStyle={{padding:'5px'}} className="w-full" bordered={false} >
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

                                    <Switch
                                        key={item.id}
                                        checked={item.stt}
                                        onChange={(e) => {
                                            const newsDtaa = {
                                                item:{
                                                    ...item,
                                                    stt:e
                                                },
                                            }
                                            const draf  = [...platformsSelect,newsDtaa.item]
                                            const test =getUniqueById(draf)
                                            setPlatformsSelect(test)
                                        }}
                                    />
                                </div>
                            </Card>
                        )) : (
                            <></>
                        )}

                    </div>
                    {/*<ScrollBar />*/}
                {/*</ScrollArea>*/}
            </Card>
        </>
    )
}