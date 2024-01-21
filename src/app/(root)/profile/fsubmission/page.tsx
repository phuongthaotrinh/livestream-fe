'use client';
import * as React from "react";
import {FormsubmissionShell} from "@/components/shells/formsubmission-shell";


export default function ProfileForms() {

    return (
        <>
            <FormsubmissionShell page_desc="Manage your forms submission" page_title="Forms list" isClientMode={true} />
        </>
    )
}