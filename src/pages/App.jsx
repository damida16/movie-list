// App.jsx
import React, { useEffect, useState } from "react";
import "../App.css";
import { getMovieList, searchMovie } from "../api";
import MovieDetail from "../MovieDetail";
import axios from "axios";
import request from "../Request";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Await, Link } from "react-router-dom";
import { Details } from "./Details";

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

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

  const search = async () => {
    if (searchQuery.trim() !== "") {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_APIKEY}&query=${searchQuery}`
        );
        const hasilCari = response.data.results;
        setSearchResults(hasilCari);
      } catch (error) {
        console.error("Error searching for movies:", error);
      }
    } else {
      setSearchResults([]); // Atur hasil pencarian menjadi kosong jika query kosong
    }
  };

  const searchCari = (e) => {
    setSearchQuery(e.target.value);
  };
  console.log(searchResults);
  const showMovieDetail = (movie) => {
    setSelectedMovie(movie);
  };

  const closeMovieDetail = () => {
    setSelectedMovie(null);
  };

  const [movies, setMovies] = useState([]);
  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGZjZDE4Zjg1ZWVlZjA2MTBiMTNhYzFmYjgzYTgwYyIsInN1YiI6IjY1MTY1NTQ0YTE5OWE2MDBjNDljZmI5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.deUaqYl9PXA9xUUSZHH-OmXiq1RvyA9nn8dcjGCgCdQ"; // Ganti dengan token API yang valid
    axios
      .get(request.requestPopular, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching popular movies:", error);
      });
  }, []);

 
  const displayedMovies =
    searchQuery === "" ? movieList.slice(0, 9) : searchResults.slice(0, 9);

  return (
    <div className="bg-gray-100 min-h-screen relative">
      <div className="w-full h-[550px] relative text-white">
        <Swiper spaceBetween={0} slidesPerView={1}>
          {movieList.map((movie) => (
            <SwiperSlide key={movie.id}>
              {/* <img
                src={`https://image.tmdb.org/t/p/original/${
                  movie.backdrop_path || ""
                }`}
                alt={movie.title}
                className="w-full h-full object-cover z-0 relative"
              /> */}
              <div
                className="w-full h-screen bg-cover bg-center bg-no-repeat relative"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${
                    movie.backdrop_path || ""
                  })`,
                }}
              >
                <div className="relative p-4 z-50 flex justify-between w-full items-center">
                  <div className="flex-1">
                    <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
                      Damida's Movie
                    </h1>
                  </div>

                  <div class="flex w-full flex-1 pl-6">
                    <input
                      type="search"
                      className="relative m-0 block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-2 py-[0.1rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="button-addon2"
                      value={searchQuery}
                      onChange={searchCari}
                    />
                    <span
                      class="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                      id="basic-addon2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="h-5 w-5"
                        onClick={search}
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>

                  <div className="flex-1 flex gap-5 justify-end">
                    <button className="bg-transparent hover:bg-red-600 text-red-600 font-semibold hover:text-white py-2 px-4 border border-red-600 hover:border-transparent rounded">
                      Sign In
                    </button>
                    <button className="bg-red-600 hover:bg-red-600 text-white font-bold py-2 px-4 border border-red-700 rounded">
                      Sign Out
                    </button>
                  </div>
                </div>

                <div className="w-2/3 mt-20 ml-10 ">
                  <h1 className="text-6xl font-bold flex-wrap">
                    Unlimited <span className="text-red-600 ">Movie</span>,{" "}
                    <br /> TVs Shows, & More.
                  </h1>
                  <p className="text-lg mb-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam odio nisi, posuere ut purus sit amet, dignissim
                    sodales neque. Nullam sed commodo ligula, tincidunt sagittis
                    dolor. Nullam eget nunc molestie, lacinia velit vel, sodales
                    augue.
                  </p>
                  <Link to={"/1"}>
                    <button className="bg-transparent hover:bg-red-600 text-red-600 font-semibold hover:text-white py-2 px-4 border border-red-600 hover:border-transparent rounded">
                      See More
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
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

export default App;
