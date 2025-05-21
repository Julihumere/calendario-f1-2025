import React from "react";

export default function Replay({ video, loading, gp }) {
  return (
    <div className="w-full p-10 flex flex-col items-center justify-center">
      <h1 className="w-full text-left pl-10 py-4 text-5xl max-[500px]:text-3xl">
        Mejores momentos del {gp}
      </h1>
      <lite-youtube videoid={video} className="max-w-3xl"></lite-youtube>
    </div>
  );
}
