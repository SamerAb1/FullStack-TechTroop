import Movie from "./Movie"; // or "./Movies" if you keep the filename
import "./MoviesPage.css";
import jsonMovies from "../data/movies.json";
import { useState } from "react";

export default function MoviesPage() {
  const [movies] = useState(jsonMovies);
  const [comedyOnly, setComedyOnly] = useState(false);
  const [filterText, setFilterText] = useState("");

  let displayMovies = movies;
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
        <button onClick={() => setComedyOnly(!comedyOnly)}>
          {comedyOnly ? "Show All" : "Comedy Only"}
        </button>
      </div>

      {displayMovies.map((movie) => (
        <Movie movie={movie} key={movie.id} />
      ))}
    </div>
  );
}
