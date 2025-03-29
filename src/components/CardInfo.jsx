import React from "react";
import "../App.css";

export default function CardInfo({
  info,
  track2D,
  gpPast,
  loadingSpinner,
  dataGP,
}) {
  const { name, location, length, laps, distance, curves, lapRecord } = info;

  return (
    <div className="h-[750px] flex flex-col items-center justify-between text-white relative z-10">
      <div className="h-full w-full relative flex flex-col items-center justify-between rounded-2xl max-[500px]:w-[90%]">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray opacity-60 bg-[#101828] rounded-2xl -z-10"></div>
        {loadingSpinner ? (
          <div className="w-full h-full flex items-center justify-center">
            <div id="semiTransparenDiv" />
          </div>
        ) : gpPast ? (
          <div className="w-full bg-[#101828] overflow-hidden rounded-2xl p-4 flex flex-col items-center justify-between h-full">
            <div className="w-full flex items-center justify-around py-2 border-b-2 border-white">
              <p className="w-1/2 flex items-center justify-center text-lg">
                Posición
              </p>
              <p className="w-full flex items-center justify-center text-lg">
                Piloto
              </p>
              <p className="w-full flex items-center justify-center text-lg">
                Equipo
              </p>
              <p className="w-full flex items-center justify-center text-lg">
                Tiempo
              </p>
              <p className="w-1/2 mr-2 flex items-center justify-center text-lg">
                Puntos
              </p>
            </div>
            <div className="leaderBoard-info w-full h-full overflow-y-auto flex flex-col items-center justify-between">
              {dataGP?.leaderBoard?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full h-full bg-[#101828] py-2  border-b-2 border-white flex items-center justify-around last:border-0 last:rounded-b-2xl max-[500px]:w-[90%]"
                  >
                    <p className="w-1/2 text-center text-lg max-[500px]:text-sm">
                      {item.position}
                    </p>
                    <p className="w-full text-center text-lg max-[500px]:text-sm">
                      {item.driver}
                    </p>
                    <div className="w-full flex items-center justify-center">
                      <img
                        src={`/teams/${item.team}.avif`}
                        alt={item.team}
                        className="w-10 h-10 rounded-full mr-2"
                      />
                    </div>

                    <p className="w-full text-center text-lg max-[500px]:text-sm">
                      {item.time}
                    </p>
                    <p className="w-1/2 text-center text-3xl text-primary max-[500px]:text-2xl">
                      {item.points}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-10">
            <h1
              className="w-full text-4xl font-bold text-white text-center max-[500px]:text-2xl"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
            >
              {name}
            </h1>
            <div className="flex items-center justify-center w-full mt-4">
              <img
                src={track2D}
                alt={name}
                className="w-full h-full rounded-2xl"
              />
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
                <span className="text-2xl font-semibold text-primary">
                  Curvas:
                </span>{" "}
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
        )}
      </div>
    </div>
  );
}
