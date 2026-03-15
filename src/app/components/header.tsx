'use client'
import Image from "next/image"
import Link from "next/link";
import { SearchTmDb } from "./searchTmdb";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
    { href: '/movies',     label: 'Movies' },
    { href: '/series',     label: 'Series' },
    { href: '/anime',      label: 'Anime' },
    { href: '/animations', label: 'Animations' },
    { href: '/about',      label: 'About' },
];

export const Header = ({ showTitle = false, showNavbar = false }) => {
    const [showNav, setShowNav] = useState<boolean>(false);
    const pathname = usePathname();

    const isInAnimePage = pathname.startsWith('/anime');
    const isInAboutPage = pathname.startsWith('/about');
    const isActive = (href: string) => pathname.startsWith(href);

    return (
        <header className="relative w-full">
            {/* ── Main bar ── */}
            <div className="flex items-center justify-between px-4 py-3 md:px-10 md:py-5">

                {/* Logo */}
                <Link href="/" className="flex-shrink-0 z-10">
                    <Image
                        src="/images/logo.png"
                        alt="Movie Prime logo"
                        width={60} height={60}
                        className="md:w-[80px] md:h-[80px] w-[48px] h-[48px]"
                    />
                </Link>

                {/* Title (landing page only) */}
                {showTitle && (
                    <h1 className="absolute left-1/2 -translate-x-1/2 text-6xl sm:text-8xl italianno underline decoration-[5px] decoration-cyan-300 underline-offset-8 decoration-dotted whitespace-nowrap">
                        MoviePrime
                    </h1>
                )}

                {/* Desktop: centered nav */}
                {showNavbar && (
                    <nav className="hidden md:flex flex-row gap-8 absolute left-1/2 -translate-x-1/2">
                        {NAV_LINKS.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`relative pb-1 transition-colors duration-200 ${
                                    isActive(href)
                                        ? 'text-cyan-300 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-cyan-300 after:rounded'
                                        : 'text-white hover:text-cyan-300'
                                }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                )}

                {/* Right side */}
                <div className="flex items-center gap-3 z-10">
                    {/* Desktop search */}
                    {showNavbar && !isInAnimePage && !isInAboutPage && (
                        <div className="hidden md:block">
                            <SearchTmDb />
                        </div>
                    )}

                    {/* Mobile hamburger / close toggle */}
                    {showNavbar && (
                        <button
                            onClick={() => setShowNav(!showNav)}
                            aria-label={showNav ? 'Close menu' : 'Open menu'}
                            className="md:hidden text-cyan-300 p-1 rounded transition-colors hover:bg-cyan-300/10"
                        >
                            {showNav ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 6h18M3 12h18M3 18h18" />
                                </svg>
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* ── Mobile dropdown ── */}
            {showNavbar && showNav && (
                <div className="md:hidden absolute top-full left-0 right-0 z-50 bg-black border-t border-cyan-300/20 shadow-xl px-4 pt-3 pb-5 flex flex-col gap-1">

                    {/* Search inside dropdown */}
                    {!isInAnimePage && !isInAboutPage && (
                        <div className="mb-3">
                            <SearchTmDb />
                        </div>
                    )}

                    {NAV_LINKS.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setShowNav(false)}
                            className={`py-2.5 px-3 rounded-md transition-colors duration-200 text-sm font-medium ${
                                isActive(href)
                                    ? 'text-cyan-300 font-bold border-l-2 border-cyan-300 pl-3 bg-cyan-300/5'
                                    : 'text-gray-300 hover:text-cyan-300 hover:bg-white/5'
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}
