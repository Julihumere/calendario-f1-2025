import data from "../json/data2026.json";

export const checkThisWeekend = () => {
  const today = new Date();
  const todayDay =
    today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  const todayMonth =
    today.getMonth() < 10
      ? `0${today.getMonth() + 1}`
      : `${today.getMonth() + 1}`;
  const todayYear = today.getFullYear();

  const dateToday = `${todayYear}-${todayMonth}-${todayDay}`;

  const searchWeekend = data.find((item) => {
    if (item.weekend.includes(dateToday)) {
      return item;
    }
  });

  return searchWeekend;
};
