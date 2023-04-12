let pokemonList = [
  {
    name: "Gengar",
    height: 1.5,
    types: ["ghost", "poison"],
  },
  {
    name: "Ditto",
    height: 0.3,
    types: ["normal"],
  },
  {
    name: "Psyduck",
    height: 0.8,
    types: ["water"],
  },
];

for (i = 0; i < pokemonList.length; i++) {
  document.write(
    `<p> ${pokemonList[i].name} (height: ${pokemonList[i].height}) ${
      pokemonList[i].height > 1 ? " - Wow, thats big!" : " "
    }</p>`
  );
}

function divide(dividend, divisor) {
  if (divisor === 0) {
    return "You're trying to divide by zero";
  } else {
    let result = dividend / divisor;
    return result;
  }
}

console.log(divide(1, 4));
