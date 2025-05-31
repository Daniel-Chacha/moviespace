import { Item } from "./item"


export const Category= ({category_name}:{category_name: string}, {content}: {content:string}) =>{
    return(
        <div >
            <p> {category_name}</p>
            <div className="bg-[#0E151D]">
                <Item />
            </div>
            
        </div>
    )
}