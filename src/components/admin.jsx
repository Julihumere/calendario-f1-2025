import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import * as XLSX from "xlsx";
import data from "../json/data2026.json";
import dataLeaderBoard from "../json/leaderBoardPilots2026.json";
import { ToastContainer, toast, Bounce } from "react-toastify";

export default function Admin() {
  const [vista, setVista] = useState(true);
  const [admin, setAdmin] = useState({
    user: "",
    password: "",
  });

  const [circuits, setCircuits] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedGP, setSelectedGP] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [raceType, setRaceType] = useState("race"); // 'race' o 'sprint'
  const [driversRace, setDriversRace] = useState([]);
  const [driversSprint, setDriversSprint] = useState([]);
  const [polePosition, setPolePosition] = useState({
    driver: "",
    team: "",
    time: "",
  });

  const handleChangeLogin = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeDriver = (index, e) => {
    const { name, value } = e.target;
    const newState = [...drivers];
    newState[index][name] = value;
    setDrivers(newState);

    // Actualizar también el estado específico
    if (raceType === "sprint") {
      const newSprint = [...driversSprint];
      newSprint[index][name] = value;
      setDriversSprint(newSprint);
    } else {
      const newRace = [...driversRace];
      newRace[index][name] = value;
      setDriversRace(newRace);
    }
  };

  const handleChangePolePosition = (e) => {
    const { name, value } = e.target;
    setPolePosition({
      ...polePosition,
      [name]: value,
    });
  };

  const handleLogin = () => {
    if (admin.user === "admin" && admin.password === "admin") {
      setVista(true);
    } else {
      toast.error("Usuario o contraseña incorrectos");
    }
  };

  const handleSelectCircuit = (id) => {
    const selectedCircuit = circuits.find((item) => item.id === id);

    // Si hay un GP seleccionado diferente y hay datos cargados, limpiar
    if (
      selectedGP &&
      selectedGP.id !== id &&
      (driversRace.length > 0 || driversSprint.length > 0)
    ) {
      const confirmar = window.confirm(
        `⚠️ Hay datos cargados para ${selectedGP.name}. ¿Deseas cambiar al GP seleccionado? Los datos actuales se limpiarán.`
      );
      if (!confirmar) {
        return; // No cambiar de GP
      }
    }

    setSelectedGP(selectedCircuit);
    setRaceType("race"); // Reset al tipo carrera por defecto

    const defaultDrivers =
      teams?.map((driver) => ({
        number: driver.number,
        driver: driver.name,
        team: driver.teamLogo,
        position: 0,
        laps: 0,
        time: 0,
        points: 0,
      })) || [];

    // Cargar datos del Gran Premio si existen
    const raceData =
      selectedCircuit?.results?.leaderBoard?.map((driver) => ({
        number: driver.number || 0,
        driver: driver.driver,
        team: driver.team,
        position: driver.position,
        laps: driver.laps,
        time: driver.time,
        points: driver.points,
      })) || defaultDrivers;

    // Cargar datos del Sprint si existen
    console.log(selectedCircuit);

    const sprintData =
      selectedCircuit?.resultsSprint?.leaderBoard?.map((driver) => ({
        number: driver.number || 0,
        driver: driver.driver,
        team: driver.team,
        position: driver.position,
        laps: driver.laps,
        time: driver.time,
        points: driver.points,
      })) || defaultDrivers;

    setDriversRace(raceData);
    setDriversSprint(sprintData);
    setDrivers(raceData); // Por defecto mostramos el Gran Premio

    // Cargar pole position si existe
    if (selectedCircuit?.results?.polePosition) {
      setPolePosition({
        driver: selectedCircuit.results.polePosition.driver || "",
        team: selectedCircuit.results.polePosition.team || "",
        time: selectedCircuit.results.polePosition.time || "",
      });
    } else {
      setPolePosition({ driver: "", team: "", time: "" });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Verificar que se haya seleccionado un GP primero
    if (!selectedGP) {
      toast.error(
        "⚠️ Por favor selecciona un Gran Premio primero antes de cargar el Excel"
      );
      e.target.value = null; // Limpiar el input file
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);

        // Mapear los datos del Excel al formato correcto
        const parsedDrivers = jsonData.map((row) => ({
          position: row.position ?? row.Position ?? row.Pos ?? 0,
          number: row.number ?? row.Number ?? row.Numero ?? 0,
          driver: row.driver || row.Driver || row.Piloto || "",
          team: row.team || row.Team || row.Equipo || "",
          laps: row.laps ?? row.Laps ?? row.Vueltas ?? 0,
          time: row.time || row.Time || row.Tiempo || "",
          points: row.points ?? row.Points ?? row.Puntos ?? 0,
        }));

        setDrivers(parsedDrivers);

        // Actualizar el estado específico según el tipo de carrera
        if (raceType === "sprint") {
          setDriversSprint(parsedDrivers);
        } else {
          setDriversRace(parsedDrivers);
        }
      } catch (error) {
        console.error("Error al leer el archivo:", error);
        toast.error(
          "❌ Error al procesar el archivo Excel. Verifica el formato."
        );
      }
    };
    reader.readAsArrayBuffer(file);

    // Limpiar el input file después de procesar
    e.target.value = null;
  };

  const handleClearData = () => {
    setDrivers([]);
    setDriversRace([]);
    setDriversSprint([]);
    setSelectedGP(null);
    setRaceType("race");
    setPolePosition({ driver: "", team: "", time: "" });
  };

  const handleRaceTypeChange = (type) => {
    setRaceType(type);
    if (type === "sprint") {
      setDrivers(driversSprint);
    } else {
      setDrivers(driversRace);
    }
  };

  const dictionaryTeams = {
    McLaren: "mcl",
    "Red Bull Racing": "redb",
    Mercedes: "mer",
    Ferrari: "fer",
    Williams: "will",
    "Haas F1 Team": "haas",
    Alpine: "alp",
    "Aston Martin": "ast",
    "Racing Bulls": "rb",
    "Kick Sauber": "kick",
  };

  const generateResults = (driversData) => {
    if (!driversData || driversData.length === 0) return null;

    const podium = driversData
      .filter((d) => d.position <= 3 && d.position > 0)
      .sort((a, b) => a.position - b.position)
      .map((d) => {
        const pilot = teams.find((t) => t.number === d.number);
        return {
          position: d.position,
          driver: d.driver,
          team: dictionaryTeams[d.team] || d.team,
          photo: pilot
            ? `/pilots/${pilot.name.split(" ")[1].toLowerCase()}.avif`
            : "/pilots/default.avif",
        };
      });

    const leaderBoard = driversData.map((d) => ({
      position:
        d.position === "NC" || d.position === "DQ"
          ? d.position
          : parseInt(d.position),
      number: parseInt(d.number) || 0,
      driver: d.driver,
      team: dictionaryTeams[d.team] || d.team,
      laps: parseInt(d.laps) || 0,
      time: d.time.toString(),
      points: parseInt(d.points) || 0,
    }));

    return {
      podium,
      leaderBoard,
      polePosition: {
        driver: polePosition.driver || podium[0]?.driver || "",
        team: polePosition.team || "",
        time: polePosition.time || "1:XX.XXX",
      },
    };
  };

  const handleSaveResults = () => {
    if (!selectedGP) {
      toast.error("Por favor selecciona un Gran Premio primero");
      return;
    }

    const hasSprint = selectedGP.sprint;
    let completeGP = { ...selectedGP };

    if (hasSprint) {
      // Verificar que ambos estén completos
      if (driversRace.length === 0 && driversSprint.length === 0) {
        toast.error("No hay datos para guardar");
        return;
      }

      const raceResults = generateResults(driversRace);
      const sprintResults = generateResults(driversSprint);

      // Actualizar el objeto completo del GP
      if (raceResults) {
        completeGP.results = raceResults;
      }
      if (sprintResults) {
        completeGP.resultsSprint = sprintResults;
      }

      let message = "📊 Resultados generados:\n\n";
      if (raceResults) message += "✅ Gran Premio\n";
      if (sprintResults) message += "✅ Sprint\n";

      toast.success(
        `${message}\nEl JSON se copió al portapapeles.\n\nObjeto completo del GP #${selectedGP.id} listo para reemplazar en data.json`
      );
    } else {
      // Solo Gran Premio
      if (driversRace.length === 0) {
        toast.error("No hay datos de pilotos para guardar");
        return;
      }

      const results = generateResults(driversRace);

      // Actualizar el objeto completo del GP
      completeGP.results = results;

      toast.success(
        `Resultados guardados! El JSON se copió al portapapeles.\n\nObjeto completo del GP #${selectedGP.id} listo para reemplazar en data.json`
      );
    }

    const jsonOutput = JSON.stringify(completeGP, null, 2);
    console.log("GP completo generado:", completeGP);
    navigator.clipboard.writeText(jsonOutput);
  };

  const handleUpdateLeaderBoard = () => {
    // Mapeo de pilotos por número y variaciones de nombres
    const pilotMap = {
      1: ["Max Verstappen"],
      4: ["Lando Norris"],
      5: ["Gabriel Bortoleto"],
      6: ["Isack Hadjar"],
      7: ["Jack Doohan"],
      10: ["Pierre Gasly"],
      12: ["Kimi Antonelli", "Andrea Kimi Antonelli", "Andrea Antonelli"],
      14: ["Fernando Alonso"],
      16: ["Charles Leclerc"],
      18: ["Lance Stroll"],
      22: ["Yuki Tsunoda"],
      23: ["Alexander Albon", "Alex Albon", "Alexandre Albon"],
      27: ["Nico Hulkenberg"],
      30: ["Liam Lawson"],
      31: ["Esteban Ocon"],
      43: ["Franco Colapinto"],
      44: ["Lewis Hamilton"],
      55: ["Carlos Sainz"],
      63: ["George Russell"],
      81: ["Oscar Piastri"],
      87: ["Oliver Bearman"],
    };

    // Función para buscar piloto en resultados
    const findPilot = (leaderBoard, pilot) => {
      return leaderBoard.find((d) => {
        // Primero intentar por número exacto
        if (d.number && parseInt(d.number) === pilot.number) {
          return true;
        }

        // Buscar por variaciones de nombre usando el mapeo
        const possibleNames = pilotMap[pilot.number] || [];
        possibleNames.push(pilot.name); // Agregar el nombre del leaderBoardPilots

        // Verificar si el nombre del resultado coincide con alguna variación
        return possibleNames.some(
          (name) => name.toLowerCase() === d.driver.toLowerCase()
        );
      });
    };

    // Crear una copia del leaderboard actualizado con todos los GPs
    const updatedLeaderBoard = teams.map((pilot) => {
      let totalPoints = 0;
      let totalLaps = 0;
      const allPositions = [];
      const debugInfo = { name: pilot.name, number: pilot.number, gps: [] };

      // Recorrer todos los circuitos
      circuits.forEach((gp) => {
        // Procesar resultados del Sprint primero (si existe)
        if (gp.resultsSprint && gp.resultsSprint.leaderBoard) {
          const pilotResult = findPilot(gp.resultsSprint.leaderBoard, pilot);

          if (!pilotResult) {
            // No se encontró el piloto, buscar en todo el leaderBoard
            const allDrivers = gp.resultsSprint.leaderBoard.map(
              (d) => `${d.driver} (#${d.number || "N/A"})`
            );
            console.warn(
              `⚠️ ${pilot.name} (#${pilot.number}) NO encontrado en Sprint ${gp.name}. Pilotos disponibles:`,
              allDrivers
            );
          }

          if (pilotResult) {
            // Formatear la posición del sprint
            let position = pilotResult.position;
            if (position === "NC" || position === "DQ") {
              position = "DSQ";
            } else if (position === "DNS") {
              position = "DNS";
            } else if (typeof position !== "number") {
              position = parseInt(position) || "DNF";
            }

            allPositions.push(position);

            const points = parseInt(pilotResult.points) || 0;
            const laps = parseInt(pilotResult.laps) || 0;

            // Sumar puntos del sprint
            totalPoints += points;
            // Sumar vueltas del sprint
            totalLaps += laps;

            debugInfo.gps.push({
              gp: gp.name,
              type: "Sprint",
              position,
              points,
              laps,
            });
          } else {
            // Si no participó en el sprint, agregar string vacío
            allPositions.push("");
          }
        }

        // Procesar resultados del Gran Premio
        if (gp.results && gp.results.leaderBoard) {
          const pilotResult = findPilot(gp.results.leaderBoard, pilot);

          if (!pilotResult) {
            // No se encontró el piloto
            const allDrivers = gp.results.leaderBoard.map(
              (d) => `${d.driver} (#${d.number || "N/A"})`
            );
            console.warn(
              `⚠️ ${pilot.name} (#${pilot.number}) NO encontrado en GP ${gp.name}. Pilotos disponibles:`,
              allDrivers
            );
          }

          if (pilotResult) {
            // Formatear la posición
            let position = pilotResult.position;
            if (position === "NC" || position === "DQ") {
              position = "DSQ";
            } else if (position === "DNS") {
              position = "DNS";
            } else if (typeof position !== "number") {
              position = parseInt(position) || "DNF";
            }

            allPositions.push(position);

            const points = parseInt(pilotResult.points) || 0;
            const laps = parseInt(pilotResult.laps) || 0;

            // Sumar puntos
            totalPoints += points;

            // Sumar vueltas completadas
            totalLaps += laps;

            debugInfo.gps.push({
              gp: gp.name,
              type: "GP",
              position,
              points,
              laps,
            });
          } else {
            // Si no participó en este GP, agregar string vacío
            allPositions.push("");
          }
        } else {
          // GP sin resultados todavía
          allPositions.push("");
        }
      });

      debugInfo.totalPoints = totalPoints;
      debugInfo.totalLaps = totalLaps;
      console.log(`${pilot.name} (#${pilot.number}):`, debugInfo);

      return {
        ...pilot,
        points: totalPoints,
        positions: allPositions,
        lapsComplete: totalLaps,
      };
    });

    const jsonOutput = JSON.stringify(updatedLeaderBoard, null, 2);
    console.log("LeaderBoard actualizado:", jsonOutput);

    // Resumen de puntos
    console.log("\n=== RESUMEN DE PUNTOS ===");
    updatedLeaderBoard
      .sort((a, b) => b.points - a.points)
      .forEach((pilot, index) => {
        console.log(`${index + 1}. ${pilot.name}: ${pilot.points} puntos`);
      });

    navigator.clipboard.writeText(jsonOutput);

    const totalGPs = circuits.filter((gp) => gp.results).length;

    toast.success(
      `✅ LeaderBoard actualizado!\n\nSe calcularon:\n- Puntos totales\n- Posiciones de ${totalGPs} GPs\n- Vueltas completadas\n\nEl JSON se copió al portapapeles.\n\nRevisa la CONSOLA para ver el detalle.`
    );
  };

  useEffect(() => {
    setCircuits(data);
    setTeams(dataLeaderBoard);
  }, [vista]);

  return (
    <div className="w-full h-screen flex flex-col bg-[#0D0D0D] text-white">
      <ToastContainer
        className="text-sm"
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      {vista ? (
        <div className="w-full h-full flex flex-col">
          {/* Header */}
          <div className="w-full flex justify-between items-center px-8 py-4 bg-gray-900 border-b border-gray-700">
            <button className="border-2 border-gray-600 py-2 px-5 rounded-md hover:bg-gray-600 hover:text-white transition duration-300 ease-in-out cursor-pointer">
              Volver
            </button>
            <div className="flex gap-3">
              <label className="border-2 border-blue-600 bg-blue-600 py-2 px-5 rounded-md hover:bg-blue-700 hover:border-blue-700 text-white transition duration-300 ease-in-out cursor-pointer">
                📊 Cargar Excel
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleClearData}
                className="border-2 border-red-600 bg-red-600 py-2 px-5 rounded-md hover:bg-red-700 hover:border-red-700 text-white transition duration-300 ease-in-out cursor-pointer"
              >
                🗑️ Limpiar
              </button>
              <button
                onClick={handleSaveResults}
                className="border-2 border-green-600 bg-green-600 py-2 px-5 rounded-md hover:bg-green-700 hover:border-green-700 text-white transition duration-300 ease-in-out cursor-pointer"
              >
                💾 Guardar Resultados
              </button>
              <button
                onClick={handleUpdateLeaderBoard}
                className="border-2 border-purple-600 bg-purple-600 py-2 px-5 rounded-md hover:bg-purple-700 hover:border-purple-700 text-white transition duration-300 ease-in-out cursor-pointer"
              >
                🏆 Actualizar LeaderBoard
              </button>
            </div>
          </div>

          {/* GP Seleccionado */}
          {selectedGP && (
            <div className="w-full px-8 py-3 bg-gray-800 border-b border-gray-700">
              <p className="text-lg font-bold text-green-400 text-center">
                GP Seleccionado: {selectedGP.name} (ID: {selectedGP.id})
              </p>
            </div>
          )}

          {/* Pole Position */}
          {selectedGP && (
            <div className="w-full px-8 py-4 bg-gray-900/50 border-b border-gray-700">
              <h4 className="text-base font-bold text-blue-400 mb-3">
                🏁 Pole Position
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-400 mb-1.5 font-medium">
                    Piloto
                  </label>
                  <select
                    name="driver"
                    value={polePosition.driver}
                    onChange={handleChangePolePosition}
                    className="py-2 px-3 border border-gray-600 rounded bg-gray-900 text-white text-sm focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Selecciona un piloto
                    </option>
                    {teams.length > 0 &&
                      teams
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((pilot) => (
                          <option key={pilot.number} value={pilot.name}>
                            {pilot.name}
                          </option>
                        ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-400 mb-1.5 font-medium">
                    Equipo
                  </label>
                  <select
                    name="team"
                    value={polePosition.team}
                    onChange={handleChangePolePosition}
                    className="py-2 px-3 border border-gray-600 rounded bg-gray-900 text-white text-sm focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Selecciona un equipo
                    </option>
                    {teams.length > 0 &&
                      [...new Set(teams.map((t) => t.team))]
                        .sort()
                        .map((teamName) => (
                          <option key={teamName} value={teamName}>
                            {teamName}
                          </option>
                        ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-400 mb-1.5 font-medium">
                    Tiempo
                  </label>
                  <input
                    type="text"
                    name="time"
                    value={polePosition.time}
                    onChange={handleChangePolePosition}
                    placeholder="Ej: 1:15.836"
                    className="py-2 px-3 border border-gray-600 rounded bg-gray-900 text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Contenido Principal */}
          <div className="flex-1 flex gap-4 px-4 py-4 overflow-hidden">
            <section className="w-1/4 h-full flex flex-col border border-gray-700 rounded-lg bg-gray-900/30 overflow-hidden">
              <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
                <h3 className="text-lg font-bold text-center">
                  🏁 Selecciona GP
                </h3>
              </div>

              {/* Información de GPs pendientes */}
              {circuits.length > 0 &&
                (() => {
                  const incompleteGPs = circuits.filter((c) => !c.results);
                  const nextGP = incompleteGPs[0];

                  return (
                    <div className="bg-gray-800/50 px-3 py-3 border-b border-gray-700 space-y-2">
                      {nextGP && (
                        <div className="bg-blue-600/20 border border-blue-600/50 rounded px-2 py-1.5">
                          <p className="text-xs text-blue-300 font-semibold">
                            🔜 Próximo GP
                          </p>
                          <p className="text-sm text-white font-medium mt-0.5">
                            {nextGP.name}
                          </p>
                        </div>
                      )}
                      <div className="bg-orange-600/20 border border-orange-600/50 rounded px-2 py-1.5">
                        <p className="text-xs text-orange-300">
                          📊 Pendientes:{" "}
                          <span className="font-bold text-orange-200">
                            {incompleteGPs.length}
                          </span>{" "}
                          de {circuits.length}
                        </p>
                      </div>
                    </div>
                  );
                })()}

              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {circuits.length > 0 &&
                  circuits.map((item) => (
                    <button
                      key={item.id}
                      className={`w-full py-2.5 px-3 border-2 rounded-md transition duration-200 ease-in-out cursor-pointer text-left text-sm relative ${
                        selectedGP?.id === item.id
                          ? "bg-green-600 border-green-600 text-white font-semibold"
                          : item.results
                          ? "border-green-700/50 bg-green-900/20 hover:bg-green-800/30 hover:border-green-600/50 text-gray-200"
                          : "border-gray-600 bg-gray-900/50 hover:bg-gray-700 hover:border-gray-500 text-gray-200"
                      }`}
                      onClick={() => handleSelectCircuit(item.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <span className="text-xs text-gray-400 font-mono">
                            #{item.id}
                          </span>
                          <div className="mt-0.5">{item.name}</div>
                          {item.sprint &&
                            (item.results || item.sprintResults) && (
                              <div className="flex gap-1 mt-1">
                                {item.results && (
                                  <span className="text-[10px] bg-blue-600/30 text-blue-300 px-1.5 py-0.5 rounded">
                                    GP
                                  </span>
                                )}
                                {item.sprintResults && (
                                  <span className="text-[10px] bg-orange-600/30 text-orange-300 px-1.5 py-0.5 rounded">
                                    Sprint
                                  </span>
                                )}
                              </div>
                            )}
                        </div>
                        {item.results && !item.sprint && (
                          <span className="text-green-400 text-lg">✓</span>
                        )}
                        {item.sprint && item.results && item.sprintResults && (
                          <span className="text-green-400 text-lg">✓</span>
                        )}
                      </div>
                    </button>
                  ))}
              </div>
            </section>
            <section className="w-3/4 h-full flex flex-col border border-gray-700 rounded-lg overflow-hidden bg-gray-900/30">
              <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
                {selectedGP?.sprint ? (
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">
                      📊 Resultados de Carrera
                    </h3>
                    <div className="flex gap-2 bg-gray-900 rounded-lg p-1">
                      <button
                        onClick={() => handleRaceTypeChange("race")}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                          raceType === "race"
                            ? "bg-blue-600 text-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        🏁 Gran Premio
                      </button>
                      <button
                        onClick={() => handleRaceTypeChange("sprint")}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                          raceType === "sprint"
                            ? "bg-orange-600 text-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        ⚡ Sprint
                      </button>
                    </div>
                  </div>
                ) : (
                  <h3 className="text-lg font-bold text-center">
                    📊 Resultados de Carrera
                  </h3>
                )}
              </div>
              <div className="w-full bg-gray-800/80 sticky top-0 z-10 border-b border-gray-600">
                <div className="grid grid-cols-7 gap-2 px-4 py-2.5">
                  <h4 className="text-center font-semibold text-xs text-gray-300">
                    #
                  </h4>
                  <h4 className="text-center font-semibold text-xs text-gray-300">
                    NRO
                  </h4>
                  <h4 className="text-center font-semibold text-xs text-gray-300">
                    PILOTO
                  </h4>
                  <h4 className="text-center font-semibold text-xs text-gray-300">
                    POS
                  </h4>
                  <h4 className="text-center font-semibold text-xs text-gray-300">
                    VUELTAS
                  </h4>
                  <h4 className="text-center font-semibold text-xs text-gray-300">
                    TIEMPO
                  </h4>
                  <h4 className="text-center font-semibold text-xs text-gray-300">
                    PUNTOS
                  </h4>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-2">
                {drivers && drivers.length > 0 ? (
                  drivers.map((item, index) => (
                    <div
                      key={`${item.driver}-${index}`}
                      className="grid grid-cols-7 gap-2 items-center py-2 border-b border-gray-700/50 hover:bg-gray-800/40 transition"
                    >
                      <div className="text-center text-gray-400 font-mono text-xs font-semibold">
                        {index + 1}
                      </div>
                      <input
                        className="py-1.5 px-2 text-center text-sm border border-gray-600 rounded bg-gray-900 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
                        type="text"
                        value={item.number ?? ""}
                        name="number"
                        placeholder="Nro"
                        onChange={(e) => handleChangeDriver(index, e)}
                      />
                      <div className="text-center font-medium text-sm truncate px-1 text-gray-200">
                        {item.driver ?? "-"}
                      </div>
                      <input
                        className="py-1.5 px-2 text-center text-sm border border-gray-600 rounded bg-gray-900 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
                        type="text"
                        value={item.position ?? ""}
                        name="position"
                        placeholder="Pos"
                        onChange={(e) => handleChangeDriver(index, e)}
                      />
                      <input
                        className="py-1.5 px-2 text-center text-sm border border-gray-600 rounded bg-gray-900 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
                        type="text"
                        value={item.laps ?? ""}
                        name="laps"
                        placeholder="Laps"
                        onChange={(e) => handleChangeDriver(index, e)}
                      />
                      <input
                        className="py-1.5 px-2 text-center text-sm border border-gray-600 rounded bg-gray-900 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
                        type="text"
                        value={item.time ?? ""}
                        name="time"
                        placeholder="Time"
                        onChange={(e) => handleChangeDriver(index, e)}
                      />
                      <input
                        className="py-1.5 px-2 text-center text-sm border border-gray-600 rounded bg-gray-900 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
                        type="text"
                        value={item.points ?? ""}
                        name="points"
                        placeholder="Pts"
                        onChange={(e) => handleChangeDriver(index, e)}
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <p className="text-lg">📋 Sin datos</p>
                    <p className="text-sm mt-2">
                      Selecciona un GP o carga un archivo Excel para comenzar
                    </p>
                  </div>
                )}
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
