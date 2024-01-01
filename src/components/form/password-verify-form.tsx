import {Form, Input} from "antd";
import * as React from "react";


interface IPasswordVerifyForm {
    rule:any
}
export function PasswordVerifyForm ({rule}:IPasswordVerifyForm) {
    return (
        <>
            <Form.Item name="password" label="Password" className="custom_ant_label" rules={[rule]}
                       hasFeedback
                       required>
                <Input.Password placeholder="*******"/>
            </Form.Item>
            <Form.Item name="verifyPassword" label="Confirm Password" className="custom_ant_label"
                       dependencies={['password']} hasFeedback
                       rules={[
                           {
                               required: true,
                               message: 'Please confirm your password!',
                           },
                           ({getFieldValue}) => ({
                               validator(_, value) {
                                   if (!value || getFieldValue('password') === value) {
                                       return Promise.resolve();
                                   }
                                   return Promise.reject(new Error('The new password that you entered do not match!'));
                               },
                           }),
                       ]}>
                <Input.Password placeholder="*******"/>
            </Form.Item>

        </>
    )
}