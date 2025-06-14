'use client'

import { Header } from "./header"
import { LongAnimations } from "./longAnimations"
import { Footer } from "./footer"
import Scroll from "./scroll"

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
            <Scroll />
            <Footer />
        </div>
    )
}