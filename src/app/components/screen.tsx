'use client'

import { useRouter } from 'next/navigation';
import { Btn } from "./btn";

type DisplayProps = {
  id: number;
};

export const Screen = ({ id }: DisplayProps) => {
  const router = useRouter();
  return (
    <div className="w-full h-screen bg-black flex justify-center items-center relative">
      <div className="w-full max-w-5xl aspect-video rounded overflow-hidden shadow-lg">
        <iframe
        title='movie'
          src={`https://vidsrc.xyz/embed/movie/${id}/`}
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>

      <div className="absolute top-3 left-5">
          <Btn label={"<"} method={() => router.back()}/>
      </div>
    </div>
  );
};
