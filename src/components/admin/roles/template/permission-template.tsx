'use client'

import React, {useEffect, useState} from 'react';
import {Form, Input, InputNumber, Popconfirm, Table, Typography, Button, Space, Checkbox} from 'antd';
import type {CheckboxValueType} from 'antd/es/checkbox/Group';
import {PageHeader} from "@/components/common/page-header";
import {IRoles} from "@/lib/validation/roles"
import {Edit, Trash} from "lucide-react"
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
    inputType: 'number' | 'text';
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
    const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;

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
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export const PermissionTemplate: React.FC = () => {
    const {createPermisstion, getAllPermisstion, getRoles} = useApiRoles();


    const [form] = Form.useForm();
    const [isPending, startTransition] = React.useTransition()
    const [data, setData] = useState<Item[]>([]);
    const [count, setCount] = useState<number>(0)
    const [editingKey, setEditingKey] = useState('');
    const id = React.useId();
    const [keyRadio, setKeyRadio] = useState<any>([]);
    //roles after convert to CheckBoxValue
    const [roles, setRoles] = useState([]);
    //raw roles
    const [rawRoles, setRawRoles] = useState([]);

    const [rolesAssign, setRoleAssign] = useState<any>()

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
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
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
            title: 'assign',
            dataIndex: 'assign',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return (
                    <Space size="large">
                        <Checkbox.Group
                            options={roles}
                            onChange={onChangeAssign}
                            disabled={!editable}
                        />
                    </Space>
                )
            },
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
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    // console.log('setData', data)
    const handleAdd = () => {
        const newData: Item = {
            key: `${id.concat(String(data.length))}`,
            name: `Edward King-${data.length}`,
            assign: []
        }

        setData([...data, newData]);
    }

    const saveTable = () => {
        const payload:any[] = [];
        data.forEach((item:any) => {
            item.assign.forEach((assignItem:any) => {
                const existingRole = payload.find(role => role.roles.id === assignItem.id);

                if (existingRole) {
                    existingRole.permissions.push({
                        id: item.id,
                        name: item.name,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt
                    });
                } else {
                    payload.push({
                        roles: {
                            id: assignItem.id,
                            name: assignItem.name,
                            createdAt: assignItem.createdAt,
                            updatedAt: assignItem.updatedAt
                        },
                        permissions: [
                            {
                                id: item.id,
                                name: item.name,
                                createdAt: item.createdAt,
                                updatedAt: item.updatedAt
                            }
                        ]
                    });
                }
            });
        });

        startTransition(() => {
            toast.promise((createPermisstion(payload)),
                {
                    loading: "Loading...",
                    success: (data: any) => {
                        console.log('data_after_post', data)
                        return "Create permissions successfully."
                    },
                    error: (err: unknown) => catchError(err),
                }
            )
        })

    }
    return (
        <>
            <Space className={"flex items-center justify-between"}>
                <PageHeader title="Permissions" desc="Setting all permissions"/>
                <ShellAction href="/admin/roles" actionName="Back To Role"/>
            </Space>
            <Space>
                <Button onClick={handleAdd} type="dashed">
                    Add a row
                </Button>
                <Button onClick={saveTable} type="primary" style={{backgroundColor: '#000'}}>
                    Save Table
                </Button>
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
                    />
                </Form>
            </div>
        </>
    );
};
