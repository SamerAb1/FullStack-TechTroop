import { User } from "./user.js";
import { Renderer } from "./renderer.js";
const renderer = new Renderer();
let user = null;

const generateUserBtn = document.getElementById("generate-btn");
const saveUserBtn = document.getElementById("save-btn");
const loadUserBtn = document.getElementById("load-btn");

async function generateUserData() {
  try {
    // Fetch 7 random users
    const usersResp = await fetch("https://randomuser.me/api/?results=7");
    const usersData = await usersResp.json();
    const main = usersData.results[0];
    const userName = `${main.name.first} ${main.name.last}`;
    const userLocation = `${main.location.street.name}, ${main.location.city}`;
    const userImgUrl = main.picture.large;
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
      "https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1"
    );
    const ipsumData = await ipsumResp.json();
    const aboutMe = ipsumData.join(" ");

    // Create user and fill all fields
    user = new User(userName, userLocation, userImgUrl, userFriends);
    user.setQuote(quote);
    user.setPokemon(pokemonObj);
    user.setAboutMe(aboutMe);

    console.log(user);
    renderer.renderUser(user);
    renderer.renderFriends(user.friends);
  } catch (err) {
    console.error("Error generating user data:", err.message);
    alert("There was a problem loading user data. Please try again.");
  }
}
function createUser(loadedUser) {
  // Create user and fill all fields
  user = new User(
    loadedUser.name,
    loadedUser.location,
    loadedUser.userImgUrl,
    loadedUser.friends
  );
  user.setQuote(loadedUser.quote);
  user.setPokemon(loadedUser.pokemon);
  user.setAboutMe(loadedUser.aboutMe);

  console.log(user);
  renderer.renderUser(user);
  renderer.renderFriends(user.friends);
}
function saveUser() {
  try {
    if (user) {
      localStorage.user = JSON.stringify(user);
    } else {
      throw new Error("No User To Save");
    }
  } catch (error) {
    console.log("Save Error:", error.message);
    alert("No User To Save, Try Generate User first");
  }
}

function loadUser() {
  try {
    if (localStorage.user) {
      createUser(JSON.parse(localStorage.user));
    } else {
      throw new Error("No User To Load");
    }
  } catch (error) {
    console.log("Load Error:", error.message);
    alert("No User To Load, Try Save User first");
  }
}

generateUserBtn.addEventListener("click", generateUserData);
saveUserBtn.addEventListener("click", saveUser);
loadUserBtn.addEventListener("click", loadUser);
