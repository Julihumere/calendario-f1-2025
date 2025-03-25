import React from "react";
import data from "../json/leaderBoardPilots.json";
import { useState } from "react";
import { useEffect } from "react";
export default function LeaderBoard() {
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [leaderBoardTeams, setLeaderBoardTeams] = useState([]);
  const [activeButton, setActiveButton] = useState("pilots");

  const getLeaderBoard = async () => {
    const result = data
      .map((item) => {
        return {
          name: item.name,
          points: item.points,
          team: item.team,
          number: item.number,
          nation: item.nation,
        };
      })
      .sort((a, b) => b.points - a.points);

    setLeaderBoard(result);
  };

  const getLeaderBoardTeams = async () => {
    const result = data.reduce((teams, pilot) => {
      const { team, points, cars } = pilot;

      if (!teams[team]) {
        teams[team] = {
          team: team,
          totalPoints: 0,
          cars: cars,
        };
      }

      teams[team].totalPoints += points;
      return teams;
    }, {});

    let resultArray = Object.values(result).sort(
      (a, b) => b.totalPoints - a.totalPoints
    );

    console.log(resultArray);

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
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="w-full text-left pl-10 py-4 text-5xl">Campeonatos</h1>
      <div className="w-[400px] h-[50px] flex items-center justify-around border-2 border-white rounded-2xl mb-4 relative overflow-hidden">
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
          <div className="w-[75%] flex items-center justify-around bg-[#101828] py-4 rounded-t-2xl border-b-2 border-white">
            <p className="w-full text-center text-2xl">N°</p>
            <p className="w-full text-center text-2xl">Nombre</p>
            <p className="w-full text-center text-2xl">Nacionalidad</p>
            <p className="w-full text-center text-2xl">Equipo</p>
            <p className="w-full text-center text-2xl">Puntos</p>
          </div>
          {leaderBoard.map((item, index) => {
            return (
              <div
                key={index}
                className="w-[75%] bg-[#101828] py-2  border-b-2 border-white flex items-center justify-around last:border-0 last:rounded-b-2xl"
              >
                <p className="w-full text-center text-lg">{item.number}</p>
                <p className="w-full text-center text-lg">{item.name}</p>
                <div className="w-full text-2xl flex items-center justify-center">
                  <img
                    src={item.nation}
                    alt={`Nacionalidad de ${item.name}`}
                    className="w-16 h-12 p-2"
                  />
                </div>

                <p className="w-full text-center text-lg">{item.team}</p>
                <p className="w-full text-center text-4xl text-primary">
                  {item.points}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center mb-4">
          <div className="w-[75%] flex items-center justify-around bg-[#101828] py-4 rounded-t-2xl border-b-2 border-white">
            <p className="w-full text-center text-2xl">Equipo</p>
            <p className="w-full text-center text-2xl">Puntos</p>
          </div>
          {leaderBoardTeams.map((item, index) => {
            return (
              <div
                key={index}
                className="w-[75%] bg-[#101828] py-2  border-b-2 border-white flex items-center justify-around last:border-0 last:rounded-b-2xl"
              >
                <div className="w-full text-2xl flex flex-col items-center justify-center">
                  <p
                    className="text-5xl font-bold"
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
  );
}
