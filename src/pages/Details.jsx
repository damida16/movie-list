import React, { useEffect, useState } from "react";
import { getMovieList } from "../api";
import MovieDetail from "../MovieDetail";
import { Link } from "react-router-dom";

export const Details = () => {
  const [movieList, setMovieList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const closeMovieDetail = () => {
    console.log(selectedMovie);
    setSelectedMovie(null);
  };

  useEffect(() => {
    // Panggil fungsi getMovieList saat komponen pertama kali dimuat
    const fetchMovieList = async () => {
      try {
        const movies = await getMovieList();
        setMovieList(movies);
      } catch (error) {
        console.error("Error fetching movie list:", error);
      }
    };

    fetchMovieList();
  }, []);

  const showMovieDetail = (movie) => {
    setSelectedMovie(movie);
  };

  const displayedMovies =
    searchQuery === "" ? movieList.slice(0, 9) : searchResults.slice(0, 9);

  return (
    <div className="container mx-auto py-8 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {displayedMovies.map((movie) => (
          <Link to={`/2/${movie.id}`}>
            <div
              className="bg-white rounded-lg overflow-hidden shadow-md "
              key={movie.id}
              onClick={() => showMovieDetail(movie)} // Tambahkan event onClick
            >
              <img
                className="w-full h-72 object-cover "
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                <p className="text-gray-600 text-sm">{movie.release_date}</p>
                <p className="text-yellow-500 text-lg font-semibold mt-2">
                  {movie.vote_average}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {selectedMovie && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <MovieDetail movie={selectedMovie} />
            <button
              className="bg-blue-500 text-white px-4 py-2 m-4 rounded-md"
              onClick={closeMovieDetail}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
