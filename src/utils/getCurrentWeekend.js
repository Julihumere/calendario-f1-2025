import data from "../json/data.json";

export const getCurrentWeekend = (id) => {
  if (id) {
    const circuit = data.find((item) => item.id === Number(id));
    return circuit;
  } else {
    const today = new Date().toISOString().split("T")[0];
    const nextDate = data.find((item) => item.finishDay >= today);

    return nextDate;
  }
};
