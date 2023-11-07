'use client'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Page() {
    const searchParams = usePathname()
    const urlParts = searchParams.split('/');



    const [searchString, setSearchString] = useState(urlParts[urlParts.length - 1]);
    useEffect(() => {


    }, [searchParams])
    return (
        <div>
            Search : {searchString}
        </div>
    )
}

// Slice
//2 andey
// pancil or rabar