import React from "react";

export default function CardInfo({ info, track2D }) {
  const { name, location, length, laps, distance, curves, lapRecord } = info;

  return (
    <div className="h-[750px] flex flex-col items-center justify-between text-white relative z-10">
      <div className="h-full w-full relative flex flex-col items-center justify-between rounded-2xl p-10 max-[500px]:w-[90%]">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 opacity-60 rounded-2xl -z-10"></div>
        <h1
          className="w-full text-4xl font-bold text-white text-center max-[500px]:text-2xl"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
        >
          {name}
        </h1>
        <div className="flex items-center justify-center w-full mt-4">
          <img src={track2D} alt={name} className="w-full h-full rounded-2xl" />
        </div>
        <ul className="w-full text-left mt-4">
          <li className="text-2xl text-white">
            <span className="text-2xl font-semibold text-primary">
              Localización:
            </span>{" "}
            {location}
          </li>
          <li className="text-2xl text-white">
            <span className="text-2xl font-semibold text-primary">
              Longitud del circuito:
            </span>{" "}
            {length}
          </li>
          <li className="text-2xl text-white">
            <span className="text-2xl font-semibold text-primary">
              Vueltas:
            </span>{" "}
            {laps}
          </li>
          <li className="text-2xl text-white">
            <span className="text-2xl font-semibold text-primary">
              Distancia:
            </span>{" "}
            {distance}
          </li>
          <li className="text-2xl text-white">
            <span className="text-2xl font-semibold text-primary">Curvas:</span>{" "}
            {curves}
          </li>
          <li className="text-2xl text-white">
            <span className="text-2xl font-semibold text-primary">
              Vuelta record:
            </span>{" "}
            {lapRecord}
          </li>
        </ul>
      </div>
    </div>
  );
}
