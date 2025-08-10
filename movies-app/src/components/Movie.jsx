import "./Movie.css";

export default function Movie({ movie }) {
  // formats the minutes runtime to: Xh Xm
  // For example: 142 -> 2h 22m
  function formatRuntime(runtime) {
    const hours = parseInt(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  }

  return (
    <div className="movie">
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.name} />
      </div>
      <div className="movie-info">
        <h2>{movie.name}</h2>
        <h5>
          {movie.year} | {formatRuntime(movie.runtime)}
        </h5>
        <p>{movie.plot}</p>
        <div className="genres">
          {movie.genres.map((genre, index) => (
            <div key={index}>{genre}</div>
          ))}
        </div>
        <p>
          <a href={movie.imdb} target="_blank">
            More info...
          </a>
        </p>
      </div>
    </div>
  );
}
