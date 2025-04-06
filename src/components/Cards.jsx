import React from "react";
import { formaterDate } from "../utils/formatterDate";

export default function Cards({
  name,
  img,
  weekend,
  active,
  id,
  changeWeekend,
  updateQueryString,
  country,
}) {
  const filterCountry = (country) => {
    let countryName = country.split(", ")[1];

    if (country == "Austin, Estados Unidos") {
      return "Estados Unidos";
    } else if (countryName === "Estados Unidos") {
      return country.split(", ")[0];
    } else if (countryName === "Italia") {
      return country.split(", ")[0];
    } else {
      return countryName;
    }
  };

  return (
    <div className="w-full mx-8 h-auto relative flex flex-col items-center justify-between rounded-2xl max-[1240px]:mx-2  max-[500px]:w-full max-[500px]:mx-2">
      <div
        style={{ backgroundColor: active !== id ? "#101828" : "#FF0000" }}
        className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 opacity-90 rounded-2xl z-10"
      ></div>
      <h1 className="w-full text-center pt-5 text-white text-2xl z-10  max-[500px]:text-lg max-[500px]:px-2">
        {name}
      </h1>
      <img
        src={img}
        alt={"Circuito de " + name}
        className="w-[90%] z-20 pointer-events-none"
      />
      <div
        style={{ backgroundColor: active !== id ? "#101828" : "#FF0000" }}
        className="w-full flex py-2 mt-5 items-center justify-around bg-[#101828] rounded-b-[1rem] z-10 max-[1240px]:flex-col max-[1240px]:mb-5 max-[500px]:flex-col max-[500px]:mb-5"
      >
        <p className="text-center py-2 text-white text-2xl z-10 max-[500px]:text-lg">
          {formaterDate(weekend)}
        </p>
        <button
          onClick={() => {
            updateQueryString(filterCountry(country), id);
            changeWeekend(id);
          }}
          style={{ backgroundColor: active !== id ? "#101828" : "#FF0000" }}
          className="px-2 bg-[#101828] border-white border-2 text-lg text-white rounded-md cursor-pointer"
        >
          Ver
        </button>
      </div>
    </div>
  );
}
