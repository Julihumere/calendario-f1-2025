import "../App.css";
import React, { useState } from "react";
import { LuAlarmClock } from "react-icons/lu";
export default function MasterCard({
  thisWeekend,
  gpPast,
  loadingSpinner,
  setDataGP,
  dataGP,
  setRace,
}) {
  const [activeButton, setActiveButton] = useState("gp");
  let thursday = thisWeekend?.thursday ? thisWeekend?.thursday : [];
  let sunday = thisWeekend?.sunday ? thisWeekend?.sunday : [];

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
    setRace(buttonId);
    if (buttonId === "gp") {
      setDataGP(thisWeekend?.results);
    } else if (buttonId === "sprint") {
      setDataGP(thisWeekend?.resultsSprint);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between text-white relative z-10">
      <div className="h-[750px] w-full relative flex flex-col items-center justify-between rounded-2xl max-[500px]:h-full max-[500px]:w-[100%]">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray opacity-60 bg-[#101828] rounded-2xl -z-10"></div>
        {loadingSpinner ? (
          <div className="w-full h-[750px] flex items-center justify-center">
            <div id="semiTransparenDiv" />
          </div>
        ) : gpPast ? (
          <div className="w-full h-full flex flex-col items-center justify-start py-10">
            <div className="w-full flex items-center justify-center">
              {thisWeekend.sprint && (
                <div className="w-[400px] h-[50px] flex items-center justify-around border-2 border-white rounded-2xl mb-4 relative overflow-hidden">
                  <div
                    className={`absolute h-full rounded-2xl transition-transform duration-500 ease-in-out w-1/2 bg-primary ${
                      activeButton === "gp"
                        ? "transform -translate-x-1/2"
                        : "transform translate-x-1/2"
                    }`}
                  ></div>
                  <button
                    id="gp"
                    className={`w-1/2 h-full rounded-2xl relative text-gray-300 ${
                      activeButton === "gp" ? "text-white" : ""
                    } cursor-pointer`}
                    onClick={() => handleButtonClick("gp")}
                  >
                    Gran Premio
                  </button>
                  <button
                    id="sprint"
                    className={`w-1/2 h-full rounded-2xl relative text-gray-300 ${
                      activeButton === "sprint" ? "text-white" : ""
                    } cursor-pointer`}
                    onClick={() => handleButtonClick("sprint")}
                  >
                    Sprint
                  </button>
                </div>
              )}
            </div>

            <div className="w-full flex flex-col p-5 items-center justify-evenly">
              <h1 className="text-4xl">Pole position</h1>
              <div className="w-full flex items-center justify-start p-3 mb-2 mt-3 border-4 border-gray-800 rounded-lg">
                <LuAlarmClock
                  size={40}
                  color="white"
                  className="bg-[#FF00FF] p-1"
                />

                <h2 className="text-3xl font-bold text-white text-center ml-4 max-[500px]:text-2xl">
                  {dataGP?.polePosition?.driver} - {dataGP?.polePosition?.time}{" "}
                  - {dataGP?.polePosition?.team}
                </h2>
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-evenly">
              <h1 className="text-4xl">Podium</h1>
              <div className="relative w-full h-[400px] flex flex-col items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                  {dataGP.podium[2] && (
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center justify-center">
                        <img src="/podium/3.webp" className="w-8" />
                        <h3 className="text-2xl">{dataGP.podium[2].driver}</h3>
                      </div>
                      <img
                        src={`${dataGP.podium[2].photo}`}
                        className="w-[300px] max-w-full h-auto mask-fade-bottom"
                      />
                    </div>
                  )}
                  {dataGP.podium[1] && (
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center justify-center">
                        <img src="/podium/2.webp" className="w-8" />
                        <h3 className="text-2xl">{dataGP.podium[1].driver}</h3>
                      </div>
                      <img
                        src={`${dataGP.podium[1].photo}`}
                        className="w-[300px] max-w-full h-auto mask-fade-bottom"
                      />
                    </div>
                  )}
                </div>
                <div className="absolute top-0 w-full h-full flex items-center justify-center">
                  {dataGP.podium[0] && (
                    <div className="absolute bottom-0 w-full flex flex-col-reverse items-center justify-center">
                      <div className="flex items-center justify-center mt-4">
                        <img src="/podium/1.webp" className="w-8" />
                        <h3 className="text-2xl">{dataGP.podium[0].driver}</h3>
                      </div>
                      <img
                        src={`${dataGP.podium[0].photo}`}
                        className="w-[300px] max-w-full h-auto mask-fade-bottom max-[500px]:w-[200px]"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-[750px] p-10 max-[500px]:p-5 flex flex-col items-center justify-between max-[500px]:h-full">
            <h1
              className="w-full text-4xl font-bold text-white text-center max-[500px]:text-2xl"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
            >
              {thisWeekend?.name} - {thisWeekend?.hashtag}
            </h1>
            <div className="w-full mt-4">
              {thursday.length === 0 ? null : (
                <h1 className="w-full bg-primary text-4xl py-2 px-4 font-black tracking-widest max-[500px]:text-2xl">
                  Jueves {thisWeekend?.weekend[0].split("-")[2]}
                </h1>
              )}
              {thisWeekend?.thursday
                ? thisWeekend?.thursday.map((item, index) => (
                    <div
                      key={index}
                      className="pl-4 w-full h-18 flex items-center border-b-[1px] border-white"
                    >
                      <h1 className="text-3xl text-secondary font-bold bg-white px-2 py-1 rounded-md max-[500px]:text-2xl">
                        {item.time}
                      </h1>
                      <h3 className="text-3xl text-white font-bold ml-4 max-[500px]:text-2xl">
                        {item.name}
                      </h3>
                    </div>
                  ))
                : null}
            </div>
            <div className="w-full mt-4">
              {thisWeekend?.weekend && (
                <h1 className="w-full bg-primary text-4xl py-2 px-4 font-black tracking-widest max-[500px]:text-3xl">
                  Viernes {thisWeekend.weekend[0].split("-")[2]}
                </h1>
              )}
              {thisWeekend?.friday.map((item, index) => (
                <div
                  key={index}
                  className="pl-4 w-full h-18 flex items-center border-b-[1px] border-white"
                >
                  <h1 className="text-3xl text-secondary font-bold bg-white px-2 py-1 rounded-md max-[500px]:text-2xl">
                    {item.time}
                  </h1>
                  <h3 className="text-3xl text-white font-bold ml-4 max-[500px]:text-2xl">
                    {item.name}
                  </h3>
                </div>
              ))}
            </div>
            <div className="w-full mt-4">
              {thisWeekend?.weekend && (
                <h1 className="w-full bg-primary text-4xl py-2 px-4 font-black tracking-widest max-[500px]:text-3xl">
                  Sabado {thisWeekend.weekend[1].split("-")[2]}
                </h1>
              )}
              {thisWeekend?.saturday.map((item, index) => (
                <div
                  key={index}
                  className="pl-4 w-full h-18 flex items-center border-b-[1px] border-white"
                >
                  <h1 className="text-3xl text-secondary font-bold bg-white px-2 py-1 rounded-md max-[500px]:text-2xl">
                    {item.time}
                  </h1>
                  <h3 className="text-3xl text-white font-bold ml-4 max-[500px]:text-2xl">
                    {item.name}
                  </h3>
                </div>
              ))}
            </div>
            <div className="w-full mt-4">
              {sunday.length === 0 ? null : (
                <h1 className="w-full bg-primary text-4xl py-2 px-4 font-black tracking-widest max-[500px]:text-2xl">
                  Domingo {thisWeekend.weekend[2].split("-")[2]}
                </h1>
              )}
              {thisWeekend?.sunday
                ? thisWeekend?.sunday.map((item, index) => (
                    <div
                      key={index}
                      className="pl-4 w-full h-18 flex items-center border-b-[1px] border-white"
                    >
                      <h1 className="text-3xl text-secondary font-bold bg-white px-2 py-1 rounded-md max-[500px]:text-2xl">
                        {item.time}
                      </h1>
                      <h3 className="text-3xl text-white font-bold ml-4 max-[500px]:text-2xl">
                        {item.name}
                      </h3>
                    </div>
                  ))
                : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
