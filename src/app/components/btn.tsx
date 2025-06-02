
interface BtnProps{
    label: string,
    method: () => void
}
export const Btn = ({label, method}: BtnProps) =>{
    return(
        <button className="cursor-pointer font-semibold bg-[#120932] p-3 text-cyan-300 border-2 border-cyan-300" onClick={method} type="button">{label}</button>
    )
}