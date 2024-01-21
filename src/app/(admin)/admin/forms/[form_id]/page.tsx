'use client';

import  FSubmissionForm from "@/components/form/submission-form"
interface IParams{
    params: {
        form_id: number
    }
}

export default function FSubmissionFormDetail({params}:IParams){
    return (
        <>
            <FSubmissionForm params={params} />
        </>
    )
}
