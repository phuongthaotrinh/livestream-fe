'use client';
import * as React from "react";
import FSubmissionForm from "@/components/form/submission-form";

interface IParams extends React.PropsWithChildren {
    params: {
        form_id: number
    }
}

export default function FSubmissionFormUser({params}:IParams) {


    return (
        <>
            <FSubmissionForm params={params} />
        </>
    )
}