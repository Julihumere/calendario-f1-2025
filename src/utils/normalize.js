export const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const toCamelCase = (str) => {
  const removedAccents = removeAccents(str);
  return removedAccents
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // Primer letra mayúscula y el resto minúsculas
    })
    .join("");
};
