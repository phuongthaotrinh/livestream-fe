import {z} from "zod";
import {Form, FormInstance, FormRule} from "antd";

export const useValidation = <T,>(schema: z.ZodObject<any, any, any, T>): [FormInstance<T>, FormRule] => {
    const [form] = Form.useForm();
    const rule = {
        async validator({ field }: any) {
            const object = form.getFieldsValue();
            const result = await schema.safeParseAsync(object);
            if (result.success) return;
            const issues = result.error.issues.filter((x) => x.path[0] == field);
            const message = issues[0]?.message;
            if (message) throw new Error(message);
        },
    };
    return [form, rule];

};