'use client';

import React  from 'react';
import { Checkbox, Col, Row, Card,Form } from 'antd';
import {Button} from "@/components/common/ui/button"
import useApiUsers from "@/_actions/users";
import {toast} from "react-hot-toast";
import {catchError} from "@/lib/helpers";
import {LoadingSpin} from "@/components/common/loading-spin";
import  useIsomorphicLayoutEffect from "@/lib/hooks/use-isomorphic-layout-effect"
interface IPermissionAcceptCard {
    data:any[],
    trigger:boolean,
    setTrigger:React.Dispatch<React.SetStateAction<boolean>>,
    dataChecked:any[] | undefined,
    user_id: number | undefined,
}
function getArrayChanges(oldArray:any[], newArray:any[]) {
    const added = oldArray.filter(item => !newArray.includes(item));
    const deleted = newArray.filter(item => !oldArray.includes(item));

    const output = {
        deleted: deleted,
        added: added,
    };

    return output;
}
export function PermissionAcceptCard ({data, setTrigger,dataChecked,trigger,user_id}:IPermissionAcceptCard) {

    const [form] = Form.useForm();
    const [isPending,startTransition] = React.useTransition()
    const {getAllPermissionBelongToUser, addUserPermission} = useApiUsers();

    useIsomorphicLayoutEffect(() => {
        if(dataChecked || trigger) {
            form.setFieldsValue({
                permission_id:dataChecked?.map((item) => item?.permission_id)
            })
        }
    }, [dataChecked, trigger]);

    const onFinish= (payload:any) => {
        const a = getArrayChanges(payload?.permission_id, dataChecked?.map((item) => item?.permission_id) as any[])

        if (user_id == undefined) toast.error("Không tìm thấy user");

        if((a.deleted.length == 0 && a.added.length == 0) ) toast('Nothing change')
        else  startTransition(() => {
            toast.promise((
                Promise.all([
                    a.added.map((item) => addUserPermission({user_id:user_id,permission_id:item, status:"on"})),
                    a.deleted.map((item) => addUserPermission({user_id:user_id,permission_id:item, status:"off"})),
                ])
            ),{
                loading:"Loading...",
                success: () => {
                    setTrigger(true);
                    return "Save success"
                },
                error :(err) => {
                    console.log('err',err);
                    return catchError(err)
                }
            })
        })


        console.log("a",a);


    };
    return (
        <Card title="Permission">
            <Form name="permission_eccept_card" form={form} onFinish={onFinish}>
                {!isPending ? (
                   <>
                       <Form.Item name="permission_id">
                           <Checkbox.Group>
                               <Row>
                                   {data && data?.map((item, index) => (
                                       <Col span={24} key={index}>
                                           <Checkbox value={item?.permission_id}>{item?.permission?.name}</Checkbox>
                                       </Col>
                                   ))}
                               </Row>
                           </Checkbox.Group>
                       </Form.Item>
                       <Form.Item colon={true} className="flex gap-3">
                           <Button disabled={isPending} type="submit" variant="default">Save change</Button>
                           <Button disabled={isPending} type="button" variant="secondary" onClick={() => form.resetFields()}>Reset</Button>
                       </Form.Item>
                   </>
                ):(
                    <LoadingSpin />
                )}
            </Form>
        </Card>
    )
}
