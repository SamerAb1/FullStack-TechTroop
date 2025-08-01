export class User {
  constructor(name = "", location = "", imgUrl = "", friends = []) {
    this.name = name;
    this.location = location;
    this.friends = friends;
    this.userImgUrl = imgUrl;
    this.quote = "";
    this.pokemon = {};
    this.aboutMe = "";
  }

  setName(name) {
    if (name) {
      this.name = name;
      return true;
    }
    return false;
  }
  getName() {
    return this.name;
  }

  setLocation(location) {
    if (location) {
      this.location = location;
      return true;
    }
    return false;
  }
  getLocation() {
    return this.location;
  }

  setFriends(friends) {
    if (Array.isArray(friends)) {
      this.friends = friends;
      return true;
    }
    return false;
  }
  getFriends() {
    return this.friends;
  }

  setQuote(quote) {
    if (quote) {
      this.quote = quote;
      return true;
    }
    return false;
  }
  getQuote() {
    return this.quote;
  }

  setPokemon(pokemon) {
    if (pokemon && pokemon.name && pokemon.imgUrl) {
      this.pokemon = pokemon;
      return true;
    }
    return false;
  }
  getPokemon() {
    return this.pokemon;
  }

  setAboutMe(aboutMe) {
    if (aboutMe) {
      this.aboutMe = aboutMe;
      return true;
    }
    return false;
  }
  getAboutMe() {
    return this.aboutMe;
  }
}
