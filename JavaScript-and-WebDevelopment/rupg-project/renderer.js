export class Renderer {
  renderUser(user) {
    // adding user details
    document.getElementById("user-img").src = user.userImgUrl;
    document.getElementById("user-name").innerText = user.name;
    document.getElementById("user-location").innerText = user.location;

    // adding the favorite quote
    document.getElementById("user-quote").innerHTML = "<p>Favorate Quote:</p>";
    const p1 = document.createElement("p");
    p1.innerText = `"${user.getQuote()}."\n-Kanye West`;
    p1.style.fontFamily = '"Indie Flower", cursive';
    document.getElementById("user-quote").appendChild(p1);

    //adding the favorite Pokemon
    document.getElementById("user-pokemon").innerHTML =
      "<p>Favorate Pokemon:\n</p>";
    const pokemonImg = document.createElement("img");
    pokemonImg.src = user.getPokemon().imgUrl;
    const p2 = document.createElement("p");
    p2.innerText = `${user.getPokemon().name}`;
    p2.style.fontFamily = "'Press Start 2P', cursive";
    document.getElementById("user-pokemon").appendChild(pokemonImg);
    document.getElementById("user-pokemon").appendChild(p2);

    //adding the about-me
    document.getElementById("about-me").innerHTML = "<p>About Me:</p>";
    const p3 = document.createElement("p");
    p3.innerText = `${user.getAboutMe()}.`;
    document.getElementById("about-me").appendChild(p3);
  }

  renderFriends(friends) {
    document.getElementById("friends-list").innerHTML = "<div>Friends:</div>";
    friends.forEach((element) => {
      const p = document.createElement("div");
      p.innerText = element;
      document.getElementById("friends-list").appendChild(p);
    });
  }
}
