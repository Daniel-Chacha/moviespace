
import { Screen } from "@/app/components/screen";

type PageProps={
    params:{
        id: string;
    }
}   
export default  function ScreenPage({params}: PageProps){
    const Id = parseInt(params.id, 10); //converts string to number
    const url= `https://consumentapi.vercel.app/anime/gogoanime/${Id}`
    console.log("Movie ID:", Id)

    return(
        <div className="bg-black min-h-screen relative">
            <Screen url={url} />
        </div>
    )
}