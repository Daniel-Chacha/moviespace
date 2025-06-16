'use client'
import Image from "next/image"
import Link from "next/link";
import { SearchTmDb } from "./searchTmdb";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Header = ({showTitle= false ,showNavbar= false}) =>{
    const [showNav, setShowNav] = useState<boolean>(false);

    const pathname = usePathname()
    const isInAnimePage = pathname.startsWith('/pages/anime')
    const isInAboutPage = pathname.startsWith('/pages/about')
    const isInLandingPage = pathname.startsWith('/')


    return(
        <header className={`flex flex-row justify-center items-center relative py-5 max-sm:${isInLandingPage ? 'h-[15vh]' : 'h-[5vh]'} md:h-[15vh] max-sm:mt-0 max-lg:my-10 `}>

            <Link className="absolute left-10 max-lg:hidden" href="/">
                <Image  width={80} height={80} src="/images/logo.png" alt="Movie Prime logo"></Image>
            </Link>

            <Link className="absolute left-2 top-2 lg:hidden" href="/">
                <Image  width={60} height={60} src="/images/logo.png" alt="Movie Prime logo"></Image>
            </Link>

            {showTitle &&(
                <h1 className="text-8xl max-sm:text-6xl  italianno underline decoration-[5px] decoration-cyan-300 underline-offset-8 decoration-dotted ">MoviePrime</h1>
            )}

            {showNavbar && (
                <nav className="w-[60vw] flex flex-row justify-evenly max-sm:hidden">
                    <Link href="/pages/movies">Movies</Link>
                    <Link href="/pages/series">Series</Link>
                    <Link href="/pages/anime">Anime</Link>
                    <Link href="/pages/animations">Animations</Link>
                    <Link href="/pages/about">About</Link>
                </nav>                
            )}

            {showNavbar && !isInAnimePage && !isInAboutPage && (
                <SearchTmDb />
            )}

            {showNavbar && 
                 <svg onClick={() => setShowNav(!showNav)} className="absolute right-5 sm:hidden" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 16 16"><path fill="#67E8F9" d="M13 14.25a.75.75 0 0 1-1.5 0V3.56l-.72.72a.75.75 0 1 1-1.06-1.06l2-2a.75.75 0 0 1 1.06 0l2 2a.75.75 0 0 1-1.06 1.06L13 3.56zM2.75 13.5a.75.75 0 0 1 0-1.5h6.5a.75.75 0 0 1 0 1.5zm2-3a.75.75 0 0 1 0-1.5h4.5a.75.75 0 0 1 0 1.5zM6 6.75c0 .414.336.75.75.75h2.5a.75.75 0 0 0 0-1.5h-2.5a.75.75 0 0 0-.75.75"/></svg>
            }
           

            {showNavbar && showNav &&(
                <nav className=" absolute z-50 flex flex-col justify-evenly right-2 top-[100%] bg-black p-5 rounded-md font-semibold">
                    <Link className="py-1" href="/pages/movies">Movies</Link>
                    <Link className="py-1" href="/pages/series">Series</Link>
                    <Link className="py-1" href="/pages/anime">Anime</Link>
                    <Link className="py-1" href="/pages/animations">Animations</Link>
                    <Link href="/pages/about">About</Link>
                </nav>                
            )}
           
        </header>
    )
}