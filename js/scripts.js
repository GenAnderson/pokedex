let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  let modalContainer = document.querySelector(".container-fluid");

  // fetch data from pokemon api
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(error);
      });
  }

  // fetches detail of clicked pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        console.log(details);
        item.id = details.id;
        item.name = details.name;
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Displays the Modal
  function displayModal(item) {
    let titleElement = document.querySelector(".modal-title");
    let heightElement = document.querySelector(".modal-body--height");
    let pokemonImage = document.querySelector(".modal-img");

    // Empty previous modal content
    titleElement.innerText = "";
    heightElement.innerText = "";
    pokemonImage.src = "";

    pokemonRepository.loadDetails(item).then(function () {
      // Insert new modal content
      titleElement.innerText = `#${item.id} ${item.name}`;
      heightElement.innerText = `Height: ${item.height / 10} m`;
      pokemonImage.src = item.imageUrl;
    });
  }

  // adds a pokemon to pokelist
  function add(pokemon) {
    typeof pokemon === "object"
      ? pokemonList.push(pokemon)
      : alert(`Pokemon needs to be an object!`);
  }

  // returns entire pokelist
  function getAll() {
    return pokemonList;
  }

  // renders pokemon card item to page
  function addListItem(pokemon) {
    let unorderedItem = document.querySelector("ul");
    let listItem = document.createElement("li");
    let button = document.createElement("button");

    listItem.classList.add("list-group-item");
    listItem.setAttribute("data-toggle", "modal");
    listItem.setAttribute("data-target", "#modal");

    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-light", "pokemon-list--btn");

    listItem.appendChild(button);
    unorderedItem.appendChild(listItem);

    clickHandler(button, pokemon);
  }

  // Event handlers
  function clickHandler(button, pokemon) {
    button.addEventListener("click", () => {
      displayModal(pokemon);
    });
  }

  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
