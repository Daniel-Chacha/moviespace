'use client'

export const Footer = () =>{
    return(      
        <footer className="w-full max-sm:h-[5vh] bg-black p-3 border-t-2 border-t-cyan-300">
            <p className="text-cyan-300 text-center">&copy; MovieSpace {new Date().getFullYear()} .All rights reserved.</p>
        </footer>
      
    )
}