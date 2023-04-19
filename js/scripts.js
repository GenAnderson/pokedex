let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  let modalContainer = document.querySelector(".container-fluid");
  let modal = document.querySelector(".modal");

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
      console.log(details);
      let titleElement = document.querySelector(".modal-title");

      let heightElement = document.querySelector(".modal-body--height");
      let pokemonImage = document.querySelector(".modal-img");
      let closeBtn = document.querySelector(".close");
      let modalDialog = document.querySelector(".modal-dialog");
      let abilitiesElement = document.querySelector(".modal-abilities");

      modal.innerHTML = "";

      titleElement.innerText = `#${details.id} ${details.name}`;
      pokemonImage.src = details.sprites.front_default;
      heightElement.innerText = `Height: ${details.height}`;

      modal.appendChild(modalDialog);
      // modal.classList.add("is-visible");

      closeBtn.addEventListener("click", hideModal);
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
    modal.classList.remove("is-visible");
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
    button.classList.add("btn", "btn-light", "pokemon-btn");

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
