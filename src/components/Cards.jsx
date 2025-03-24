import React from "react";
import { formaterDate } from "../utils/formatterDate";

export default function Cards({
  name,
  img,
  weekend,
  active,
  id,
  changeWeekend,
}) {
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
      <div
        style={{ backgroundColor: active !== id ? "#101828" : "#FF0000" }}
        className="w-full flex items-center justify-around bg-[#101828] rounded-b-[1rem] z-10"
      >
        <p className="text-center py-2 text-white text-2xl z-10">
          {formaterDate(weekend)}
        </p>
        <button
          onClick={() => changeWeekend(id)}
          style={{ backgroundColor: active !== id ? "#101828" : "#FF0000" }}
          className="px-2 bg-[#101828] border-white border-2 text-lg text-white rounded-md cursor-pointer"
        >
          Ver
        </button>
      </div>
    </div>
  );
}
