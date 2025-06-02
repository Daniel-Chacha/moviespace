import { Header } from "./header"
import { Genres } from "./genres"

export const Series =() =>{
    return(
        <div>
            <Header showNavbar={true} />

            <div className="border-t-[1.5px] border-cyan-300">
                <Genres sectionName= "Series"/>
            </div>
        </div>
    )
}