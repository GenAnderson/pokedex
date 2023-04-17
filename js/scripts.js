let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  let modalContainer = document.querySelector("#modal-container");

  // uses pokemon api to fetch data
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

    function loadModal(details) {
      // make sure modal container is empty to start with
      modalContainer.innerHTML = "";

      // create modal div
      let modal = document.createElement("div");
      modal.classList.add("modal");

      // create remaining elements in modal
      let titleElement = document.createElement("h1");
      let pokemonImage = document.createElement("img");
      let contentElement = document.createElement("p");
      let closeButtonElement = document.createElement("button");
      closeButtonElement.classList.add("modal-close");

      titleElement.innerText = details.name;
      pokemonImage.src = details.sprites.front_default;
      contentElement.innerText = `Height: ${details.height}`;

      closeButtonElement.innerText = "Close";
      closeButtonElement.addEventListener("click", hideModal);

      modal.appendChild(titleElement);
      modal.appendChild(pokemonImage);
      modal.appendChild(contentElement);
      modal.appendChild(closeButtonElement);
      modalContainer.appendChild(modal);
      modalContainer.classList.add("is-visible");
    }

    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        loadModal(details);
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function hideModal() {
    modalContainer.classList.remove("is-visible");
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

    button.innerText = pokemon.name;
    button.classList.add("button");
    listItem.appendChild(button);
    unorderedItem.appendChild(listItem);

    clickHandler(button, pokemon);
  }

  // function to show detail in console log
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  // Event handlers
  function clickHandler(button, pokemon) {
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }

  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
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
