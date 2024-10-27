const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");

const fetchAllPokemon = async () => {
  try {
    const allPokemonRes = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon");
    const allPokemonData = await allPokemonRes.json();
    return allPokemonData.results;
  } catch (err) {
    console.log(err);
  }
}

const fetchOnePokemon = async (url) => {
  try {
    const onePokemonRes = await fetch(url);
    const onePokemonData = await onePokemonRes.json();
    return onePokemonData;
  } catch (err) {
    console.log(err);
  }
}

const searchPokemon = async (inputValue) => {
  const allPokemon = await fetchAllPokemon();
  const checkPokemonName = allPokemon.find(pokemon => pokemon.name === inputValue);
  const checkPokemonId = allPokemon.find(pokemon => pokemon.id.toString() === inputValue);

  let pokemon = "";

  if (!checkPokemonName && !checkPokemonId) {
    alert("Pokémon not found");
    return;
  }

  if (checkPokemonName) {
    pokemon = checkPokemonName;
  } else if (checkPokemonId) {
    pokemon = checkPokemonId;
  }

  const specificPokemon = await fetchOnePokemon(pokemon.url);

  updatePokemon(specificPokemon); 
}

const updatePokemon = (pokemon) => {
  pokemonName.textContent = `${pokemon.name.toUpperCase()}`;
  pokemonId.textContent = `#${pokemon.id}`;
  pokemonWeight.textContent = `Weight: ${pokemon.weight}`;
  pokemonHeight.textContent = `height: ${pokemon.height}`;
}

const eventFunction = () => {
  const inputValue = searchInput.value.toLowerCase();
  searchPokemon(inputValue);
}

searchBtn.addEventListener("click", eventFunction);
