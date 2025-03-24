import data from "../json/data.json";

export const getCurrentWeekend = (id) => {
  console.log("id", id);

  if (id) {
    const circuit = data.find((item) => item.id === Number(id));
    return circuit;
  } else {
    const today = new Date().toISOString().split("T")[0]; // Obtiene la fecha actual en formato YYYY-MM-DD

    const nextDate = data.find((item) => item.initDay > today);

    return nextDate;
  }
};
