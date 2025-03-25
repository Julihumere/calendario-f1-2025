import data from "../json/data.json";

export const startWeekend = (id) => {
  console.log(id);

  let dayStartWeekend = data.find((item) => item.id === id).initDay;
  let timeStartWeekend = data.find((item) => item.id === id);

  console.log(dayStartWeekend, timeStartWeekend);

  let initDay;
  let initTime;

  if (timeStartWeekend.thursday?.length > 0) {
    initDay = timeStartWeekend.thursday[0].date;
    initTime = timeStartWeekend.thursday[0].time;
  } else if (timeStartWeekend.friday?.length > 0) {
    initDay = timeStartWeekend.friday[0].date;
    initTime = timeStartWeekend.friday[0].time;
  } else {
    return null;
  }

  let finalStartWeekend = new Date(`${initDay}T${initTime}`);

  return finalStartWeekend;
};
