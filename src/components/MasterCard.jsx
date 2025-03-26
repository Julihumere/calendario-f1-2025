import React from "react";

export default function MasterCard({ thisWeekend }) {
  let thursday = thisWeekend?.thursday ? thisWeekend?.thursday : [];
  let sunday = thisWeekend?.sunday ? thisWeekend?.sunday : [];

  return (
    <main>
      <div className="h-[750px] flex flex-col items-center justify-between text-white relative z-10">
        <div className="h-full w-full relative flex flex-col items-center px-5 justify-center rounded-2xl max-[500px]:w-[90%] max-[500px]:p-5">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 opacity-60 rounded-2xl -z-10"></div>
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
      </div>
    </main>
  );
}
