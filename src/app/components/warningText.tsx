'use client'
 
import { Btn } from "./btn"

interface WarningTextProps{
    msg: string,
    func: () => void,
}

export const WarningText: React.FC<WarningTextProps> =({msg, func}) =>{
    return(
        <div className="fixed inset-0 bg-[#00000090] z-50 flex flex-row items-center justify-center p-4 cursor-default">
            <div className="bg-[#121212]  rounded-lg shadow-lg  w-[50vw] relative p-2">
                
                <p className="p-3 border-l-4 border-dotted border-l-cyan-300 text-white  font-semibold">{msg}</p>
                <div className="flex items-center justify-center">
                    <Btn label={"OK"} method={func} />
                </div>
            </div>
        </div>
    )
}