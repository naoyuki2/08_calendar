'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const searchParams = useSearchParams()
    const year = searchParams.get('year')
    const month = searchParams.get('month')
    const day = searchParams.get('day')
    return (
        <>
            <div>page</div>
            <div>{year}</div>
            <div>{month}</div>
            <div>{day}</div>
        </>
    )
}

export default page
