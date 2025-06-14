import Image from "next/image"
import Link from "next/link";
import { SearchTmDb } from "./searchTmdb";
import { usePathname } from "next/navigation";


export const Header = ({showTitle= false ,showNavbar= false}) =>{
    const pathname = usePathname()
    const isInAnimePage = pathname.startsWith('/pages/anime')
    return(
        <header className="flex flex-row justify-center items-center relative py-5  ">

            <Link className="absolute left-10"  href="/">
                <Image  width={80} height={80} src="/images/logo.png" alt="Movie Space logo"></Image>
            </Link>

            {showTitle &&(
                <h1 className="text-8xl italianno">MovieSpace</h1>
            )}

            {showNavbar && (
                <nav className="w-[60vw] flex flex-row justify-evenly">
                    <Link href="/pages/movies">Movies</Link>
                    <Link href="/pages/series">Series</Link>
                    <Link href="/pages/anime">Anime</Link>
                    <Link href="/pages/animations">Animations</Link>
                    <Link href="/pages/about">About</Link>
                </nav>
                
            )}

            {showNavbar && !isInAnimePage && (
                //  <input className="border-[1px] border-cyan-300 pl-3 rounded-md "  type="search" name="Search" id="Search" placeholder="Search ..."/>
                <SearchTmDb />
            )}
           
        </header>
    )
}