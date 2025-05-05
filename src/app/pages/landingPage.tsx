import { Header } from "../components/header"
import Link from "next/link";

export const  LandingPage =() =>{
    return(
        <div >
            <Header showTitle={true} />

            <div className="relative">
                <p className="text-center mt-10">Over a million movies, series, anime and animations now within reach.</p>

                <div className="absolute right-20">
                <Link className="" href="/pages/movies">
                    <button className="cursor-pointer font-semibold bg-[#120932] p-3 text-cyan-300 border-2 border-cyan-300" type="button">Watch Now</button>
                </Link>
                    
                </div>
            </div>
        </div>
    )
}