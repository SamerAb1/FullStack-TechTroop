import { Container } from "@mantine/core";
import SearchBox from "../components/SearchBox";
import { useEffect, useState } from "react";
import axios from "axios";

function ActorsPage() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    async function getData() {
      const searchURL = `https://api.themoviedb.org/3/search/person?api_key=53d2ee2137cf3228aefae083c8158855&query=${searchText}`;
      const response = await axios.get(searchURL);
      setSearchResults(
        response.data.results.sort((a, b) => b.popularity - a.popularity)
      );
    }

    if (searchText) {
      getData();
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  function addActor(resultIndex) {
    // alert(searchResults[resultIndex]);
    setActors(actors.concat(searchResults[resultIndex]));
    setSearchText("");
  }

  return (
    <Container size="md">
      <h1>Actors Page</h1>
      <SearchBox
        placeholder="Search actors..."
        searchText={searchText}
        onSearchChange={(value) => setSearchText(value)}
        results={searchResults.map((result) => result.name)}
        onResultClicked={addActor}
      />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, quibusdam.
        Delectus unde inventore eum quaerat excepturi placeat iure, tempore odit
        magni maxime deleniti quas consequuntur ab! Distinctio culpa fugiat ad?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, quibusdam.
        Delectus unde inventore eum quaerat excepturi placeat iure, tempore odit
        magni maxime deleniti quas consequuntur ab! Distinctio culpa fugiat ad?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, quibusdam.
        Delectus unde inventore eum quaerat excepturi placeat iure, tempore odit
        magni maxime deleniti quas consequuntur ab! Distinctio culpa fugiat ad?
      </p>
      {actors.map((actor, index) => (
        <p key={index}>{actor.name}</p>
      ))}
    </Container>
  );
}

export default ActorsPage;
