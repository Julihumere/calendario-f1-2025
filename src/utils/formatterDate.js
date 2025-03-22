export const formaterDate = (date) => {
  // date = ["2025-04-04", "2025-04-05", "2025-04-06"]

  const formattedDates = date.map((date) => {
    const d = new Date(date);
    return d.getDate(); // Obtiene el día del mes
  });

  const month = new Date(date[0]).toLocaleDateString("es-ES", {
    month: "long",
  });

  const result = `${formattedDates
    .slice(0, -1)
    .join(", ")} y ${formattedDates.slice(-1)} de ${month}`;

  return result;
};
