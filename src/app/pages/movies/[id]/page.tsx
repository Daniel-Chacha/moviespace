import { Screen } from "@/src/app/components/screen";

type PageProps={
    params:{
        id: number;
    }
}
export default  function ScreenPage({params}: PageProps){
    // const Id = parseInt(params.id, 10); //converts string to number
    const url= `https://vidsrc.xyz/embed/movie/${params.id}/`
    // console.log("Movie ID:", Id)

    return(
        <div className="bg-black min-h-screen relative">
            <Screen url={url} />
        </div>
    )
}