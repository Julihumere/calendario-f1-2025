import React from "react";
import { formaterDate } from "../utils/formatterDate";

export default function Cards({ name, img, weekend, active, id }) {
  return (
    <div className="w-full mx-8 h-80 relative flex flex-col items-center justify-between rounded-2xl max-[500px]:w-[90%]">
      <div
        style={{ backgroundColor: active !== id ? "#101828" : "#FF0000" }}
        className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 opacity-90 rounded-2xl z-10"
      ></div>
      <h1 className="w-full text-center pt-5 text-white text-2xl z-10">
        {name}
      </h1>
      <img
        src={img}
        alt={"Circuito de " + name}
        className="w-[90%] z-20 pointer-events-none"
      />
      <p
        style={{
          backgroundColor: active !== id ? "#101828" : "#Fe0000",
          borderBottomLeftRadius: "1rem",
          borderBottomRightRadius: "1rem",
        }}
        className="w-full flex items-center justify-center text-center py-2 text-white text-2xl z-10"
      >
        {active !== id ? formaterDate(weekend) : "Este fin de semana"}
      </p>
    </div>
  );
}
