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
    <div
      onClick={() => {
        updateQueryString(filterCountry(country), id);
        changeWeekend(id);
      }}
      className="w-[250px] h-[300px] relative flex flex-col items-center justify-between rounded-2xl max-[1240px]:mx-2 max-[500px]:w-full max-[500px]:h-[300px]"
    >
      <div
        style={{ backgroundColor: active !== id ? "#101828" : "#FF0000" }}
        className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 opacity-90 rounded-2xl z-10"
      ></div>
      <h4 className="w-full text-center pt-5 text-white text-lg z-10  max-[500px]:text-lg max-[500px]:px-2">
        {name}
      </h4>
      <img
        src={img}
        alt={"Circuito de " + name}
        className="w-[90%] z-20 pointer-events-none"
      />

      <p className="text-center py-2 text-white text-2xl z-10 max-[500px]:text-lg">
        {formaterDate(weekend)}
      </p>
    </div>
  );
}
