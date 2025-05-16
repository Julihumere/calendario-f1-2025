import React from "react";
import data from "../json/leaderBoardPilots.json";
import { useState } from "react";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
export default function LeaderBoard({ loading }) {
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [leaderBoardTeams, setLeaderBoardTeams] = useState([]);
  const [activeButton, setActiveButton] = useState("pilots");

  const getLeaderBoard = async () => {
    const result = data.map((item) => {
      // Filtrar solo posiciones numéricas para calcular la mejor posición
      const validPositions = item.positions.filter(
        (pos) => typeof pos === "number"
      );
      const bestPosition =
        validPositions.length > 0 ? Math.min(...validPositions) : Infinity;
      const dnfCount = item.positions.filter((pos) => pos === "DNF").length;
      const dsqCount = item.positions.filter((pos) => pos === "DSQ").length;

      return {
        ...item,
        bestPosition,
        dnfCount,
        dsqCount,
      };
    });

    const sortedDrivers = result.sort((a, b) => {
      // 1. Ordenar por puntos (descendente)
      if (b.points !== a.points) {
        return b.points - a.points;
      }

      // 2. Ordenar por mejor posición (ascendente)
      if (a.bestPosition !== b.bestPosition) {
        return a.bestPosition - b.bestPosition;
      }

      // 3. Ordenar por menos DNF (ascendente)
      if (a.dnfCount !== b.dnfCount) {
        return a.dnfCount - b.dnfCount;
      }

      // 4. Ordenar por menos DSQ (ascendente)
      return a.dsqCount - b.dsqCount;
    });

    setLeaderBoard(sortedDrivers);
  };

  const getLeaderBoardTeams = async () => {
    const result = data.reduce((teams, pilot) => {
      const { team, points, cars, positions } = pilot;

      if (!teams[team]) {
        teams[team] = {
          team: team,
          totalPoints: 0,
          cars: cars,
          dsqCount: 0, // Contador de descalificaciones
        };
      }

      teams[team].totalPoints += points;
      teams[team].dsqCount += positions.filter((pos) => pos === "DSQ").length;

      return teams;
    }, {});

    let resultArray = Object.values(result).sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints; // Ordenar por puntos
      }
      return a.dsqCount - b.dsqCount; // Si hay empate, el equipo con más DSQ queda abajo
    });

    setLeaderBoardTeams(resultArray);
  };

  useEffect(() => {
    getLeaderBoard();
    getLeaderBoardTeams();
  }, []);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  return (
    <>
      {loading ? (
        <div className="w-full flex flex-col items-center justify-around px-12 py-5 z-10 max-[500px]:flex-col">
          <Skeleton
            width={250}
            height={60}
            style={{ position: "absolute", left: 70 }}
          />
          <Skeleton
            width={300}
            height={50}
            borderRadius={50}
            style={{ marginTop: 50, marginBottom: 50 }}
          />
          <Skeleton width={900} height={1000} />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="w-full text-left pl-10 py-4 text-5xl max-[500px]:text-3xl">
            Campeonatos
          </h1>
          <div className="w-[400px] h-[50px] flex items-center justify-around border-2 border-white rounded-2xl mb-4 relative overflow-hidden max-[500px]:w-[90%]">
            <div
              className={`absolute h-full rounded-2xl transition-transform duration-500 ease-in-out w-1/2 bg-primary ${
                activeButton === "pilots"
                  ? "transform -translate-x-1/2"
                  : "transform translate-x-1/2"
              }`}
            ></div>
            <button
              id="pilots"
              className={`w-1/2 h-full rounded-2xl relative z-10 text-gray-300 ${
                activeButton === "pilots" ? "text-white" : ""
              }`}
              onClick={() => handleButtonClick("pilots")}
            >
              Pilotos
            </button>
            <button
              id="teams"
              className={`w-1/2 h-full rounded-2xl relative z-10 text-gray-300 ${
                activeButton === "teams" ? "text-white" : ""
              }`}
              onClick={() => handleButtonClick("teams")}
            >
              Equipos
            </button>
          </div>

          {activeButton === "pilots" ? (
            <div className="w-full h-full flex flex-col items-center justify-center mb-4">
              <div className="w-[75%] flex items-center justify-around bg-[#101828] py-4 rounded-t-2xl border-b-2 border-white max-[500px]:w-[90%]">
                <p className="w-full text-center text-2xl max-[500px]:text-sm">
                  N°
                </p>
                <p className="w-full text-center text-2xl max-[500px]:text-sm">
                  Nombre
                </p>
                <p className="w-full text-center text-2xl max-[500px]:text-sm">
                  Nacionalidad
                </p>
                <p className="w-full text-center text-2xl max-[500px]:text-sm">
                  Equipo
                </p>
                <p className="w-full text-center text-2xl max-[500px]:text-sm">
                  Puntos
                </p>
              </div>
              {leaderBoard.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-[75%] bg-[#101828] py-2  border-b-2 border-white flex items-center justify-around last:border-0 last:rounded-b-2xl max-[500px]:w-[90%]"
                  >
                    <p className="w-full text-center text-2xl max-[500px]:text-sm">
                      {item.number}
                    </p>
                    <p className="w-full text-center text-2xl max-[500px]:text-sm">
                      {item.name}
                    </p>
                    <div className="w-full text-2xl flex items-center justify-center">
                      <img
                        src={item.nation}
                        alt={`Nacionalidad de ${item.name}`}
                        className="w-12 h-8 rounded-sm max-[500px]:w-10 max-[500px]:h-8"
                      />
                    </div>

                    <p className="w-full text-center text-2xl max-[500px]:text-sm">
                      {item.team}
                    </p>
                    <p className="w-full text-center text-4xl text-primary max-[500px]:text-2xl">
                      {item.points}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center mb-4">
              <div className="w-[75%] flex items-center justify-around bg-[#101828] py-4 rounded-t-2xl border-b-2 border-white max-[500px]:w-[90%]">
                <p className="w-full text-center text-2xl">Equipo</p>
                <p className="w-full text-center text-2xl">Puntos</p>
              </div>
              {leaderBoardTeams.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-[75%] bg-[#101828] py-2  border-b-2 border-white flex items-center justify-around last:border-0 last:rounded-b-2xl max-[500px]:w-[90%]"
                  >
                    <div className="w-full text-2xl flex flex-col items-center justify-center">
                      <p
                        className="text-5xl font-bold text-center max-[700px]:text-3xl max-[500px]:text-2xl"
                        style={{ textShadow: "4px 6px black" }}
                      >
                        {item.team}
                      </p>
                      <img
                        src={item.cars}
                        alt={`Logo de ${item.team}`}
                        className="w-72"
                      />
                    </div>
                    <p className="w-full text-center text-8xl text-primary">
                      {item.totalPoints}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
