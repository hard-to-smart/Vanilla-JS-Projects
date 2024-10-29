let limit = 20;
let filterType = [];
let fetchedData = [];
let filteredData = [];
const pokemonContainer = document.getElementById("parent");
const searchInput = document.getElementById("input-text");

const searchValue = searchInput.addEventListener("input", (e) =>
  getSearchInput()
);

const select = document.getElementById("types");

select.addEventListener("change", (e) => {
  let selectedType = e.target.value;
  filterBytype(selectedType);
});

//load more
const loadMoreButton = document.getElementById("load-more-btn");
loadMoreButton.addEventListener("click", () => {
  limit += 20;
  fetchData(limit);
});

// fetching data
const fetchData = async (limit) => {
  console.log(fetchedData);
  try {
    console.log(limit);
    const api = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`;
    const data = await getAPI(api);
    let fetchPromises = await data.results.map(async (result) => {
      const pokemonResponse =  getAPI(result.url);
      return pokemonResponse;
    });

    const pokemons = await Promise.all(fetchPromises);
    fetchedData = pokemons;
    displayData(fetchedData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// displaying data
function displayData(fetchedData) {
  pokemonContainer.innerHTML = "";
  fetchedData.forEach((pokemon) => {
    let card = document.createElement("div");
    let cardInner = `
    <div class ="flip-card">
        <div class="flip-card-inner">
            <div class="flip-card-front">
                <img src="${
                  pokemon.sprites.other.dream_world.front_default
                }" alt="${pokemon.name}" style="width:300px;height:300px;">
            </div>
            <div class="flip-card-back">
                <h1>${pokemon.name}</h1>
                <p>Types: ${pokemon.types
                  .map((t) => t.type.name)
                  .join(", ")}</p>
            </div>
        </div>
        </div>`;

    card.innerHTML = cardInner;
    pokemonContainer.append(card);
  });
}

// adding filter options
const pokeymonType = async () => {
  const data =await getAPI("https://pokeapi.co/api/v2/type/") 
  data.results.map((result) => (filterType = [...filterType, result.name]));
  addOptions(filterType);
};

// select type
function addOptions(filterType) {
  filterType.map((filter) => {
    const option = document.createElement("option");
    option.value = filter;
    option.innerText = filter;
    select.append(option);
  });
}

// search data
function getSearchInput(){
  let keyword= searchInput.value;
    let res = fetchedData.filter((data)=>data.name.includes(keyword))
    filteredData = [...res]
    displayData(filteredData)
}

//filtering data
function filterBytype(selectedType) {
  if (selectedType === "all") filteredData = [];
  if (filteredData.length > 0) {
    let res = filteredData?.filter(
      (el) => el.types[0].type.name == selectedType
    );
    filteredData = [...res];
    console.log(res);
    displayData(filteredData);
  } else {
    let res = fetchedData?.filter(
      (el) => el.types[0].type.name == selectedType
    );
    fetchedData = [...res];
    console.log(res);
    displayData(fetchedData);
  }
}


async function getAPI(url){
  let response = await fetch(url);
  const data =await response.json()
  return data;
}

pokeymonType();
fetchData(limit);
