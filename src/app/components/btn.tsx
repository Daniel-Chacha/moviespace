
interface BtnProps{
    label: string,
    method?: (e: React.MouseEvent) => void
}
export const Btn = ({label, method}: BtnProps) =>{
    const handleClick =(e: React.MouseEvent) =>{
        e.stopPropagation();    //To prevent event bubbling
        method?.(e); //fires the method if provided
    }
    return(
        <button className="cursor-pointer font-semibold bg-[#120932] p-3 text-cyan-300 border-2 border-cyan-300" onClick={handleClick} type="button">{label}</button>
    )
}