import data from "../json/data2026.json";

export const startWeekend = (id) => {
  let timeStartWeekend = data.find((item) => item.id === id);
  if (!timeStartWeekend) return null;

  let initDay;
  let initTime;

  // Si hay actividades el jueves, el GP comienza el jueves
  if (timeStartWeekend.thursday?.length > 0) {
    initDay = timeStartWeekend.thursday[0].date;
    initTime = timeStartWeekend.thursday[0].time;
  }
  // Si no hay jueves pero hay viernes, comienza el viernes
  else if (timeStartWeekend.friday?.length > 0) {
    initDay = timeStartWeekend.friday[0].date;
    initTime = timeStartWeekend.friday[0].time;
  }
  // Si no hay ni jueves ni viernes pero hay sábado, comienza el sábado
  else if (timeStartWeekend.saturday?.length > 0) {
    initDay = timeStartWeekend.saturday[0].date;
    initTime = timeStartWeekend.saturday[0].time;
  } else {
    return null;
  }

  let finalStartWeekend = new Date(`${initDay}T${initTime}`);
  return finalStartWeekend;
};
