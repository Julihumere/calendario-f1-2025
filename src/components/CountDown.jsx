import React from "react";

export default function CountDown() {
  const timeFormatted = `${
    today.getHours() < 10 ? `0${today.getHours()}` : today.getHours()
  }:${today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes()}`;
  let getNextEvent = () => {
    let nextEvent = thisWeekend?.friday.find((item) => {
      if (item.date === todayFormatted) {
        if (item.time >= timeFormatted) {
          return item;
        }
      }
    });

    if (!nextEvent) {
      nextEvent = thisWeekend?.saturday.find((item) => {
        if (item.date === todayFormatted) {
          if (item.time >= timeFormatted) {
            return item;
          }
        }
      });
    }

    if (!nextEvent) {
      nextEvent = thisWeekend?.sunday.find((item) => {
        if (item.date === todayFormatted) {
          if (item.time >= timeFormatted) {
            return item;
          }
        }
      });
    }

    return nextEvent;
  };
  return <div>CountDown</div>;
}
