'use client'

import { Header } from "./header"
// import { useState, useEffect } from "react"
import { LongAnimations } from "./longAnimations"

export const Animations = () =>{

    return(
        <div>
            <Header showNavbar={true} />

            <div className="border-t-[1.5px] border-cyan-300">
                 <div></div>
                 <div>
                    <LongAnimations />
                 </div>
            </div>
        </div>
    )
}