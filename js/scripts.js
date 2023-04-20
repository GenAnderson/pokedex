let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

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
      .catch(function (error) {
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
        item.weight = details.weight;
        item.types = details.types;
        item.abilities = details.abilities;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Displays the Modal
  function displayModal(item) {
    let titleElement = document.querySelector(".modal-title");
    let heightElement = document.querySelector(".modal-body--height");
    let weightElement = document.querySelector(".modal-body--weight");
    let typesElement = document.querySelector(".modal-body--types");
    let abilitiesElement = document.querySelector(".modal-body--abilities");
    let pokemonImage = document.querySelector(".modal-img");

    // Empty previous modal content
    titleElement.innerText = "";
    heightElement.innerText = "";
    weightElement.innerText = "";
    pokemonImage.src = "";
    typesElement.innerText = "";
    abilitiesElement.innerText = "";

    pokemonRepository.loadDetails(item).then(function () {
      // Insert new modal content
      let typesElementArr = "";
      let abilitiesElementArr = "";

      item.types.forEach((type) => {
        typesElementArr += [`<li> ${type.type.name} </li>`];
      });

      item.abilities.forEach((ability) => {
        abilitiesElementArr += [`<li> ${ability.ability.name} </li>`];
      });

      titleElement.innerText = `#${item.id} ${item.name}`;
      heightElement.innerText = `Height:  ${item.height / 10} m`;
      weightElement.innerText = `Weight:  ${item.weight / 10} lbs`;
      pokemonImage.src = item.imageUrl;
      typesElement.innerHTML = typesElementArr;
      abilitiesElement.innerHTML = abilitiesElementArr;

      cardColor(item);
    });
  }

  // My own side function for pokemon card colors
  function cardColor(item) {
    let color = [];
    let typesArr = [];
    let pokemonCard = document.querySelector(".modal-content");

    pokemonCard.style.background = "";
    item.types.forEach((type) => {
      typesArr.push(type.type.name);
    });

    const typeColor = {
      water: "linear-gradient(to top, rgb(125, 157, 243), white)",
      fire: "linear-gradient(to top, rgb(207, 60, 34), white)",
      ground: "linear-gradient(to top, rgb(136, 115, 71), white)",
      grass: "linear-gradient(to top, rgb(81, 240, 81), white)",
      electric: "linear-gradient(to top, rgb(248, 238, 97), white)",
    };

    typesArr.find((item) => {
      Object.entries(typeColor).find(function (x) {
        if (item === x[0]) {
          color = x;
        }
      });
    });
    pokemonCard.style.background = color[1];
  }

  // adds a pokemon to pokelist
  function add(pokemon) {
    typeof pokemon === "object"
      ? pokemonList.push(pokemon)
      : alert("Pokemon needs to be an object!");
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
