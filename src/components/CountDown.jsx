/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

function Countdown({ fechaObjetivo, name, thisWeekend }) {
  const [tiempoRestante, setTiempoRestante] = useState(
    calcularTiempoRestante()
  );

  function calcularTiempoRestante() {
    const ahora = new Date();

    // Si no hay fecha objetivo, retornamos null
    if (!fechaObjetivo) return null;

    // Obtenemos la fecha de inicio y fin del GP
    const inicioGP = new Date(fechaObjetivo);
    const finGP =
      thisWeekend?.sunday?.length > 0
        ? new Date(
            thisWeekend.sunday[thisWeekend.sunday.length - 1].date +
              "T" +
              thisWeekend.sunday[thisWeekend.sunday.length - 1].time
          )
        : new Date(
            thisWeekend.saturday[thisWeekend.saturday.length - 1].date +
              "T" +
              thisWeekend.saturday[thisWeekend.saturday.length - 1].time
          );

    // Si estamos entre el inicio y el fin del GP
    if (ahora >= inicioGP && ahora <= finGP) {
      return "en_curso";
    }

    const diferencia = fechaObjetivo - ahora;

    if (diferencia > 0) {
      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas = Math.floor(
        (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

      return { dias, horas, minutos, segundos };
    } else {
      return null;
    }
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempoRestante(calcularTiempoRestante());
    }, 1000);

    return () => clearInterval(intervalo);
  }, [fechaObjetivo]);

  if (tiempoRestante === "en_curso") {
    return (
      <div className="w-full py-2">
        <h1 className="text-left text-4xl max-[500px]:text-2xl">
          GP de {name} disputándose ahora
        </h1>
      </div>
    );
  } else if (tiempoRestante) {
    return (
      <div className="w-full py-2">
        <h1 className="text-left text-4xl max-[500px]:text-2xl">
          Inicio del GP de {name}:{" "}
          <span className="text-primary px-3 py-4 text-center rounded-full max-[500px]:px-1 max-[500px]:py-2">
            {tiempoRestante.dias}
          </span>{" "}
          días,{"  "}
          <span className="text-primary px-3 py-4 text-center rounded-full max-[500px]:px-1 max-[500px]:py-2">
            {tiempoRestante.horas}
          </span>{" "}
          horas,
          <span className="text-primary px-3 py-4 text-center rounded-full max-[500px]:px-1 max-[500px]:py-2">
            {tiempoRestante.minutos}
          </span>{" "}
          minutos y{" "}
          <span className="text-primary px-3 py-4 text-center rounded-full max-[500px]:px-1 max-[500px]:py-2">
            {tiempoRestante.segundos}
          </span>{" "}
          segundos.
        </h1>
      </div>
    );
  } else {
    return (
      <div className="w-full py-2">
        <h1 className="text-left text-4xl">
          ¡Este Gran premio ya ha finalizado!
        </h1>
      </div>
    );
  }
}

export default Countdown;
