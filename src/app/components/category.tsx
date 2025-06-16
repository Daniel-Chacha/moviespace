'use client'
import { Item } from "./item"
import { Movie } from "./interfaces"

type CategoryProps = {
  category_name: string;
  content: Movie[];
};
 

export const Category= ({category_name, content}:CategoryProps) =>{

    return(
        <div className="mt-5">
            <p className="text-2xl mb-2 text-cyan-300 font-bold"> {category_name}</p>
            <div className=" flex flex-row gap-4 overflow-x-auto h-[220px] horizontal-scrollbar custom-scrollbar">
                {content.map((item) =>(
                    <Item key={item.id} itemsContent={item} />
                ))}
                
            </div>
            
        </div>
    )
}