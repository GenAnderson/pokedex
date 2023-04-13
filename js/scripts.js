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

// It said in order to print the "details" of each one so I removed the template literal and included the "details"

// Saving from previous exercise 1.5
// (function () {
//   pokemonList.forEach((pokemon) => {
//     document.write(
//       `<p> Name: ${pokemon.name}</p>
//     <p>Height: ${pokemon.height}</p>
//     <p>Types: ${pokemon.types}</p><br/>`
//     );
//   });
// })();

// Exercise 1.6
let pokemonRepository = (function (pokemon) {
  function add(pokemon) {
    typeof pokemon === "object"
      ? pokemonList.push(pokemon)
      : alert(`Pokemon needs to be an object!`);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let unorderedItem = document.querySelector("ul");
    let listItem = document.createElement("li");
    let button = document.createElement("button");

    button.innerText = pokemon.name;
    button.classList.add("button");
    listItem.appendChild(button);
    unorderedItem.appendChild(listItem);

    clickHandler(button, pokemon);
  }

  function clickHandler(button, pokemon) {
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add,
    getAll,
    addListItem,
  };
})();

(function () {
  pokemonList.forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
})();
