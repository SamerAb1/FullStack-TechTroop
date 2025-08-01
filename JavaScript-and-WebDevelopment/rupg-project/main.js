const generateBtn = document.getElementById("generate-btn");

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Network response was not ok for: ${url}`);
  return response.json();
}

async function generateUserData() {
  const usersApi = "https://randomuser.me/api/?results=7";
  let data = await fetchJson(usersApi);
  let firstName = data.results[0].name.first;
  let lastName = data.results[0].name.last;
  let location =
    data.results[0].location.street.name + ", " + data.results[0].location.city;
  let imgUrl = data.results[0].picture.medium;
  let friendsArr = data.results.slice(1);
  let friends = friendsArr.map(
    (friend) => friend.name.first + " " + friend.name.last
  );

  console.log("Name:", firstName + " " + lastName);
  console.log("Location:", location);
  console.log("Friends:", friends);
  console.log("Image:", imgUrl);
}

async function generateQuoteData() {
  const quoteApi = "https://api.kanye.rest";
  let data = await fetchJson(quoteApi);
  console.log("Quote:", data.quote);
}

async function generatePokemonData() {
  const randomId = Math.floor(Math.random() * 1025) + 1;
  const PokemonApi = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
  let data = await fetchJson(PokemonApi);

  let pokemonName =
    data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase();
  let imgUrl = data.sprites.front_default;
  console.log("Pokemon Name:", pokemonName);
  console.log("Pokemon Image URL:", imgUrl);
}

async function generateIpsumData() {
  const ipsumApi =
    "https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1";
  let data = await fetchJson(ipsumApi);
  console.log("Bacon Ipsum:", data);
}

function generateData() {
  try {
    generateUserData();
    generatePokemonData();
    generateQuoteData();
    generateIpsumData();
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

generateBtn.addEventListener("click", generateData);
