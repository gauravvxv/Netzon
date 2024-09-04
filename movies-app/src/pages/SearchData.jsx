import React from 'react';
import { useTheme } from '../theme/themeContext';

const SearchData = ({ searchData, searchLoading, searchError }) => {
  const { darkMode } = useTheme();

  if (searchLoading) return <>Loading...</>;
  if (searchError) return <>Error loading search results</>;

  return (
    <div className="grid grid-cols-2 gap-6 pt-8 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {searchData?.map((movie) => (
        <div key={movie.id} className="text-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="poster"
            className="w-full h-56 sm:h-80 md:max-h-72 lg:h-80 object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          />
          <h3 className={`pt-4 font-semibold text-sm sm:text-base lg:text-lg ${darkMode ? 'text-black' : 'text-white'}`}>
            Title: {movie.title}
          </h3>
          <p className={`font-semibold text-xs sm:text-sm lg:text-base ${darkMode ? 'text-black' : 'text-white'}`}>
            Release Date: {movie.release_date}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SearchData;
  