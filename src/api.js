import axios from "axios";

const apiKey = process.env.REACT_APP_APIKEY;
const baseUrl = process.env.REACT_APP_BASEURL;

export const getMovieList = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/popular?api_key=${apiKey}`
    );
    return response.data.results; // Return a list of popular movies
  } catch (error) {
    console.error("Error fetching movie list:", error);
    throw error;
  }
};

export const searchMovie = async (query) => {
  try {
    const response = await axios.get(
      `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`
    );
    return response.data.results; // Return search results
  } catch (error) {
    console.error("Error searching for movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/${movieId}?api_key=${apiKey}`
    );
    return response.data; // Return details for a specific movie
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
