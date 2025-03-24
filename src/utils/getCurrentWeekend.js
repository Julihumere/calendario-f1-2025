import data from "../json/data.json";

export const getCurrentWeekend = () => {
  const today = new Date().toISOString().split("T")[0]; // Obtiene la fecha actual en formato YYYY-MM-DD

  const nextDate = data.find((item) => item.initDay > today);

  return nextDate;
};
