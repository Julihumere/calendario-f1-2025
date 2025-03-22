import data from "../json/data.json";

export const getCurrentWeekend = () => {
  const today = new Date();

  const currentDay = today.getDay();

  let daysUntilSaturday = (6 - currentDay + 7) % 7;
  let daysUntilSunday = (7 - currentDay + 7) % 7;

  const nextSaturday = new Date(today);
  nextSaturday.setDate(today.getDate() + daysUntilSaturday);
  nextSaturday.setHours(0, 0, 0, 0);

  const nextSunday = new Date(today);
  nextSunday.setDate(today.getDate() + daysUntilSunday);
  nextSunday.setHours(0, 0, 0, 0);

  const year = nextSaturday.getFullYear();
  const month =
    nextSaturday.getMonth() + 1 < 10
      ? `0${nextSaturday.getMonth() + 1}`
      : nextSaturday.getMonth() + 1;
  const day =
    nextSaturday.getDate() < 10
      ? `0${nextSaturday.getDate()}`
      : nextSaturday.getDate();

  const todayFormatted = `${year}-${month}-${day}`;

  const thisWeekend = data.find((item) =>
    item.weekend?.includes(todayFormatted)
  );

  return thisWeekend;
};
