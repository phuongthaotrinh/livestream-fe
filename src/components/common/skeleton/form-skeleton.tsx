import { DotChartOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Divider, Form, Radio, Skeleton, Space, Switch } from 'antd';

type SizeType = 'default' | 'small' | 'large';
type ButtonShapeType = 'circle' | 'square' | 'round' | 'default';
type AvatarShapeType = 'circle' | 'square';

const FormSkeleton: React.FC = () => {
    const [active, setActive] = useState(false);
    const [block, setBlock] = useState(false);
    const [size, setSize] = useState<SizeType>("small");
    const [buttonShape, setButtonShape] = useState<ButtonShapeType>('default');

    const handleActiveChange = (checked: boolean) => {
        setActive(checked);
    };

    const handleBlockChange = (checked: boolean) => {
        setBlock(checked);
    };

    const handleSizeChange = (e: RadioChangeEvent) => {
        setSize(e.target.value);
    };

    const handleShapeButton = (e: RadioChangeEvent) => {
        setButtonShape(e.target.value);
    };


    return (
        <>
            <Space>
                <Skeleton.Button active={active} size={size} shape={buttonShape} block={block} />
                <Skeleton.Input active={active} size={size} />
                <Skeleton.Input active={active} size={size} />
            </Space>
            <br />
            <br />
            <Skeleton.Button active={active} size={size} shape={buttonShape} block={block} />
            <br />
            <br />
            <Skeleton.Input active={active} size={size} block={block} />
            <br />
            <br />
            <Space>
                <Skeleton.Image active={active} />
                <Skeleton.Node active={active}>
                    <DotChartOutlined style={{ fontSize: 40, color: '#bfbfbf' }} />
                </Skeleton.Node>
            </Space>

        </>
    );
};

export default FormSkeleton;
