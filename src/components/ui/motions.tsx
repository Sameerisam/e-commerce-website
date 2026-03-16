"use client";
 import {motion} from "framer-motion";
import { ComponentProps, FC } from "react";
export const MotionDiv:FC< ComponentProps<typeof motion.div>>=({children,...props})=>{
    return (
        <motion.div {...props}>
            {children}
        </motion.div>
    )

}
export const MotionH1:FC< ComponentProps<typeof motion.h1>>=({children,...props})=>{
    return (
        <motion.h1 {...props}>
            {children}
        </motion.h1>
    )
}

export const MotionP:FC< ComponentProps<typeof motion.p>>=({children,...props})=>{
    return (
        <motion.p {...props}>
            {children}
        </motion.p>
    )
}