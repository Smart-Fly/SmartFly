const fs = require("fs");

// export const formatDate = (input) => {
//   let x = input.split(/\D/g);
//   return [x[2], x[1], x[0]].join("-");
// };

const formatIATACode = (input) => {
  const flightData = require("../files/newMaskapai.json");

  let IATACode = [];
  let cityInput = input
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");

  console.log(cityInput,'city input')
  flightData.forEach((e) => {
    if (e.city.includes(cityInput)) {
      IATACode.push(e.iata);
    }
  });
  let result = IATACode;

  return result;
};

console.log(formatIATACode("Yogyakarta"));
