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
        <div className="">
            {/*<div className="mb-4 flex items-center gap-4 flex-wrap w-full">*/}
            {/*    <React.Fragment>*/}
            {/*        {hierarchy && value && firstImage ? (*/}
            {/*            <>*/}
            {/*                <div className="grid gap-4 w-full">*/}
            {/*                    <div id="thumbnail">*/}
            {/*                        <h1 className="text-lg font-semibold ">Thumbnail(1)</h1>*/}
            {/*                        <p className="text-sm text-muted-foreground">Thumbnail</p>*/}
            {/*                        <div className="my-3">*/}
            {/*                            <div*/}
            {/*                                key={firstImage}*/}
            {/*                                className="relative w-[200px] h-[200px] rounded-md overflow-hidden cursor-pointer"*/}
            {/*                            >*/}
            {/*                                <div className="z-10 absolute top-2 right-2 ">*/}
            {/*                                    <Button*/}
            {/*                                        htmlType="button"*/}
            {/*                                        onClick={() => onRemove(firstImage)}*/}
            {/*                                        type="text"*/}

            {/*                                    >*/}
            {/*                                        <Trash className="h-4 w-4"/>*/}
            {/*                                    </Button>*/}
            {/*                                </div>*/}


            {/*                                    <img className="object-cover" alt="Image" src={firstImage}/>*/}


            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}


            {/*                    <div id='media' className="w-80">*/}
            {/*                        <h1 className="text-lg font-semibold">Media({value.length - 1})</h1>*/}
            {/*                        <p className="text-sm text-muted-foreground">Media</p>*/}
            {/*                        <div className="my-3">*/}
            {/*                            <div className="whitespace-nowrap rounded-md overflow-scroll">*/}
            {/*                                <div className="flex w-max space-x-4 p-4">*/}
            {/*                                    {allImageWithoutFirst.map((url) => (*/}
            {/*                                        <div*/}
            {/*                                            key={url}*/}
            {/*                                            className=" relative w-[150px] h-[150px] rounded-md overflow-hidden cursor-pointer"*/}
            {/*                                        >*/}
            {/*                                            <div className="z-10 absolute top-2 right-2">*/}
            {/*                                                <Button*/}
            {/*                                                    htmlType="button"*/}
            {/*                                                    onClick={() => onRemove(url)}*/}

            {/*                                                >*/}
            {/*                                                    <Trash className="h-4 w-4"/>*/}
            {/*                                                </Button>*/}
            {/*                                            </div>*/}


            {/*                                                <img className="aspect-[3/4] h-fit w-fit object-cover"*/}
            {/*                                                     alt="Image"*/}
            {/*                                                     src={firstImage}*/}
            {/*                                                     width={300}*/}
            {/*                                                     height={400}*/}
            {/*                                                />*/}


            {/*                                        </div>*/}
            {/*                                    ))}*/}
            {/*                                </div>*/}
            {/*                                /!*<ScrollBar orientation="horizontal" />*!/*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}


            {/*                </div>*/}
            {/*            </>*/}
            {/*        ) : (*/}
            {/*            <>*/}

            {/*                {value?.map((url) => (*/}
            {/*                    <div*/}
            {/*                        key={url}*/}
            {/*                        className="   relative w-[150px] h-[150px] rounded-md overflow-hidden cursor-pointer"*/}
            {/*                        title={url}*/}
            {/*                    >*/}
            {/*                        <div className="z-10 absolute top-2 right-2">*/}
            {/*                            <Button*/}
            {/*                                htmlType="button"*/}
            {/*                                onClick={() => onRemove(url)}*/}
            {/*                            >*/}
            {/*                                <Trash className="h-4 w-4"/>*/}
            {/*                            </Button>*/}
            {/*                        </div>*/}


            {/*                            <img className="object-cover" alt="Image" src={url}/>*/}

            {/*                    </div>*/}
            {/*                ))}*/}
            {/*            </>*/}
            {/*        )}*/}
            {/*    </React.Fragment>*/}
            {/*</div>*/}
            {/*{(valueLength < max) && (*/}
            {/*)}*/}
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





        </div>


    )
}