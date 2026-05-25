export const formaterDate = (date) => {
  // date = ["2025-04-04", "2025-04-05", "2025-04-06"]

  const formattedDates = date.map((d) => {
    return parseInt(d.split("-")[2], 10);
  });

  const [year, month, day] = date[0].split("-").map(Number);
  const monthName = new Date(year, month - 1, day).toLocaleDateString("es-ES", {
    month: "long",
  });

  const result = `${formattedDates
    .slice(0, -1)
    .join(", ")} y ${formattedDates.slice(-1)} de ${monthName}`;

  return result;
};
