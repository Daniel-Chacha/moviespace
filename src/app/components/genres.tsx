'use client'

import { Category } from "./category"
import { Movie } from "./interfaces";

interface GenreProps{
    sectionName: string;
    categories: [string, Movie[]][];
}

export const Genres =({sectionName, categories}:GenreProps) =>{
    return(
        <div>
            <div>
                {categories.map(([name, content], index) =>(
                    <div key={index}><Category category_name={`${name} ${sectionName}` } content={content}  /></div>
                ))}
                
            </div>
        </div>
    )
}