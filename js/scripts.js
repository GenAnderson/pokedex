let pokemonRepository = (function (pokemon) {
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

pokemonRepository.getAll().forEach((pokemon) => {
  pokemonRepository.addListItem(pokemon);
});
