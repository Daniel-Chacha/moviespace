
import { Screen } from "@/app/components/screen";

type PageProps={
    params:{
        id: string;
    }
}
export default  function ScreenPage({params}: PageProps){
    const Id = parseInt(params.id, 10); //converts string to number
    console.log("Movie ID:", Id)

    return(
        <div className="bg-black min-h-screen relative">
            <Screen id={Id} />
        </div>
    )
}