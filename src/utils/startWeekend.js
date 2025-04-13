import data from "../json/data.json";

export const startWeekend = (id) => {
  let timeStartWeekend = data.find((item) => item.id === id);

  let initDay;
  let initTime;

  if (timeStartWeekend.thursday?.length > 0) {
    if (timeStartWeekend.sunday?.length === 0) {
      initDay = timeStartWeekend.saturday[0].date;
      initTime = timeStartWeekend.saturday[0].time;
    } else {
      initDay = timeStartWeekend.sunday[0].date;
      initTime = timeStartWeekend.sunday[0].time;
    }
  } else if (timeStartWeekend.friday?.length > 0) {
    initDay = timeStartWeekend.sunday[0].date;
    initTime = timeStartWeekend.sunday[0].time;
  } else {
    return null;
  }

  let finalStartWeekend = new Date(`${initDay}T${initTime}`);

  return finalStartWeekend;
};
