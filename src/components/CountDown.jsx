import React, { useState, useEffect } from "react";

function Countdown({ fechaObjetivo, name }) {
  const [tiempoRestante, setTiempoRestante] = useState(
    calcularTiempoRestante()
  );

  function calcularTiempoRestante() {
    const ahora = new Date();
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
      return null; // O puedes devolver un objeto con todos los valores en 0
    }
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempoRestante(calcularTiempoRestante());
    }, 1000);

    return () => clearInterval(intervalo); // Limpieza del intervalo
  }, [fechaObjetivo]); // Dependencia: fechaObjetivo

  if (tiempoRestante) {
    return (
      <div className="w-full py-5">
        <h1 className="text-left text-4xl">
          Inicio del GP de {name}:{" "}
          <span className="text-primary px-3 py-4 text-center rounded-full">
            {tiempoRestante.dias}
          </span>{" "}
          días,{"  "}
          <span className="text-primary px-3 py-4 text-center rounded-full">
            {tiempoRestante.horas}
          </span>{" "}
          horas,
          <span className="text-primary px-3 py-4 text-center rounded-full">
            {tiempoRestante.minutos}
          </span>{" "}
          minutos y{" "}
          <span className="text-primary px-3 py-4 text-center rounded-full">
            {tiempoRestante.segundos}
          </span>{" "}
          segundos.
        </h1>
      </div>
    );
  } else {
    return (
      <div className="w-full py-5">
        {" "}
        <h1 className="text-left text-4xl">
          ¡Este Gran premio ya se ha diputado!
        </h1>
      </div>
    );
  }
}

export default Countdown;
