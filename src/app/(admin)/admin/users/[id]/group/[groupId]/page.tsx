'use client'

import React from 'react';
import DetailGroupShell from "@/components/shells/detail-group-shell";

interface IParams extends React.PropsWithChildren {
    params: {
        id: number,
        groupId: number
    }
}


export default function AdminGroupDetail({params}: IParams) {

    return (
      <>
          <DetailGroupShell  params={params} key="admin_space" isPreview={false}/>
      </>
    )
}


