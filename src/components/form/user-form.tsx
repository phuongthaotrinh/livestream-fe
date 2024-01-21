import {Button, Card, Checkbox, Form, Input, Space, Row, Col, Modal} from "antd";
import {UploadFile} from "@/components/common/upload-file";
import * as React from "react";
import {IUsers} from "@/lib/validation/users";
import {FormInstance} from "antd";
import {Rule} from "rc-field-form/es/interface";
import useApiRoles from "@/_actions/roles";
import {IRoles} from "@/lib/validation/roles";
import {usePathname} from "next/navigation";
import {PasswordVerifyForm} from "@/components/form/password-verify-form";

interface IUserForm {
    onFinish: (value: IUsers) => void,
    form: FormInstance<IUsers>,
    handleReset: () => void,
    setImages: React.Dispatch<React.SetStateAction<any[]>>,
    images: any[],
    rule: Rule,
    showPassw: boolean,
    editMail?: boolean,
    showRole?: boolean,
    isPending: boolean
}

export function UserForm({onFinish, form, handleReset, setImages, images, rule, showPassw, editMail, showRole, isPending}: IUserForm) {
    const [roles, setRoles] = React.useState<IRoles[]>([]);
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const {getRoles} = useApiRoles()
    const [domLoaded, setDomLoaded] = React.useState(false);
    const isAdmin = usePathname()?.includes('admin');
    const isAdminEdit = usePathname()?.includes('edit');

    React.useEffect(() => {
        (async () => {
            const {data} = await getRoles();
            setRoles(data)
        })()
    }, []);

    React.useEffect(() => {
        setDomLoaded(true);
    }, []);


    const onClose = () => {
        setOpenModal(false)
    }
    const id = React.useId()
    return (
        <>
            {domLoaded && (
                <Form name={`user_form.${id}`} layout="vertical" onFinish={onFinish} form={form} className="space-y-6">
                    <Space align="end">
                        <Form.Item>
                            <Button htmlType="submit" type="primary" disabled={isPending}
                                    className="bg-black block">Submit</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="button" type="default"
                                    className="block" onClick={handleReset}>Reset</Button>
                        </Form.Item>
                    </Space>
                    <Card title="Infomation">
                        <div className="mb-3">
                            <Form.Item name="id" hidden>
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="images"
                                label="Images"
                                className="custom_ant_label"
                            >
                                <UploadFile
                                    max={1}
                                    hierarchy={false}
                                    onRemove={(data: any) => {
                                        setImages(images.filter((current: any) => current !== data))
                                    }}
                                    onChange={(data: any) => {
                                        //@ts-ignore
                                        setImages([...images, data])
                                    }}
                                    value={images}
                                />
                            </Form.Item>
                            <div className="flex items-center gap-3">
                                {images && images.map((item: any, index: any) => (
                                    <div
                                        className=" relative w-[150px] h-[150px] rounded-md overflow-hidden cursor-pointer"
                                        key={index}>
                                        <div className="z-10 absolute top-2 right-2">
                                            <Button
                                                htmlType="button"
                                                onClick={() => {
                                                    setImages(images.filter((current: any) => current !== item))
                                                }}
                                            >
                                                X
                                            </Button>
                                        </div>
                                        <img className="object-cover" alt="Image" src={item}/>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Row gutter={[8, 8]}>
                            <Col span={12}>
                                <Form.Item name="name" label="display name" className="custom_ant_label" rules={[rule]}
                                           required>
                                    <Input placeholder="Doraemon ep 1"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="fullName" label="Full name" className="custom_ant_label" rules={[rule]}
                                           required>
                                    <Input placeholder="Doraemon ep 1"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[8, 8]}>
                            <Col span={12}>
                                <Form.Item name="email" label="Email" className="custom_ant_label" rules={[rule]}
                                           required>
                                    <Input disabled={!editMail} placeholder="Doraemon ep 1"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="address" label="address" className="custom_ant_label" rules={[rule]}
                                >
                                    <Input placeholder="Doraemon ep 1"/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item name="phoneNumber" label="phoneNumber" className="custom_ant_label" rules={[rule]}
                        >
                            <Input placeholder="phoneNumber"/>
                        </Form.Item>

                        {showRole && (
                            <>
                                <Form.Item name="role" label="role" className="custom_ant_label" rules={[rule]}>
                                    <Checkbox.Group name="role">
                                        {roles && roles.map((item, index) => (
                                            <Checkbox value={item?.id} key={index}>{item?.name}</Checkbox>
                                        ))}
                                    </Checkbox.Group>
                                </Form.Item>

                            </>
                        )}

                    </Card>
                    <Card title="Password">
                        {showPassw &&
                            <Form.Item name="password" label="Password" className="custom_ant_label" rules={[rule]}
                                       required={isAdmin ? false : true}>
                                <Input.Password placeholder="input password"/>
                            </Form.Item>}


                        <div className="md:w-1/2 space-y-4 cursor-pointer" onClick={() => setOpenModal(true)}>
                            <div className=" text-[#103fe0] flex items-center gap-4 mt-2">
                                <small>Change Password</small>
                            </div>
                        </div>
                        <Modal okType="dashed" open={openModal} onOk={onClose} onCancel={onClose}
                               title="Change password" confirmLoading={isPending}>
                            <PasswordVerifyForm rule={[rule]}/>
                        </Modal>
                    </Card>

                </Form>
            )}
        </>
    )
}