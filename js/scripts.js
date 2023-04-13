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

// for (i = 0; i < pokemonList.length; i++) {
//   document.write(
//     `<p> ${pokemonList[i].name} (height: ${pokemonList[i].height}) ${
//       pokemonList[i].height > 1 ? " - Wow, thats big!" : " "
//     }</p>`
//   );
// }

// It said in order to print the "details" of each one so I removed the template literal and included the "details"

(function () {
  pokemonList.forEach((pokemon) => {
    document.write(
      `<p> Name: ${pokemon.name}</p>  
    <p>Height: ${pokemon.height}</p>
    <p>Types: ${pokemon.types}</p><br/>`
    );
  });
})();

let pokemonRepository = (function () {
  function add(pokemon) {
    typeof pokemon === "object"
      ? pokemonList.push(pokemon)
      : alert(`Pokemon needs to be an object!`);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add,
    getAll,
  };
})();

pokemonRepository.add({ name: "Mew" });
console.log(pokemonRepository.getAll());
