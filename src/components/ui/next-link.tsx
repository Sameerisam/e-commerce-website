"use client";
import Link from "next/link"
import { ComponentProps, FC } from "react"

export const NextLink:FC< ComponentProps<typeof Link>>=({children,...props})=>{
    return (
        <Link {...props}>
            {children}
        </Link>
    )
}