import data from "../json/data2026.json";

export const getCurrentWeekend = (id) => {
  if (id) {
    const circuit = data.find((item) => item.id === Number(id));
    return circuit;
  } else {
    const today = new Date().toISOString().split("T")[0];
    const nextDate = data.find((item) => item.finishDay >= today);

    // Si no hay más carreras (temporada terminada), devolver el último GP
    if (!nextDate && data.length > 0) {
      return { ...data[data.length - 1], seasonEnded: true };
    }

    return nextDate;
  }
};
