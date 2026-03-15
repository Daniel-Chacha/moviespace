import { Header } from "./header"
import { Footer } from "./footer"

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/me.daniel.chacha/",
    title: "Instagram",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
        <path fill="currentColor" d="M7.03.084c-1.277.06-2.149.264-2.91.563a5.9 5.9 0 0 0-2.124 1.388a5.9 5.9 0 0 0-1.38 2.127C.321 4.926.12 5.8.064 7.076s-.069 1.688-.063 4.947s.021 3.667.083 4.947c.061 1.277.264 2.149.563 2.911c.308.789.72 1.457 1.388 2.123a5.9 5.9 0 0 0 2.129 1.38c.763.295 1.636.496 2.913.552c1.278.056 1.689.069 4.947.063s3.668-.021 4.947-.082c1.28-.06 2.147-.265 2.91-.563a5.9 5.9 0 0 0 2.123-1.388a5.9 5.9 0 0 0 1.38-2.129c.295-.763.496-1.636.551-2.912c.056-1.28.07-1.69.063-4.948c-.006-3.258-.02-3.667-.081-4.947c-.06-1.28-.264-2.148-.564-2.911a5.9 5.9 0 0 0-1.387-2.123a5.9 5.9 0 0 0-2.128-1.38c-.764-.294-1.636-.496-2.914-.55C15.647.009 15.236-.006 11.977 0S8.31.021 7.03.084m.14 21.693c-1.17-.05-1.805-.245-2.228-.408a3.7 3.7 0 0 1-1.382-.895a3.7 3.7 0 0 1-.9-1.378c-.165-.423-.363-1.058-.417-2.228c-.06-1.264-.072-1.644-.08-4.848c-.006-3.204.006-3.583.061-4.848c.05-1.169.246-1.805.408-2.228c.216-.561.477-.96.895-1.382a3.7 3.7 0 0 1 1.379-.9c.423-.165 1.057-.361 2.227-.417c1.265-.06 1.644-.072 4.848-.08c3.203-.006 3.583.006 4.85.062c1.168.05 1.804.244 2.227.408c.56.216.96.475 1.382.895s.681.817.9 1.378c.165.422.362 1.056.417 2.227c.06 1.265.074 1.645.08 4.848c.005 3.203-.006 3.583-.061 4.848c-.051 1.17-.245 1.805-.408 2.23c-.216.56-.477.96-.896 1.38a3.7 3.7 0 0 1-1.378.9c-.422.165-1.058.362-2.226.418c-1.266.06-1.645.072-4.85.079s-3.582-.006-4.848-.06m9.783-16.192a1.44 1.44 0 1 0 1.437-1.442a1.44 1.44 0 0 0-1.437 1.442M5.839 12.012a6.161 6.161 0 1 0 12.323-.024a6.162 6.162 0 0 0-12.323.024M8 12.008A4 4 0 1 1 12.008 16A4 4 0 0 1 8 12.008"/>
      </svg>
    ),
  },
  {
    href: "https://x.com/dan_mwita8",
    title: "X (Twitter)",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 14">
        <g fill="none"><g clipPath="url(#primeTwitter0)"><path fill="currentColor" d="M11.025.656h2.147L8.482 6.03L14 13.344H9.68L6.294 8.909l-3.87 4.435H.275l5.016-5.75L0 .657h4.43L7.486 4.71zm-.755 11.4h1.19L3.78 1.877H2.504z"/></g><defs><clipPath id="primeTwitter0"><path fill="#fff" d="M0 0h14v14H0z"/></clipPath></defs></g>
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/daniel-mwita-5b58102b5/",
    title: "LinkedIn",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
        <path fill="currentColor" d="M17.5 8.999a5.4 5.4 0 0 0-2.565.645A1 1 0 0 0 14 8.999h-4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-5.5a1 1 0 1 1 2 0v5.5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-7.5a5.507 5.507 0 0 0-5.5-5.5m3.5 12h-2v-4.5a3 3 0 1 0-6 0v4.5h-2v-10h2v.703a1 1 0 0 0 1.781.625A3.483 3.483 0 0 1 21 14.5Zm-14-12H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1m-1 12H4v-10h2ZM5.015 1.542a3.233 3.233 0 1 0-.057 6.457h.028a3.233 3.233 0 1 0 .029-6.457m-.029 4.457h-.028a1.222 1.222 0 0 1-1.37-1.228c0-.747.56-1.229 1.427-1.229A1.234 1.234 0 0 1 6.41 4.771c0 .746-.56 1.228-1.425 1.228"/>
      </svg>
    ),
  },
  {
    href: "https://discord.com/users/1237109150417158266",
    title: "Discord",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.1.1 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.1 16.1 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12"/>
      </svg>
    ),
  },
];

export const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showNavbar={true} />

      <main className="flex-1 border-t-[1.5px] border-cyan-300 flex flex-col items-center justify-center px-6 py-16 gap-12">

        {/* Quote card */}
        <div className="max-w-2xl w-full bg-white/5 border border-cyan-300/20 rounded-2xl p-8 text-center backdrop-blur-sm shadow-lg shadow-cyan-300/5">
          <svg className="mx-auto mb-4 text-cyan-300/40" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
            <path fill="currentColor" d="M11.192 15.757c0-.88-.23-1.618-.69-2.217c-.326-.412-.768-.683-1.327-.812c-.55-.128-1.07-.137-1.54-.028c-.16-.95.1-1.95.78-3c.53-.81 1.24-1.48 2.13-2.01L9.24 6c-1.52.93-2.65 2.03-3.38 3.32C5.12 10.6 4.75 11.93 4.75 13.28c0 1.4.41 2.53 1.23 3.38c.82.85 1.87 1.27 3.16 1.27c1.18 0 2.13-.36 2.84-1.08c.72-.73 1.07-1.65 1.01-2.77v.67zm8.56 0c0-.88-.23-1.618-.69-2.217c-.326-.42-.77-.692-1.327-.817c-.55-.124-1.07-.13-1.54-.022c-.16-.95.1-1.95.78-3c.53-.81 1.24-1.48 2.13-2.01L17.8 6c-1.52.93-2.65 2.03-3.38 3.32c-.74 1.28-1.11 2.61-1.11 3.96c0 1.4.41 2.53 1.23 3.38c.82.85 1.87 1.27 3.16 1.27c1.18 0 2.13-.36 2.84-1.08c.72-.73 1.07-1.65 1.01-2.77v.67z"/>
          </svg>
          <blockquote className="text-lg italic text-gray-200 leading-relaxed mb-4">
            The purpose of art is to wash the dust of daily life off our souls.
          </blockquote>
          <p className="text-cyan-300 font-semibold tracking-wider text-sm">— Pablo Picasso</p>
        </div>

        {/* About blurb */}
        <div className="max-w-xl w-full text-center text-gray-400 text-sm leading-relaxed">
          <p>
            <span className="text-cyan-300 font-semibold">MoviePrime</span> is a curated streaming discovery platform for movies, series, anime, and animations — built to keep the content you love always within reach.
          </p>
        </div>

        {/* Social links */}
        <div className="flex flex-col items-center gap-5">
          <p className="text-gray-400 text-sm tracking-widest uppercase">Connect</p>
          <div className="flex flex-row gap-4">
            {SOCIAL_LINKS.map(({ href, title, icon }) => (
              <a
                key={title}
                href={href}
                title={title}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-full border border-cyan-300/30 text-gray-400 hover:text-cyan-300 hover:border-cyan-300 hover:bg-cyan-300/10 transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
