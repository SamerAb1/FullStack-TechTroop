import { User } from "./user.js";

const generateBtn = document.getElementById("generate-btn");

async function generateUserData() {
  try {
    // Fetch 7 random users
    const usersResp = await fetch("https://randomuser.me/api/?results=7");
    const usersData = await usersResp.json();
    const main = usersData.results[0];
    const userName = `${main.name.first} ${main.name.last}`;
    const userLocation = `${main.location.street.name}, ${main.location.city}`;
    const userFriends = usersData.results
      .slice(1)
      .map((f) => `${f.name.first} ${f.name.last}`);

    // Fetch Kanye quote
    const quoteResp = await fetch("https://api.kanye.rest");
    const quoteData = await quoteResp.json();
    const quote = quoteData.quote;

    // Fetch Pokémon
    const randomId = Math.floor(Math.random() * 1025) + 1;
    const pokeResp = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );
    const pokeData = await pokeResp.json();
    const pokemonObj = {
      name:
        pokeData.name.charAt(0).toUpperCase() +
        pokeData.name.slice(1).toLowerCase(),
      imgUrl: pokeData.sprites.front_default,
    };

    // Fetch Bacon Ipsum
    const ipsumResp = await fetch(
      "https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1"
    );
    const ipsumData = await ipsumResp.json();
    const aboutMe = ipsumData.join(" ");

    // Create user and fill all fields
    const user = new User(userName, userLocation, userFriends);
    user.setQuote(quote);
    user.setPokemon(pokemonObj);
    user.setAboutMe(aboutMe);

    console.log(user);
  } catch (err) {
    console.error("Error generating user data:", err.message);
    alert("There was a problem loading user data. Please try again.");
  }
}

generateBtn.addEventListener("click", generateUserData);
