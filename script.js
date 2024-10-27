const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonImg = document.getElementById("pokemon-img");
const pokemonType = document.getElementById("types");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpecialAttack = document.getElementById("special-attack");
const pokemonSpecialDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");

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

  resetPokemon();
  updatePokemon(specificPokemon); 
}

const updatePokemon = (pokemon) => {
  pokemonName.textContent = `${pokemon.name.toUpperCase()}`;
  pokemonId.textContent = `#${pokemon.id}`;
  pokemonWeight.textContent = `Weight: ${pokemon.weight}`;
  pokemonHeight.textContent = `height: ${pokemon.height}`;
  pokemonImg.innerHTML = `<img src="${pokemon.sprites.front_default}" alt="image of ${pokemon.name}" id="sprite">`;

  const pokemonTypes = pokemon.types;
  pokemonTypes.forEach((el) => pokemonType.innerHTML += `<p class="type ${el.type.name}">${el.type.name.toUpperCase()}</p>`);

  pokemonHp.textContent = `${pokemon.stats[0].base_stat}`;
  pokemonAttack.textContent = `${pokemon.stats[1].base_stat}`;
  pokemonDefense.textContent = `${pokemon.stats[2].base_stat}`;
  pokemonSpecialAttack.textContent = `${pokemon.stats[3].base_stat}`;
  pokemonSpecialDefense.textContent = `${pokemon.stats[4].base_stat}`;
  pokemonSpeed.textContent = `${pokemon.stats[5].base_stat}`;
}

const resetPokemon = () => {
  pokemonName.textContent = ``;
  pokemonId.textContent = ``;
  pokemonWeight.textContent = ``;
  pokemonHeight.textContent = ``;
  pokemonImg.innerHTML = ``;
  pokemonType.innerHTML = ``;
  pokemonHp.textContent = ``;
  pokemonAttack.textContent = ``;
  pokemonDefense.textContent = ``;
  pokemonSpecialAttack.textContent = ``;
  pokemonSpecialDefense.textContent = ``;
  pokemonSpeed.textContent = ``;
}

const eventFunction = () => {
  const inputValue = searchInput.value.toLowerCase();
  searchPokemon(inputValue);
}

searchBtn.addEventListener("click", eventFunction);

window.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    eventFunction();
  }
});
