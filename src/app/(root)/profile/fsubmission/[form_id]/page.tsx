'use client';
import * as React from "react";
import FSubmissionForm from "@/components/form/submission-form";
import {useAuth} from "@/lib/hooks/use-auth";

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