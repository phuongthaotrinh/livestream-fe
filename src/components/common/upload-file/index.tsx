"use client";


import * as React from "react";
import {Button} from "antd";
import {CldUploadWidget} from "next-cloudinary";
import {ImagePlus, Trash} from "lucide-react";



interface ImageUploadProps {
    max: number;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: any[];
    hierarchy: boolean,
}

export function UploadFile({onChange, onRemove, value, max, hierarchy}: ImageUploadProps) {

    const onUpload = (result: any) => {
        onChange(result?.info.secure_url);
    };

    const valueLength = value;
    const firstImage = value?.at(0);
    const allImageWithoutFirst: string[] = value?.slice(1);
    console.log("UploadFile", valueLength)


    return (
        <>
            <CldUploadWidget onUpload={onUpload} uploadPreset="c8zrj0fl">
                {({open}) => {
                    const onClick = () => {
                        open();
                    };

                    return (

                        <>

                            <Button
                                htmlType="button"
                                onClick={onClick}

                            >
                                <div className="flex items-center h-fit">
                                    <ImagePlus className="h-4 w-4 mr-2"/>
                                    <span className="text-primary"> Upload an Image</span>
                                </div>
                            </Button>

                        </>
                    );
                }}
            </CldUploadWidget>
        </>


    )
}