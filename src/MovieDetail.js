// MovieDetail.jsx
import React from "react";

const MovieDetail = ({ movie }) => {
  return (
    <div>
      <img
        className="w-full h-72 object-cover"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
        <p className="text-gray-600 text-sm">{`Release Date: ${movie.release_date}`}</p>
        <p className="text-yellow-500 text-lg font-semibold mt-2">
          {`Rating: ${movie.vote_average}`}
        </p>
        <p className="mt-4">{movie.overview}</p>
        {/* Informasi detail film lainnya dapat ditambahkan di sini */}
      </div>
    </div>
  );
};

export default MovieDetail;
