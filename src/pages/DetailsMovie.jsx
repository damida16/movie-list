import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import request from "../Request";
import { useParams } from "react-router-dom";

const DetailsMovie = () => {
  const [dataMovie, setDataMovie] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_APIKEY}`
        );
        setDataMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [params.id]);

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
      setSearchResults([]);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen relative">
      <div className="w-full h-[550px] relative text-white">
        <div
          className="w-full h-screen bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${
              dataMovie.backdrop_path || ""
            })`,
          }}
        >
          <div className="relative p-4 z-50 flex justify-between w-full items-center">
            <div className="flex-1">
              <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
                Damida's Movie
              </h1>
            </div>

            <div className="flex w-full flex-1 pl-6">
              <input
                type="search"
                className="relative m-0 block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-2 py-[0.1rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <span
                className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                id="basic-addon2"
                onClick={search}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
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
            <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
              {dataMovie.title}
            </h1>
            <p className="text-lg mb-8">{dataMovie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsMovie;
