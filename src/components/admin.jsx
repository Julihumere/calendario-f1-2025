/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import data from "../json/data.json";
import dataLeaderBoard from "../json/leaderBoardPilots.json";

export default function Admin() {
  const [vista, setVista] = useState(true);
  const [admin, setAdmin] = useState({
    user: "",
    password: "",
  });

  const [circuits, setCircuits] = useState([]);
  const [teams, setTeams] = useState([]);
  const [circuitSelected, setCircuitSelected] = useState(null);

  const [drivers, setDrivers] = useState(
    Array(20).fill({
      position: 0,
      driver: "",
      team: "",
      laps: 0,
      time: "",
      points: 0,
    })
  );

  const handleChangeLogin = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeDriver = (index, e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);

    const newState = [...drivers];
    newState[index][name] = value;
    setDrivers(newState);
  };

  const handleLogin = () => {
    if (admin.user === "admin" && admin.password === "admin") {
      setVista(true);
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  const handleSelectCircuit = (id) => {
    const selectedCircuit = circuits.find((item) => item.id === id);

    if (selectedCircuit?.results) {
      setDrivers(
        selectedCircuit.results?.leaderBoard.map((driver) => {
          return {
            driver: driver.driver,
            team: driver.teamLogo,
            position: driver.position,
            laps: driver.laps,
            time: driver.time,
            points: driver.points,
          };
        })
      );
    } else {
      setDrivers(
        teams?.map((driver) => {
          return {
            driver: driver.name,
            team: driver.teamLogo,
            position: 0,
            laps: 0,
            time: 0,
            points: 0,
          };
        })
      );
    }
  };

  useEffect(() => {
    setCircuits(data);
    setTeams(dataLeaderBoard);
  }, [vista]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4 bg-[#0D0D0D] text-white">
      {vista ? (
        <div className="w-full h-full flex flex-col justify-center items-center gap-4">
          <div className="w-full flex justify-between items-center px-12 py-5 z-10">
            <button className="border-2 border-gray-600 self-start ml-5 py-2 px-5 rounded-md hover:bg-gray-600 hover:text-white transition duration-300 ease-in-out cursor-pointer">
              Volver
            </button>
            <button>
              <h1 className="border-2 border-gray-600 self-end mr-5 py-2 px-5 rounded-md hover:bg-gray-600 hover:text-white transition duration-300 ease-in-out cursor-pointer">
                Guardar
              </h1>
            </button>
          </div>
          <div className="w-full h-[90%] flex justify-center items-center gap-4">
            <section className="w-1/4 h-full flex flex-col items-center justify-around overflow-y-scroll">
              {circuits.length > 0 &&
                circuits.map((item) => (
                  <button
                    key={item.id}
                    className="w-[90%] py-2 mb-4 border-2 border-gray-600 self-center rounded-md hover:bg-gray-600 hover:text-white transition duration-300 ease-in-out cursor-pointer"
                    onClick={() => handleSelectCircuit(item.id)}
                  >
                    {item.name}
                  </button>
                ))}
            </section>
            <section className="w-3/4 h-full flex flex-col">
              <div className="w-full flex items-center justify-around px-12 z-10">
                <h4 className="w-1/4 py-2 text-center border-[1px] border-gray-400">
                  Piloto
                </h4>
                <h4 className="w-1/4 py-2 text-center border-[1px] border-gray-400">
                  Posición
                </h4>
                <h4 className="w-1/4 py-2 text-center border-[1px] border-gray-400">
                  Vueltas
                </h4>
                <h4 className="w-1/4 py-2 text-center border-[1px] border-gray-400">
                  Tiempo
                </h4>
                <h4 className="w-1/4 py-2 text-center border-[1px] border-gray-400">
                  Puntos
                </h4>
              </div>
              <div className="w-full h-full flex flex-col items-center justify-around px-12 z-10">
                {drivers &&
                  drivers?.map((item, index) => (
                    <div
                      key={item.driver}
                      className="flex items-center justify-around w-full"
                    >
                      <h4 className="w-1/4 py-2 text-center border-[1px] border-gray-400">
                        {item.driver}
                      </h4>
                      <input
                        className="w-1/4 py-2 text-center border-[1px] border-gray-400"
                        type="text"
                        value={item.position}
                        name="position"
                        onChange={(e) => handleChangeDriver(index, e)}
                      />
                      <input
                        className="w-1/4 py-2 text-center border-[1px] border-gray-400"
                        type="text"
                        value={item.laps}
                        name="laps"
                        onChange={(e) => handleChangeDriver(index, e)}
                      />
                      <input
                        className="w-1/4 py-2 text-center border-[1px] border-gray-400"
                        type="text"
                        value={item.time}
                        name="time"
                        onChange={(e) => handleChangeDriver(index, e)}
                      />
                      <input
                        className="w-1/4 py-2 text-center border-[1px] border-gray-400"
                        type="text"
                        value={item.points}
                        name="points"
                        onChange={(e) => handleChangeDriver(index, e)}
                      />
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="w-1/4 h-1/4 flex flex-col justify-center items-center gap-4">
          <label
            htmlFor=""
            className="w-1/2 flex flex-col items-start text-center"
          >
            Usuario
            <input
              type="text"
              name="user"
              placeholder="Usuario"
              value={admin.user}
              onChange={handleChangeLogin}
              className="w-full h-10  text-white border-2 border-gray-400 rounded-md p-2 outline-none mt-2"
            />
          </label>
          <label
            htmlFor=""
            className="w-1/2 flex flex-col items-start text-center"
          >
            Contraseña
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={admin.password}
              onChange={handleChangeLogin}
              className="w-full h-10  text-white border-2 border-gray-400 rounded-md p-2 outline-none mt-2"
            />
          </label>
          <button
            onClick={handleLogin}
            className="border-2 border-gray-600 py-2 px-5 rounded-md hover:bg-gray-600 hover:text-white transition duration-300 ease-in-out cursor-pointer"
          >
            Entrar
          </button>
        </div>
      )}
    </div>
  );
}
