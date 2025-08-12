import Movie from "../components/Movie";
import "./MoviesPage.css";
import jsonMovies from "../data/movies.json";
import { useState } from "react";

function MoviesPage() {
  const [movies, setMovies] = useState(jsonMovies);
  const [comedyOnly, setComedyOnly] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  function handleMovieSelection(newSelectedMovie) {
    if (selectedMovie === newSelectedMovie) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(newSelectedMovie);
    }
  }

  let displayMovies = movies;
  filterMovies();

  function filterMovies() {
    if (comedyOnly) {
      displayMovies = displayMovies.filter((movie) =>
        movie.genres.includes("Comedy")
      );
    }

    if (filterText) {
      displayMovies = displayMovies.filter((movie) =>
        movie.name.toLowerCase().includes(filterText.toLowerCase())
      );
    }
  }

  return (
    <div className="movies-page">
      <h1>Movies Page</h1>
      <div className="filter-movies">
        <input
          type="text"
          placeholder="Filter Movies..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <button
          onClick={() => {
            setComedyOnly(!comedyOnly);
          }}
        >
          {comedyOnly ? "Show All" : "Comedy Only"}
        </button>
      </div>
      {displayMovies.map((movie) => (
        <Movie
          movie={movie}
          key={movie.id}
          isSelected={movie === selectedMovie}
          onSelected={handleMovieSelection}
        />
      ))}
    </div>
  );
}

export default MoviesPage;
