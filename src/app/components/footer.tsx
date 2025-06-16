'use client'

export const Footer = () =>{
    return(      
        <footer className="w-full max-md:h-[5vh] bg-black mt-3 p-3 border-t-2 border-t-cyan-300">
            <p className="text-cyan-300 text-center">&copy; MoviePrime {new Date().getFullYear()} .All rights reserved.</p>
        </footer>
      
    )
}