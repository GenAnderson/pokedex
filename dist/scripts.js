let pokemonRepository = (function () {
  let e = [],
    t = { url: "https://pokeapi.co/api/v2/pokemon/?limit=200", offset: 0 };
  function n(t) {
    "object" == typeof t ? e.push(t) : alert("Pokemon needs to be an object!");
  }
  function i() {
    return e;
  }
  return (
    document
      .querySelector("#searchInput")
      .addEventListener("input", function e() {
        let t = document.querySelector("#searchInput").value.toLowerCase();
        document.querySelectorAll(".list-group-item").forEach(function (e) {
          e.querySelector(".list-button").innerText.toLowerCase().includes(t)
            ? (e.style.display = "inline-block")
            : (e.style.display = "none");
        });
      }),
    {
      add: n,
      getAll: i,
      addListItem: function e(t) {
        let n = document.querySelector("ul"),
          i = document.createElement("li"),
          o = document.createElement("button"),
          r = `#${t.id} ${t.name}`;
        i.classList.add("list-group-item"),
          i.setAttribute("data-toggle", "modal"),
          i.setAttribute("data-target", "#modal"),
          (o.innerText = r),
          o.classList.add(
            "list-button",
            "btn",
            "btn-light",
            "pokemon-list--btn"
          ),
          i.appendChild(o),
          n.appendChild(i),
          (function e(t, n) {
            t.addEventListener("click", () => {
              var e;
              let t, i, o, r, l, a;
              (e = n),
                (t = document.querySelector(".modal-title")),
                (i = document.querySelector(".modal-body--height")),
                (o = document.querySelector(".modal-body--weight")),
                (r = document.querySelector(".modal-body--types")),
                (l = document.querySelector(".modal-body--abilities")),
                (a = document.querySelector(".modal-img")),
                (t.innerText = ""),
                (i.innerText = ""),
                (o.innerText = ""),
                (a.src = ""),
                (r.innerText = ""),
                (l.innerText = ""),
                pokemonRepository.loadDetails(e).then(function () {
                  let n = "",
                    s = "";
                  e.types.forEach((e) => {
                    n += [`<li> ${e.type.name} </li>`];
                  }),
                    e.abilities.forEach((e) => {
                      s += [`<li> ${e.ability.name} </li>`];
                    }),
                    (t.innerText = `#${e.id} ${e.name}`),
                    (i.innerText = `Height:  ${e.height / 10} m`),
                    (o.innerText = `Weight:  ${e.weight / 10} lbs`),
                    (a.src = e.imageUrl),
                    (r.innerHTML = n),
                    (l.innerHTML = s),
                    (function e(t) {
                      let n = [],
                        i = [],
                        o = document.querySelector(".modal-content");
                      (o.style.background = ""),
                        t.types.forEach((e) => {
                          i.push(e.type.name);
                        });
                      let r = {
                        water:
                          "linear-gradient(to top, rgb(125, 157, 243), white)",
                        fire: "linear-gradient(to top, rgb(207, 60, 34), white)",
                        ground:
                          "linear-gradient(to top, rgb(136, 115, 71), white)",
                        grass:
                          "linear-gradient(to top, rgb(81, 240, 81), white)",
                        electric:
                          "linear-gradient(to top, rgb(248, 238, 97), white)",
                      };
                      i.find((e) => {
                        Object.entries(r).find(function (t) {
                          e === t[0] && (n = t);
                        });
                      }),
                        (o.style.background = n[1]);
                    })(e);
                });
            });
          })(o, t);
      },
      loadList: function e() {
        return fetch(t.url)
          .then(function (e) {
            return e.json();
          })
          .then(function (e) {
            let i = t.offset + 1;
            e.results.forEach(function (e) {
              console.log(e);
              n({ name: e.name, detailsUrl: e.url, id: i }), (i += 1);
            });
          })
          .catch(function (e) {
            console.error(e);
          });
      },
      loadDetails: function e(t) {
        return fetch(t.detailsUrl)
          .then(function (e) {
            return e.json();
          })
          .then(function (e) {
            console.log(e),
              (t.id = e.id),
              (t.name = e.name),
              (t.imageUrl = e.sprites.front_default),
              (t.height = e.height),
              (t.weight = e.weight),
              (t.types = e.types),
              (t.abilities = e.abilities);
          })
          .catch(function (e) {
            console.error(e);
          });
      },
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  });
});
