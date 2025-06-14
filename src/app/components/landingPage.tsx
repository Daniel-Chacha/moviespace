import { Header } from "./header"
import Link from "next/link";
import ImageCarousel from "./carousel";
import { Footer } from "./footer";

export const  LandingPage =() =>{
    return(
        <div className="h-[100vh]">
            <Header showTitle={true} />

            <div className="relative h-[65vh] w-full">
                <p className="text-center my-5 ">Over a million movies, series, anime and animations now within reach.</p>

                <div className="h-fit w-[100vw]">
                    <ImageCarousel />
                </div>
                
                <div className=" absolute  bottom-10 right-20">
                <Link href="/pages/movies">
                    <button className="cursor-pointer font-semibold bg-[#120932] p-3 text-cyan-300 border-2 border-cyan-300" type="button">.EXPLORE.</button>
                </Link>                    
                </div>
            </div>

            <Footer />
        </div>
    )
}