import { Header } from "./header"
import { Genres } from "./genres"
export default function Movies(){
    return(
        <div>
            <Header showNavbar={true} />

            <div className="border-t-[1.5px] border-cyan-300">
                <Genres sectionName= "Movies"/>
            </div>
            
        </div>
    )
}