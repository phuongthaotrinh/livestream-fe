'use client'

import React, {useEffect, useState} from 'react';
import {Form, Input, Modal, Table, Typography, Button, Space} from 'antd';
import type {CheckboxValueType} from 'antd/es/checkbox/Group';
import {PageHeader} from "@/components/common/page-header";
import {IRoles} from "@/lib/validation/roles"
import {Edit, PlusCircle, Trash} from "lucide-react"
import useApiRoles from "@/_actions/roles"
import {toast} from "react-hot-toast";
import {catchError} from "@/lib/helpers";
import {ShellAction} from "@/components/common/shell-back";

interface Item extends Omit<IRoles, 'id'> {
    key: string;
    assign: string[]
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType:  'text';
    record: Item;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                       editing,
                                                       dataIndex,
                                                       title,
                                                       inputType,
                                                       record,
                                                       index,
                                                       children,
                                                       ...restProps
                                                   }) => {


    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{margin: 0}}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};


export const PermissionTemplate: React.FC = () => {
    const {
        createPermisstion,
        getAllPermisstion,
        getRoles,
        assignRoleForPermission,
        getPermissionOfRole
    } = useApiRoles();
    const [newPermissions, setNewPermissions] = React.useState<any[]>([]);

    const [form] = Form.useForm();
    const [data, setData] = useState<Item[]>([]);
    const [count, setCount] = useState<number>(0)
    const [editingKey, setEditingKey] = useState('');
    const id = React.useId();
    const [keyRadio, setKeyRadio] = useState<any>([]);

    //roles after convert to CheckBoxValue
    const [roles, setRoles] = useState([]);

    //raw roles
    const [rawRoles, setRawRoles] = useState([]);

    const [rolesAssign, setRoleAssign] = useState<any>();
    const [openModal, setOpenModal] = React.useState<boolean>(false)
    const [checkedvalue, setCheckedValue] = React.useState<any[]>([])

    useEffect(() => {
        (async () => {
            await Promise.all([getAllPermisstion(), getRoles()]).then(([{data: promission}, {data: roless}]) => {
                if (promission && roless) {
                    const newData = promission && promission.map((item: Item) => {
                        return {
                            ...item,
                            key: `${item.name}.${count}.${id}`,
                            assign: []
                        }
                    })
                    const newRoles = roless && roless.map((item: any) => {
                        return {
                            label: item?.name,
                            value: item?.id
                        }
                    })
                    setData(newData);
                    setCount(newData?.length || 0);
                    setRawRoles(roless)
                    setRoles(newRoles)

                }
            })
        })()
    }, []);

    useEffect(() => {
        if (keyRadio) {
            setRoleAssign(keyRadio)
        }
    }, [keyRadio])

    // useEffect(() => {
    //
    //     if (data && rawRoles) {
    //         toast.promise(
    //             Promise.all(
    //                 rawRoles.map((item: IRoles) =>
    //                     getPermissionOfRole({
    //                         id: item?.id,
    //                     })
    //                 )
    //             ),
    //             {
    //                 loading: "Loading...",
    //                 success: (data: any) => {
    //                     return "Loading successfully."
    //                 },
    //                 error: (err: unknown) => {
    //                     return catchError(err)
    //                 },
    //             }
    //         );
    //     }
    // }, [data]);


    const isEditing = (record: Item) => record.key === editingKey;

    const edit = (record: Partial<Item> & {
        key: React.Key
    }) => {
        form.setFieldsValue({name: '', ...record});
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Item;

            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                const assign = rolesAssign
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                    assign
                });
                ;
                setData(newData);
                setEditingKey('');
                setCount(count + 1)
            } else {
                const assign = rolesAssign
                const payload = {
                    ...row,
                    assign
                }
                newData.push(payload);
                setData(newData);
                setEditingKey('');
                setCount(count + 1)
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const deleteRecord = (key: React.Key) => {
        // const newData = data.filter((item) => item.key !== key);
        // setData(newData);
        toast.error('feature not enable')
    }

    const onChangeAssign = (checkedValues: CheckboxValueType[]) => {
        const checked = rawRoles.filter((item: any) => checkedValues.includes(item.id));
        setKeyRadio(checked);

    }
    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            width: '25%',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space size={"large"}>
                        <Typography.Link onClick={() => save(record.key)} style={{marginRight: 8}}>
                            Save
                        </Typography.Link>
                        <div className="cursor-pointer" onClick={cancel}> Cancel</div>
                    </Space>
                ) : (
                    <Space size="large">
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}
                                         className="flex items-center">
                            <Edit className="w-4 h-4 mr-2"/> Edit
                        </Typography.Link>
                        <Typography.Link onClick={() => deleteRecord(record.key)} style={{marginRight: 8}}
                                         className="flex items-center">
                            <Trash className="w-4 h-4 mr-2"/> Delete
                        </Typography.Link>

                    </Space>

                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        // console.log('mergedColumns', col, columns)
        return {
            ...col,
            onCell: (record: Item) => {
                return ({
                    record,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                })
            },

        };
    });


    const handleAdd = (values: any) => {
        toast.promise((createPermisstion({name: values.name})),
            {
                loading: "Creating permissions...",
                success: (payload: any) => {
                    const newData = payload?.data as any;
                    const dataNew = {
                        ...newData,
                        key: `${newData.name}.${count}.${id}`,
                        assign: []
                    }

                    setData([...data, dataNew])
                    setOpenModal(false);
                    form.resetFields();
                    return 'Creating permissions success'
                },
                error: (err: unknown) => catchError(err),
            }
        )
    }

    const saveTable = () => {
        const payload: any[] = [];
        console.log('save table',data)
        // data.forEach((item: any) => {
        //     item.assign.forEach((assignItem: any) => {
        //         const existingRole = payload.find(role => role.roles.id === assignItem.id);
        //
        //         if (existingRole) {
        //             existingRole.permissions.push({
        //                 id: item.id,
        //                 name: item.name,
        //                 createdAt: item.createdAt,
        //                 updatedAt: item.updatedAt
        //             });
        //         } else {
        //             payload.push({
        //                 roles: {
        //                     id: assignItem.id,
        //                     name: assignItem.name,
        //                     createdAt: assignItem.createdAt,
        //                     updatedAt: assignItem.updatedAt
        //                 },
        //                 permissions: [
        //                     {
        //                         id: item.id,
        //                         name: item.name,
        //                         createdAt: item.createdAt,
        //                         updatedAt: item.updatedAt
        //                     }
        //                 ]
        //             });
        //         }
        //     });
        // });
        // toast.promise((assignRoleForPermission(payload)),
        //     {
        //         loading: "Assigning...",
        //         success: (payload: any) => {
        //             return 'Assigning permissions success'
        //         },
        //         error: (err: unknown) => catchError(err),
        //     }
        // )

    }
    return (
        <>
            <Space className={"flex items-center justify-between"}>
                <PageHeader title="Permissions" desc="Setting all permissions"/>
                <ShellAction href="/admin/roles" actionName="Back To Role"/>
            </Space>
            <Space>
                <Button onClick={() => setOpenModal(true)} type="dashed" className="flex items-center">
                    <PlusCircle className="w-4 h-4 mr-2"/>
                    New Permission
                </Button>
                {/*<Button onClick={saveTable} type="primary" style={{backgroundColor: '#000'}}>*/}
                {/*    Save Table*/}
                {/*</Button>*/}
                <Modal open={openModal} title="Create Permission Name" onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            handleAdd(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
                       onCancel={() => setOpenModal(false)}
                       okText={<p className="text-black">OK</p>}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item name="name" label="Permission name">
                            <Input placeholder="Permission name..."/>
                        </Form.Item>
                    </Form>
                </Modal>
            </Space>
            <div className="my-6">
                <Form form={form} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        dataSource={data}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: cancel,
                        }}
                        size="small"
                    />
                </Form>
            </div>
        </>
    );
};
